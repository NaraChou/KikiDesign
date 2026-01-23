import React, { useEffect, useRef } from 'react';

/**
 * [視覺動態總說明] BackToTop（右下角懸浮專用）
 * ───
 * 行為：視窗向下滑超過 500px 時，右下角浮現淡入「回到最上層」功能鈕。不跟隨內容寬度，永遠黏在右下角。
 * ⦿ 「功能永遠右下」— fixed right-6 bottom-8 於所有寬度停靠右下角，無論頁面主內容排版如何。
 * ⦿ 「風格一致」— 顏色、圓角等採 Tailwind 與 :root 變數管理；嚴格避免變形。
 * ⦿ 「零報錯」— 動效失敗時，僅失去淡入特效，主體不移動不閃爍。
 *
 * 【溝通視覺行為】
 * 1. 向下滑超過 500px → 右下角浮動按鈕淡入+可點擊；
 *    沒到 500px 會隱藏＋停用互動，畫面乾淨。
 * 2. 點按時優先用 gsap 動態動畫補回頂，若 fail 則退回瀏覽器 smooth，永不阻擋主要畫面。
 * 3. 豎線 hover 長高，體現手繪念感且不變形。
 */

export const BackToTop: React.FC = () => {
  // [元件的記憶]：操控 DOM 以實現漸入漸出，不用 State 保持全局彈性
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // [連動效果] 根據 scroll 位置動態切換顯示/隱藏 class，回饋右下角狀態
    const handleScroll = () => {
      const btn = btnRef.current;
      if (!btn) return;
      const visible = window.scrollY > 500;
      btn.classList.toggle('opacity-100', visible);
      btn.classList.toggle('pointer-events-auto', visible);
      btn.classList.toggle('opacity-0', !visible);
      btn.classList.toggle('pointer-events-none', !visible);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // [回頂點動作] 動畫優先，退回不動畫時維持可用與不閃動
  const scrollToTop = () => {
    if (window.gsap) {
      window.gsap.to(window, { scrollTo: 0, duration: 1.5, ease: 'power4.inOut' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    // [右下角專屬懸浮區]：fixed 搭配 6+8px 右下距，永遠右下角不受內容排版影響
    <button
      ref={btnRef}
      id="back-to-top"
      type="button"
      aria-label="回到最上面"
      onClick={scrollToTop}
      // [動態切換 class]：初始隱藏 pointer-events-none，滾動後淡入且可互動
      className={`
        fixed z-[70] group flex flex-col items-center
        right-6 bottom-8
        transition-opacity duration-500
        opacity-0 pointer-events-none
      `}
    >
      {/* [手繪豎線] 高度 48px，hover 增長到 64px，美感取自品牌主色，永不縮放 */}
      <div
        className={`
          w-px
          transition-all duration-500
          bg-[rgba(230,57,70,0.5)]
          rounded-[1.5px]
          h-12
          group-hover:h-16
        `}
        aria-hidden="true"
      />
      {/* [垂直 Top 字樣] spacing/色彩定義統一，用於辨識回頂 */}
      <span
        className="vertical-text uppercase mt-4 text-[8px] tracking-[0.4em] text-[var(--text-dim)]"
        aria-hidden="true"
      >
        Top
      </span>
    </button>
  );
};