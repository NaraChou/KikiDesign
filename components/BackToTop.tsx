import React, { useEffect, useRef } from 'react';

/**
 * [A] 視覺資訊備註
 * 捲過約 500px 後右下角浮出 #back-to-top；點擊以 GSAP 平滑回頂（失敗則改用瀏覽器 smooth）。豎線 hover 加長維持手繪感。
 */

// [B] 樣式常數（基礎在前，字串末端為 RWD）
const STYLES = {
  button:
    'fixed z-[70] group flex flex-col items-center right-6 bottom-8 transition-opacity duration-500 opacity-0 pointer-events-none',
  line:
    'w-px transition-all duration-500 bg-[rgba(230,57,70,0.5)] rounded-[1.5px] h-12 group-hover:h-16',
  label: 'vertical-text uppercase mt-4 text-[8px] tracking-[0.4em] text-[var(--text-dim)]',
} as const;

// [C] 元件主體
export const BackToTop: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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

  const scrollToTop = () => {
    if (window.gsap) {
      window.gsap.to(window, { scrollTo: 0, duration: 1.5, ease: 'power4.inOut' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      ref={btnRef}
      id="back-to-top"
      type="button"
      aria-label="回到最上面"
      onClick={scrollToTop}
      className={STYLES.button}
    >
      <div className={STYLES.line} aria-hidden="true" />
      <span className={STYLES.label} aria-hidden="true">
        Top
      </span>
    </button>
  );
};
