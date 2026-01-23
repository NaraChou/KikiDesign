import React, { useEffect, useRef } from 'react';

/**
 * [MobileMenu 元件｜資訊統合說明・視覺化開發]
 * ─────────────────────
 * ▍一、視覺行為白話
 *   - 當 isOpen（menu 開關記憶）為 true，MobileMenu 會以 transform-Y 的方式下滑進場，否則收回頂部。（動態過渡連動畫面滑入/滑出）
 *   - 內容永遠包在 content-width-container，RWD與桌面左右間距皆同步主頁內容，視覺對齊不偏移。
 *   - link 與 button 顏色、字級、行距等全部交給 CSS 變數集中控管（單一 source-of-truth），後續一改全站同步。
 * ▍二、資訊規範與統一
 *   - Menu 導覽資料採用陣列 menuLinks，渲染與行為統合一處，完全禁止重複結構碼（符合 DRY）。
 *   - 樣式統一：所有 spacing、色碼、字型僅用 Tailwind 搭配 style 變數，不再重複 hardcode 寫法。
 *   - :root 控管：背景、連結色等皆可於 :root 設定 --menu-bg, --menu-link-color，增強主題可控性。
 *   - 視覺互動全走 group-hover 等 CSS（Button opacity hover）、不採 JS 改靜態色。
 * ▍三、語義結構
 *   - 外層 <nav>（語義明確，便於無障礙與 SEO）。
 *   - <a> 需有完整語意描述，勿用「這裡」。
 *   - 關閉鈕用 <button>，統一樣式與互動規則。
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// [Menu 導覽結構統一管理，符合 DRY 原則]
const menuLinks: { id: string; href: string; label: string }[] = [
  { id: 'home', href: '#home', label: '首頁 Index' },
  { id: 'works', href: '#works', label: '設計作品 Works' },
  { id: 'philosophy', href: '#philosophy', label: '設計理念 Vision' },
  { id: 'contact', href: '#contact', label: '聯絡方式 Contact' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [進場視覺動態]
    // 連動 menu 開關，決定 container 是否以 transition 滑入畫面
    if (menuRef.current) {
      if (isOpen) {
        menuRef.current.classList.add('active');
        menuRef.current.style.transform = 'translateY(0)';
      } else {
        menuRef.current.classList.remove('active');
        menuRef.current.style.transform = 'translateY(-100%)';
      }
    }
  }, [isOpen]);

  // [menu 點擊互動]：收起 menu，並滑順地滾到目標區塊
  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (window.gsap) {
      window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: 'power4.inOut' });
    }
  };

  return (
    // [主控導覽]
    <nav
      ref={menuRef}
      id="mobile-menu"
      aria-label="手機導覽選單"
      className="fixed inset-0 z-[60] flex flex-col justify-center items-center"
      style={{
        background: 'var(--menu-bg, #0E0C0B)',
        transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
        transform: 'translateY(-100%)'
      }}
    >
      {/* [標準內容容器・視覺寬度/spacing統一] */}
      <div className="content-width-container w-full flex flex-col items-center space-y-8">
        {/* [動態選單迴圈渲染｜結構資料合一、語意可擴充] */}
        {menuLinks.map(link => (
          <a
            key={link.id}
            href={link.href}
            onClick={e => handleLinkClick(link.href, e)}
            // [字級、粗細、斜體、間距、顏色統一] 只留 style 變數，便於全站控制
            className="text-2xl font-light tracking-[0.3em] italic"
            style={{
              color: 'var(--menu-link-color, #EAE2D6)'
            }}
          >
            {link.label}
          </a>
        ))}
        {/* [主動明確分隔互動區塊] */}
        <button
          onClick={onClose}
          className="mt-12 text-[10px] tracking-[0.5em] opacity-40 uppercase hover:opacity-100 transition"
          style={{
            color: 'var(--menu-link-color, #EAE2D6)'
          }}
          aria-label="關閉導覽選單"
        >
          關閉選單 Close
        </button>
      </div>
    </nav>
  );
};