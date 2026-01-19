import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// 1. 先引入圖片檔案
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
      // If not home, navigate home then scroll (simple implementation: just nav home)
      // For precise scroll after nav, we would need context/state, but for now simple nav is sufficient UX
      navigate('/');
      setTimeout(() => {
         if (window.gsap) {
            window.gsap.to(window, { duration: 0, scrollTo: id });
         }
      }, 100);
    }
  };

// src/components/Navigation.tsx
  return (
    <nav className="fixed top-0 w-full px-6 py-6 md:px-16 md:py-10 flex justify-between items-center z-50">
      {/* 點擊 Logo 回到首頁 */}
      {/* src/components/Navigation.tsx 中的 Link 部分 */}

      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-4 group">
        {/* Logo 圖示 */}
        <img
          src={kikiLogo}
          className="w-10 h-10 md:w-11 md:h-11 object-contain"
          alt="Logo"
        />

        {/* 垂直文字容器 */}
        <div className="flex flex-col items-start justify-center">
          {/* 上方：英文名稱 (透過極大字距對齊中文寬度) */}
          <span className="text-[8px] md:text-[10px] uppercase font-light text-[#E63946] leading-none tracking-[0.65em] opacity-90 -mr-[0.65em]">
            Kiki Design
          </span>

          {/* 下方：中文名稱 (套用自定義藝術字體類別) */}
          <span className="chinese-art text-lg md:text-xl text-[#E63946] leading-none mt-1.5">
            棠想視界
          </span>
        </div>
      </Link>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-12 text-[9px] tracking-[0.4em]">
        <a href="#home" onClick={(e) => handleNavClick('#home', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">01 / Index</a>
        <a href="#works" onClick={(e) => handleNavClick('#works', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">02 / Works</a>
        <a href="#philosophy" onClick={(e) => handleNavClick('#philosophy', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">03 / Vision</a>
        <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">04 / Contact</a>
      </div>

      {/* Mobile Toggle */}
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