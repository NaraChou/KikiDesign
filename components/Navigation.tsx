import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// 1. 引入圖片檔案 (使用相對路徑最穩定)
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

  return (
    <nav className="fixed top-0 w-full px-6 py-6 md:px-16 md:py-10 flex justify-between items-center z-50">
      {/* 左側 Logo 區域 */}
      <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center gap-4 group">
        <img
          src={kikiLogo}
          className="w-10 h-10 md:w-11 md:h-11 object-contain"
          alt="Logo"
        />

        <div className="flex flex-col items-start justify-center">
          {/* 上方：英文名稱 - 使用變數並確保正確關閉標籤 */}
          <span 
            className="uppercase font-light text-[#E63946] leading-none tracking-[0.8em] -mr-[0.8em] mb-1.5 opacity-90"
            style={{ fontSize: 'var(--font-size-base, 7px)' }}
          >
            Kiki Design
          </span>

          {/* 下方：中文名稱 */}
          <span className="chinese-art text-lg md:text-xl text-[#E63946] leading-none">
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