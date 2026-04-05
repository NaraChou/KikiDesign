import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * [A] 視覺資訊備註
 * 手機全屏選單：isOpen 時自頂滑入；連結點擊後關閉並捲動至錨點（與導覽列相同邏輯）。色彩沿用 CSS 變數 --menu-bg、--menu-link-color。
 */

// [B] 資料與樣式常數
const menuLinks: Array<{ id: string; href: string; label: string }> = [
  { id: 'home', href: '#home', label: '首頁 Index' },
  { id: 'works', href: '#works', label: '設計作品 Works' },
  { id: 'philosophy', href: '#philosophy', label: '設計理念 Vision' },
  { id: 'contact', href: '#contact', label: '聯絡方式 Contact' },
];

const STYLES = {
  nav: 'fixed inset-0 z-[60] flex flex-col justify-center items-center',
  container: 'content-width-container w-full flex flex-col items-center space-y-8',
  linkRow: 'flex items-end gap-1 font-light italic tracking-[0.2em] transition-colors',
  zh: 'text-sm md:text-lg',
  en: 'text-xs md:text-base opacity-70 tracking-[0.08em] ml-1',
  closeBtn: 'mt-12 text-[10px] tracking-[0.5em] opacity-40 uppercase hover:opacity-100 transition',
} as const;

const MENU_MOTION = {
  base: {
    background: 'var(--menu-bg, #0E0C0B)',
    transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
  },
  linkColor: { color: 'var(--menu-link-color, #EAE2D6)' },
} as const;

function splitLabel(label: string) {
  const match = label.match(/^(.*?)([A-Za-z0-9\s]+)$/);
  return match ? { zh: match[1].trim(), en: match[2].trim() } : { zh: label, en: '' };
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// [C] 元件主體
export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleLinkClick = (targetHref: string, e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (isHome) {
      if (window.gsap) {
        window.gsap.to(window, { duration: 1.5, scrollTo: targetHref, ease: 'power4.inOut' });
      } else {
        window.location.hash = targetHref;
      }
    } else {
      navigate('/');
      setTimeout(() => {
        if (window.gsap) {
          window.gsap.to(window, { duration: 0, scrollTo: targetHref });
        } else {
          window.location.hash = targetHref;
        }
      }, 100);
    }
  };

  const panelStyle: React.CSSProperties = {
    ...MENU_MOTION.base,
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
  };

  return (
    <nav
      id="mobile-menu"
      aria-label="手機導覽選單"
      className={STYLES.nav}
      style={panelStyle}
    >
      <div className={STYLES.container}>
        {menuLinks.map((link) => {
          const { zh, en } = splitLabel(link.label);
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className={STYLES.linkRow}
              style={MENU_MOTION.linkColor}
              aria-label={`前往${zh}${en ? ` / ${en}` : ''}區塊`}
            >
              <span className={STYLES.zh}>{zh}</span>
              {en && <span className={STYLES.en}>{en}</span>}
            </a>
          );
        })}
        <button
          onClick={onClose}
          className={STYLES.closeBtn}
          style={MENU_MOTION.linkColor}
          aria-label="關閉導覽選單"
        >
          關閉選單 Close
        </button>
      </div>
    </nav>
  );
};
