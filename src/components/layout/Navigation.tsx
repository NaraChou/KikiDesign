import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SCROLL_SMOOTH, SCROLL_INSTANT } from '../../utils/animationPresets';
import logoKikiSm from '../../assets/logo-kiki-sm.png';
import logoKikiMd from '../../assets/logo-kiki-md.png';

/**
 * [A] 視覺資訊備註
 * 頂部固定導覽：捲動後加深背景以利辨識；錨點與首頁 GSAP scrollTo 連動。#menu-toggle 保留供識別（若未來擴充）。
 */

// [B] 選單資料與樣式常數
interface MenuItem {
  id: string;
  label: string;
  srLabel: string;
}

const NAV_MENUS: MenuItem[] = [
  { id: '#home', label: '01 / Index', srLabel: '回到首頁區塊' },
  { id: '#works', label: '02 / Works', srLabel: '瀏覽作品區' },
  { id: '#philosophy', label: '03 / Vision', srLabel: '品牌理念 Vision' },
  { id: '#contact', label: '04 / Contact', srLabel: '聯絡方式 Contact' },
];

const STYLES = {
  wrapper: 'fixed top-0 left-0 w-full z-50 transition-all duration-300',
  toneScrolled: 'bg-gradient-to-b from-[var(--bg-color)] via-[var(--bg-color)]/90 to-transparent shadow-md',
  toneTop: 'bg-gradient-to-b from-black/20 to-transparent',
  container: 'main-container flex justify-between items-center py-4 md:py-6',
  brand: 'flex items-center space-x-4 group',
  brandMark: 'relative w-12 h-12 flex-shrink-0',
  brandImage: 'w-full h-full object-contain transition-transform duration-500 group-hover:scale-110',
  brandCopy: 'flex flex-col items-start justify-center ml-0',
  title:
    'chinese-art text-base text-[var(--brand-accent)] leading-tight mt-0 tracking-[0.12em] -mr-[0.12em]',
  subtitle:
    'uppercase font-light text-[var(--brand-accent)] leading-tight tracking-[0.12em] -mr-[0.12em] mb-0.5 opacity-90 text-[12px]',
  menu: 'hidden md:flex space-x-12 tracking-main-nav',
  menuLink: 'nav-link',
  toggle: 'flex flex-col space-y-1.5 p-2 cursor-pointer md:hidden',
  toggleBar: 'w-6 h-px bg-white/80',
  toggleBarShort: 'w-4 h-px bg-white/80 ml-auto',
} as const;

interface NavigationProps {
  onToggleMenu: () => void;
}

// [C] 元件主體
export const Navigation: React.FC<NavigationProps> = ({ onToggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
        window.gsap.to(window, { ...SCROLL_SMOOTH, scrollTo: id });
      } else {
        window.location.hash = id;
      }
    } else {
      navigate('/');
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
          window.gsap.to(window, { ...SCROLL_INSTANT, scrollTo: id });
        } else {
          window.location.hash = id;
        }
      }, 100);
    }
  };

  const navClass = `${STYLES.wrapper} ${scrolled ? STYLES.toneScrolled : STYLES.toneTop}`;

  return (
    <nav className={navClass}>
      <div className={STYLES.container}>
        <Link to="/" className={STYLES.brand} aria-label="回到首頁">
          <div className={STYLES.brandMark}>
            <img
              src={logoKikiSm}
              srcSet={`${logoKikiSm} 1x, ${logoKikiMd} 2x`}
              alt="Kiki Design 棠想視界"
              className={STYLES.brandImage}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className={STYLES.brandCopy}>
            <span className={STYLES.title}>棠想視界</span>
            <span className={STYLES.subtitle}>Kiki Design</span>
          </div>
        </Link>

        <div className={STYLES.menu}>
          {NAV_MENUS.map((menu) => (
            <a
              key={menu.id}
              href={menu.id}
              onClick={(e) => handleNavClick(menu.id, e)}
              className={STYLES.menuLink}
              aria-label={menu.srLabel}
            >
              {menu.label}
            </a>
          ))}
        </div>

        <button
          id="menu-toggle"
          className={STYLES.toggle}
          onClick={onToggleMenu}
          type="button"
          aria-label="展開主選單"
        >
          <div className={STYLES.toggleBar}></div>
          <div className={STYLES.toggleBarShort}></div>
        </button>
      </div>
    </nav>
  );
};
