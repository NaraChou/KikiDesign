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
          {/* 上方：英文名稱 - 透過極大字距精準對齊中文寬度 */}
          {/* 使用自訂的字級 CSS 變數樣式 */}
          <span
            className="uppercase font-light text-[#E63946] leading-none tracking-[0.78em] -mr-[0.78em] mb-1.5 opacity-90"
            style={{
              fontSize: 'var(--font-size-base)',
              // md:text-[9px] 對應 font-size-large
              // 利用 media query 調整
              // tailwind md: -> 768px
              // 你也可以寫到全域 css .nav-logo-en 之類，不過這樣 inline style 也明確
              // 實作如下：
              '--font-size-large-temp': 'var(--font-size-large)',
            } as React.CSSProperties}
          >
            <span
              style={{
                fontSize: 'var(--font-size-base)',
                // mobile
                display: 'inline-block'
              } as React.CSSProperties}
              className="block md:hidden"
            >
              Kiki Design
            </span>
            <span
              style={{
                fontSize: 'var(--font-size-large)',
                display: 'none'
              } as React.CSSProperties}
              className="hidden md:block"
            >
              Kiki Design
            </span>
          </span>

          {/* 下方：中文名稱 - 套用您定義的 .chinese-art 藝術字體類別; 也改為用 CSS 變數 */}
          <span
            className="chinese-art text-[#E63946] leading-none"
            style={{
              fontSize: 'var(--font-size-large)', // 對應 text-xl
            }}
          >
            棠想視界
          </span>
        </div>
      </Link>
      
      {/* Desktop Links */}
      <div
        className="hidden md:flex space-x-12 tracking-[0.4em]"
        style={{ fontSize: 'var(--font-size-large)' }} // 原本 text-[9px]，這裡用較大版的
      >
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