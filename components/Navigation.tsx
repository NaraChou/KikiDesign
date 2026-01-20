import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

interface NavigationProps {
  onToggleMenu: () => void;
}

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

  // 統一 Logo 樣式（含各斷點），讓各裝置一致
  return (
    <nav className="fixed top-0 w-full px-6 py-6 md:px-6 md:py-6 flex justify-between items-center z-50">
      {/* 左側 Logo 區域（電腦/平板與手機一樣） */}
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="flex items-center gap-2 group"
      >
        <img
          src={kikiLogo}
          className="w-10 h-10 object-contain" // 統一使用 w-10 h-10 全螢幕
          alt="Logo"
        />
        <div className="flex flex-col items-start justify-center ml-0">
          {/* 英文名稱：維持一致 */}
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
          {/* 中文名稱：維持一致 */}
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