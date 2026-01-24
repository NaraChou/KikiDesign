import React, { useEffect, useRef } from 'react';

/**
 * [MobileMenu 元件 / 統合版資訊註解]
 * ──────────────────────────────
 * ▍視覺記憶與動態邏輯
 *   - isOpen 控制導覽選單「元件的記憶」：true 則 transform-Y 滑下進場、false 即收至頂部，過渡完全用 CSS 控制。
 *   - 內容置於 content-width-container，RWD spacing 與主結構永遠對齊，避免視覺偏移。
 *   - 按鈕與連結顏色、字級皆走 Tailwind 配合 CSS 變數（:root 管理 --menu-bg, --menu-link-color），全站一致。
 * ▍資訊架構
 *   - menuLinks 陣列單一來源，資料驅動渲染，嚴格遵循 DRY 原則（重複選單 html 嚴禁）。
 *   - 文字區分中英文，中英分級管理，提升導覽選單資訊層級與閱讀感受。
 *   - 所有互動皆交由 group-hover/hover 在 CSS 負責，嚴禁 JS 靜態色切換。
 * ▍語義結構
 *   - 外層 nav，內層 a 為具語意描述之導覽連結，關閉為 button。
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu 導覽資料：統一陣列資料源、做好 SEO-友善描述
const menuLinks: Array<{ id: string; href: string; label: string }> = [
  { id: 'home', href: '#home', label: '首頁 Index' },
  { id: 'works', href: '#works', label: '設計作品 Works' },
  { id: 'philosophy', href: '#philosophy', label: '設計理念 Vision' },
  { id: 'contact', href: '#contact', label: '聯絡方式 Contact' },
];

// [輔助處理] 中英分隔，提升多語視覺層次，避免相似函式重複
function splitLabel(label: string) {
  const match = label.match(/^(.*?)([A-Za-z0-9\s]+)$/);
  return match
    ? { zh: match[1].trim(), en: match[2].trim() }
    : { zh: label, en: '' };
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [進場連動效果]：選單開關會產生 transform-Y 動畫，控制視覺滑入滑出（style 不負責色彩/字級，只管理動態座標）
    if (menuRef.current) {
      menuRef.current.style.transform = isOpen ? 'translateY(0)' : 'translateY(-100%)';
    }
  }, [isOpen]);

  // [點選行為連動]：所有導覽連結點擊後，收起選單並 GSAP 平滑滾動（無 JS 靜態色切換）
  const handleLinkClick = (targetHref: string, e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (window.gsap) {
      window.gsap.to(window, { duration: 1.5, scrollTo: targetHref, ease: 'power4.inOut' });
    }
  };

  return (
    // [主控導覽]：語意 nav，RWD 固定全畫面
    <nav
      ref={menuRef}
      id="mobile-menu"
      aria-label="手機導覽選單"
      // 樣式合併，只有動態 transform 留在 style，其他用 Tailwind
      className="fixed inset-0 z-[60] flex flex-col justify-center items-center"
      style={{
        background: 'var(--menu-bg, #0E0C0B)',
        transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
        transform: 'translateY(-100%)',
      }}
    >
      {/* [內容寬度容器]：橫向間距與主內容一樣，內部所有元件統一 vertical spacing */}
      <div className="content-width-container w-full flex flex-col items-center space-y-8">
        {/* [資料驅動導覽]：所有選單連結用 menuLinks.map() 產生，中英文樣式分層 */}
        {menuLinks.map(link => {
          const { zh, en } = splitLabel(link.label);
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={e => handleLinkClick(link.href, e)}
              className="flex items-end gap-1 font-light italic tracking-[0.2em] transition-colors"
              style={{
                color: 'var(--menu-link-color, #EAE2D6)',
              }}
              // [語義化可讀性註解]：導覽描述完整，不用泛泛的「這裡」
              aria-label={`前往${zh}${en ? ` / ${en}` : ''}區塊`}
            >
              <span className="text-sm md:text-lg">{zh}</span>
              {en && (
                <span className="text-xs md:text-base opacity-70 tracking-[0.08em] ml-1">
                  {en}
                </span>
              )}
            </a>
          );
        })}
        {/* [分隔互動區塊]：menu 關閉鈕保持同樣主題規則 */}
        <button
          onClick={onClose}
          className="mt-12 text-[10px] tracking-[0.5em] opacity-40 uppercase hover:opacity-100 transition"
          style={{
            color: 'var(--menu-link-color, #EAE2D6)',
          }}
          aria-label="關閉導覽選單"
        >
          關閉選單 Close
        </button>
      </div>
    </nav>
  );
};