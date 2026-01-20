import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/*
  「說明」（中文）：本組件全面使用標準內容寬度容器 .main-container
  — .main-container 已於全站 style.css 定義好最大寬度（max-w-7xl/80rem）、自動 margin/padding
  — 所有橫向內容（Logo/選單/漢堡）都統一定寬對齊，無需分散計算 padding
  — 一改動只需調整 style.css 的 .main-container，就能同步影響所有組件
  — 注意：上下內距仍由 nav 控制，響應式由 CSS 斷點自動處理
*/

interface NavigationProps {
  onToggleMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onToggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  /**
   * 處理「導覽點擊」的視覺效果
   * - 視覺效果（中文註解）：當點選選單時，畫面會滑動到指定內容，讓使用者視覺上「明確被帶到該區塊」。
   * - 技術改進：window.gsap 若不存在（未正確載入），完全不觸發動畫，也不報錯。
   * - 型別補全：window.gsap 必須型別安全呼叫，再無紅字報錯。
   */
  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      // 首頁時：直接呼叫 GSAP 平滑滾動到目標，若未載入不動作不報錯
      if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
      }
    } else {
      // 非首頁：切回首頁，延遲後平滑置頂到指定內容（避免內容突變導致跑版）
      navigate('/');
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
          window.gsap.to(window, { duration: 0, scrollTo: id });
        }
      }, 100);
    }
  };

  return (
    // nav 導覽條：主視覺區塊永遠置頂
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-transparent"
      // 視覺：上下內距走 style.css @media 控制，無需重複設定
    >
      <div
        className="
          main-container
          flex justify-between items-center
        "
      >
        {/* 左側 Logo 區域：img handdrawn 不變形，風格/logo 保護 */}
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
            // object-contain：確保手繪 Logo 不被壓縮拉伸
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
        
        {/* 右側 Desktop 選單：一行排列、字距拉長，強化藝術感 */}
        <div className="hidden md:flex space-x-12 text-[9px] tracking-[0.4em]">
          {/* 每個 menu 都呼叫 handleNavClick，保證滑動效果且無 TypeScript 錯誤 */}
          <a href="#home" onClick={(e) => handleNavClick('#home', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">01 / Index</a>
          <a href="#works" onClick={(e) => handleNavClick('#works', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">02 / Works</a>
          <a href="#philosophy" onClick={(e) => handleNavClick('#philosophy', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">03 / Vision</a>
          <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">04 / Contact</a>
        </div>

        {/* Mobile 漢堡菜單：跟隨主體寬度、絕不用 inline style */}
        <button 
          id="menu-toggle" 
          className="md:hidden flex flex-col space-y-1.5 p-2 cursor-pointer"
          onClick={onToggleMenu}
          type="button"
        >
          <div className="w-6 h-px bg-white/80"></div>
          <div className="w-4 h-px bg-white/80 ml-auto"></div>
        </button>
      </div>
    </nav>
  );
};