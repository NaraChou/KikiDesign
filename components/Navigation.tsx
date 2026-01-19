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
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center">
        {/* 1. 這是您的兔子 Logo */}
        <img
          src={kikiLogo}
          alt="棠想視界 Logo"
          // 這裡設定尺寸，w-10 約 40px，您可以根據需求調整成 w-8 或 w-12
          className="w-10 h-10 md:w-12 md:h-12 object-contain"
          style={{ backgroundColor: 'transparent' }} // 確保背景不干擾
        />
        {/* 2. 把文字加在 Logo 旁邊 */}
        <span className="text-xl md:text-2xl tracking-[0.3em] font-light text-[#E63946] font-sans">
          棠想視界
        </span>
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