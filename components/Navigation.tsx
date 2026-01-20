import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

interface NavigationProps {
  onToggleMenu: () => void;
}

// 重新調整左/右側對齊（根據 Footer 寬度及 email 實測結果調整）
// 可根據 footer demo: 創意 CREATE 左側 76px、Email 右側 72px
const NAV_LEFT_DESKTOP = 'md:pl-[76px]';    // 和 Footer "CREATE" 左側對齊
const NAV_RIGHT_DESKTOP = 'md:pr-[72px]';   // 和 Footer email 右側對齊

export const Navigation: React.FC<NavigationProps> = ({ onToggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      if (window.gsap) {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        if (window.gsap) {
          window.gsap.to(window, { duration: 0, scrollTo: id });
        }
      }, 100);
    }
  };

  // 視覺兩邊都內縮：手機保留 px-6，桌機左76px右72px（根據 Footer 規則）
  return (
    <nav
      className={`
        fixed top-0 w-full
        px-6 py-6
        flex justify-between items-center z-50
        ${NAV_LEFT_DESKTOP} ${NAV_RIGHT_DESKTOP}
      `}
    >
      {/* 左側 Logo 區域 */}
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="flex items-center gap-2 group"
        tabIndex={0}
      >
        <img
          src={kikiLogo}
          className="w-10 h-10 object-contain"
          alt="Logo"
        />
        <div className="flex flex-col items-start justify-center ml-0">
          <span
            className="
              uppercase font-light text-[#E63946] leading-tight
              tracking-[0.12em]
              -mr-[0.12em]
              mb-0.5 opacity-90
            "
            style={{ fontSize: 'var(--font-size-base, 7px)' }}
          >
            Kiki Design
          </span>
          <span className="chinese-art text-base text-[#E63946] leading-tight mt-0">
            棠想視界
          </span>
        </div>
      </Link>
      
      {/* 右側 Desktop 選單 */}
      <div className="hidden md:flex space-x-12 text-[9px] tracking-[0.4em]">
        <a href="#home" onClick={(e) => handleNavClick('#home', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">01 / Index</a>
        <a href="#works" onClick={(e) => handleNavClick('#works', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">02 / Works</a>
        <a href="#philosophy" onClick={(e) => handleNavClick('#philosophy', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">03 / Vision</a>
        <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">04 / Contact</a>
      </div>

      {/* Mobile 漢堡選單 */}
      <button 
        id="menu-toggle" 
        className="md:hidden flex flex-col space-y-1.5 p-2 cursor-pointer"
        onClick={onToggleMenu}
      >
        <div className="w-6 h-px bg-white/80"></div>
        <div className="w-4 h-px bg-white/80 ml-auto"></div>
      </button>
    </nav>
  );
};