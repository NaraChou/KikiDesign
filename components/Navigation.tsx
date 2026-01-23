import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/**
 * [導覽元件總說明｜視覺行為總覽]:
 * 1. 視覺核心「主線」：全域共用 .main-container，左右一致對齊、上下主間距（py-6/md:py-10），確保 LOGO 與 Menu 在各端一體感飽滿。
 * 2. 動態背景「磨砂切換」：組件自持滾動記憶（scrolled），依視窗高度決定是否開啟磨砂深色背景，主選單在背景圖頂部時透明，在頁面下滑時自動浮現、方便閱讀。
 * 3. 導覽 Menu 驅動：所有 Menu 統一維護於 NAV_MENUS（Array），.map() 生成，避免結構重複，易於維護與拓展。
 * 4. 點擊邏輯：menu 點擊時，首頁用 window.gsap 平滑滾動，非首頁則先切首頁，再滑到錨點（若動畫環境缺失則瀏覽器瞬跳，畫面體驗不壞）。
 * 5. SEO 與可讀性：所有 img、a 標籤有明確 alt/aria-label，且文字結構語意完整，方便搜尋與輔助瀏覽。
 * 6. 樣式實現：全部透過 Tailwind 實現，除動畫需要的動態 style 外禁止直接寫 style={{...}}。
 */

/** 
 * [導覽項目型別 MenuItem]
 * - id: 對應區塊錨點
 * - label: 顯示用文字
 * - srLabel: 中文敘述（輔助技術／SEO用）
 */
interface MenuItem {
  id: string
  label: string
  srLabel: string
}

/**
 * [Menu 資料來源／統一控管]
 * 若新增、刪減或調整 menu，僅需維護此一陣列
 */
const NAV_MENUS: MenuItem[] = [
  { id: '#home',        label: '01 / Index',     srLabel: '回到首頁區塊' },
  { id: '#works',       label: '02 / Works',     srLabel: '瀏覽作品區' },
  { id: '#philosophy',  label: '03 / Vision',    srLabel: '品牌理念 Vision' },
  { id: '#contact',     label: '04 / Contact',   srLabel: '聯絡方式 Contact' },
];

interface NavigationProps {
  onToggleMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onToggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // [導覽「磨砂切換」記憶]：監控畫面滾動，決定導覽背景模式
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 當用戶滑動時，根據 scrollY 決定 scrolled 狀態，用於導覽條磨砂與半透明底顯示
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 首次載入時即時判斷

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * [Menu 點擊平滑邏輯]
   * - 若在首頁，直接用 window.gsap 平滑捲動至對應區塊
   * - 若非首頁，先切至 /，再嘗試滾動到目標區塊（此場景延遲setTimeout是為確保DOM渲染完畢）
   * - 若動畫功能缺失，則降級為直接跳轉錨點，不會造成畫面壞掉
   *
   * # 報錯狀態說明：動畫失敗只會少掉滑動效果，畫面不會閃爍與壞掉
   */
  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: 'power4.inOut' });
      } else {
        // 如果沒 gsap，單純用 hash 跳轉（降級體驗、不壞畫面）
        window.location.hash = id;
      }
    } else {
      navigate('/');
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
          window.gsap.to(window, { duration: 0, scrollTo: id });
        } else {
          window.location.hash = id;
        }
      }, 100);
    }
  };

  /**
   * [組件結構說明]
   *
   * 1. <nav> 負責語意區分，scrolled時加上系統 backdrop-blur 與暗底，提升內容可見性。
   * 2. <Link /> 大 Logo+品牌名-雙語，SEO 友善且放 object-contain，不會壓縮圖片。
   * 3. 導覽列部分.map渲染，Menu項目資料全部統一維護。
   * 4. 漢堡按鈕僅手機時顯示，呼叫 onToggleMenu。
   *
   * Tailwind 配置全部嚴格適用，spacing/border-radius/色彩遵循專案配置，禁手寫 style。
   */
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-sm bg-[#191D23]/70 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="main-container flex justify-between items-center py-6 md:py-10">
        {/* 品牌Logo區 */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-3"
          tabIndex={0}
        >
          <img
            src={kikiLogo}
            className="w-10 h-10 object-contain"
            alt="手繪森林主題Logo"
          />
          {/* 雙語品牌字＋間距 */}
          <div className="flex flex-col items-start justify-center ml-0">
            <span className="chinese-art text-base text-[#E63946] leading-tight mt-0 tracking-[0.12em] -mr-[0.12em]">
              棠想視界
            </span>
            <span className="uppercase font-light text-[#E63946] leading-tight tracking-[0.12em] -mr-[0.12em] mb-0.5 opacity-90 text-[12px]">
              Kiki Design
            </span>
          </div>
        </Link>

        {/* 桌面版導覽列：資料驅動，非手寫 */}
        <div className="hidden md:flex space-x-12 tracking-main-nav">
          {NAV_MENUS.map(({ id, label, srLabel }) => (
            <a
              key={id}
              href={id}
              onClick={e => handleNavClick(id, e)}
              className="text-[12px] text-[rgba(234,226,214,0.8)] hover:text-white transition italic"
              aria-label={srLabel}
            >
              {label}
            </a>
          ))}
        </div>

        {/* 行動漢堡按鈕 */}
        <button
          id="menu-toggle"
          className="md:hidden flex flex-col space-y-1.5 p-2 cursor-pointer"
          onClick={onToggleMenu}
          type="button"
          aria-label="展開主選單"
        >
          <div className="w-6 h-px bg-white/80"></div>
          <div className="w-4 h-px bg-white/80 ml-auto"></div>
        </button>
      </div>
    </nav>
  );
};

/**
 * [Kiki Style & 維護規範整合]
 * 1. 所有導覽選單項目依 NAV_MENUS 資料統一生成，不允許重複結構
 * 2. 樣式僅透過 Tailwind class 管理，嚴禁硬寫 style，特殊字級間距於 tailwind.config.js 擴充
 * 3. 圖片保持 object-contain、不變形，並給足 alt
 * 4. 報錯時導覽僅全透明不會壞
 * 5. 語義標籤、可及性/SEO完善
 */