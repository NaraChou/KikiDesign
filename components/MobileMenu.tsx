import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LAYOUT } from '../styles/layout';

/**
 * [A] 視覺資訊備註
 * 手機全屏選單：根節點加 .is-open 時由 CSS 滑入（transform／過渡在 style.css）；JS 只負責開關與捲動錨點。
 */

// [B] 資料與樣式常數
const menuLinks: Array<{ id: string; href: string; label: string }> = [
  { id: 'home', href: '#home', label: '首頁 Index' },
  { id: 'works', href: '#works', label: '設計作品 Works' },
  { id: 'philosophy', href: '#philosophy', label: '設計理念 Vision' },
  { id: 'contact', href: '#contact', label: '聯絡方式 Contact' },
];

const STYLES = {
  wrapper: 'mobile-menu',
  container: `${LAYOUT.colCenter} space-y-8`,
  linkRow: 'flex items-end gap-1 font-light italic tracking-[0.2em] transition-colors',
  linkZh: 'text-sm md:text-lg',
  linkEn: 'text-xs md:text-base opacity-70 tracking-[0.08em] ml-1',
  close: 'mobile-menu__close mt-12 text-[10px] tracking-[0.5em] opacity-40 uppercase hover:opacity-100 transition',
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

  const rootClass = `${STYLES.wrapper}${isOpen ? ' is-open' : ''}`;

  return (
    <nav id="mobile-menu" aria-label="手機導覽選單" className={rootClass}>
      <div className={STYLES.container}>
        {menuLinks.map((link) => {
          const { zh, en } = splitLabel(link.label);
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleLinkClick(link.href, e)}
              className={STYLES.linkRow}
              aria-label={`前往${zh}${en ? ` / ${en}` : ''}區塊`}
            >
              <span className={STYLES.linkZh}>{zh}</span>
              {en && <span className={STYLES.linkEn}>{en}</span>}
            </a>
          );
        })}
        <button
          type="button"
          onClick={onClose}
          className={STYLES.close}
          aria-label="關閉導覽選單"
        >
          關閉選單 Close
        </button>
      </div>
    </nav>
  );
};
