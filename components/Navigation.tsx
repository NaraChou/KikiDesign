import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/**
 * 導覽元件總說明｜視覺邏輯統整：
 * 1. 主結構：以 nav 語義標籤呈現，配合 fixed 及 main-container，確保品牌 LOGO、選單在不同裝置皆維持水平間距與一體感。
 * 2. 動態磨砂背景（連動效果）：記憶導覽列的「浮現」狀態（scrolled），滾動超過臨界值套用暗色漸層和 shadow，閱讀區塊更易分辨。
 * 3. Menu 資料統一於 NAV_MENUS 陣列管理，循環產生所有選單，嚴禁重複結構，便於維護與拓展（完全數據驅動）。
 * 4. 平滑滾動行為優先：首頁時優先 gsap 動畫，非首頁用 navigate + setTimeout 保證 DOM 渲染後才 scroll 動畫。無 gsap 則自動降級為 hash 跳轉，不影響畫面結構。
 * 5. 全圖片、連結及互動元素（a, img, button）均要求 alt/aria-label（SEO 與無障礙一體）。
 * 6. 所有樣式僅允許 Tailwind class（禁用 inline style，唯一例外為動畫動態屬性）。
 * 7. RWD 規範：導覽列及漢堡按鈕根據 md 斷點自動切換，spacing 清一色來自 tailwind.config.js 調整。
 * 8. 報錯標準：任何流程報錯僅影響互動，不導致結構閃動或視覺錯亂。
 */

/** Menu 選單類型與內容統一宣告 */
interface MenuItem {
  id: string;         // hash 錨點
  label: string;      // 顯示文案
  srLabel: string;    // 補充中文描述給 aria-label/SEO
}

/** Menu 資料來源（資料驅動，維護單點） */
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

  // [導覽列記憶]：scrolled = 漢堡浮現＋磨砂漸層
  // 滾動 12px 後進入「閱讀提升」狀態，主選單帶暗底與 shadow
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 當前滾動座標變化就即時記憶，讓使用者隨時看到最清爽的導覽
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 首次渲染立即套用一次
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // [導覽選單點擊邏輯｜互動動態白話]
  // 點擊選單後，若在首頁則嘗試動畫平滑捲動至目標；不在首頁則先跳首頁再滑
  // 若缺動畫資源則直接用 hash 定位（不會壞，只是沒動作感）
  // 報錯：此邏輯僅會導致無動畫，不影響結構，畫面呈現穩定
  const handleNavClick = (id: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isHome) {
      if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: 'power4.inOut' });
      } else {
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

  return (
    <nav
      // [動態視覺註解]
      // 「固定於畫面頂端」，由 scrolled 控制背景是否浮現磨砂
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? 'bg-gradient-to-b from-[#0E0C0B] via-[#0E0C0B]/80 to-transparent shadow-md'
            : 'bg-transparent'
        }
      `}
    >
      <div className="main-container flex justify-between items-center py-4 md:py-6">
        {/* [品牌LOGO區] 絕不變形＋ALT描述 */}
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
          <div className="flex flex-col items-start justify-center ml-0">
            <span className="chinese-art text-base text-[#E63946] leading-tight mt-0 tracking-[0.12em] -mr-[0.12em]">
              棠想視界
            </span>
            <span className="uppercase font-light text-[#E63946] leading-tight tracking-[0.12em] -mr-[0.12em] mb-0.5 opacity-90 text-[12px]">
              Kiki Design
            </span>
          </div>
        </Link>
        {/* [導覽選單｜桌面版 only] 循環渲染不重複 */}
        <div className="hidden md:flex space-x-12 tracking-main-nav">
          {NAV_MENUS.map(({ id, label, srLabel }) => (
            <a
              key={id}
              href={id}
              onClick={e => handleNavClick(id, e)}
              className="text-[12px] text-[var(--text-dim)] hover:text-white transition italic"
              aria-label={srLabel}
            >
              {label}
            </a>
          ))}
        </div>
        {/* [漢堡功能鈕｜行動裝置專用] */}
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
 * [Kiki Style／維護統整單一說明]
 * - 所有 menu 統一由 NAV_MENUS .map() 生成，結構不可重複。
 * - 樣式皆來自 Tailwind class，唯一動態屬性（如動畫偏移）例外。
 * - 圖片 object-contain、不允許變形，alt 必備。
 * - 使用語義標籤（nav, main, footer）、ARIA 補充＆SEO 友善。
 * - 報錯：任何錯誤僅失去動效，不影響畫面結構。
 */