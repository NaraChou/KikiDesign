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

  /**
   * 處理「導覽點擊」的視覺效果
   * - 同頁時做滑動動畫
   * - 他頁時先回首頁再滑動到指定區塊
   */
  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      // 視覺動態：滑動到指定區塊
      if (window.gsap) {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
      }
    } else {
      // 非首頁時，先跳首頁再滑動
      navigate('/');
      setTimeout(() => {
        if (window.gsap) {
          window.gsap.to(window, { duration: 0, scrollTo: id });
        }
      }, 100);
    }
  };

  // 說明：這裡不再使用 tailwind 的 pl-[64px]，改用全域 CSS 變數，確保 Navigation/Footer 一致化
  // (行動端：左右 24px；平板/桌機：左右 64px)
  // 上 padding 也改用變數對應（40px, 代表 pt-10）

  return (
    <nav
      className="fixed top-0 w-full flex justify-between items-center z-50"
      style={{
        // 強制全站統一：行動裝置優先
        paddingLeft: 'var(--layout-side-padding-mobile, 24px)',
        paddingRight: 'var(--layout-side-padding-mobile, 24px)',
        paddingTop: '24px',
        paddingBottom: '24px',
        // 平板/桌機斷點，這裡會在 style.css 做
      }}
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
        {/* 註解：這裡做 scroll 動畫，視覺上會由選單點擊滑動到區塊 */}
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