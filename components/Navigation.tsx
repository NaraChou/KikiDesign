import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/**
 * [導覽元件統整說明]
 * - 主體以 nav 語義標籤＋fixed定位，確保 LOGO/選單/漢堡間距一體感，RWD自動切版。
 * - 背景動態磨砂（依 scrolled 狀態切換）維持 LOGO 易讀性與畫面分層。
 * - 所有選單資料集中於 NAV_MENUS 陣列，一處管理，map循環渲染。
 * - 點擊選單依是否為首頁選擇 gsap 平滑滾動或導向首頁後再 scroll；缺動畫自動回退 hash 跳轉。
 * - 全圖片/互動元件強制附 alt/aria-label，SEO/語意完整。
 * - 禁用 inline style，全部樣式來自 Tailwind class。特殊動態（如動畫偏移）例外。
 * - 報錯只影響互動（例如無動畫），畫面結構永不閃動。
 */

/** Menu 選單資料與型別集中宣告 */
interface MenuItem {
  id: string;      // hash錨點
  label: string;   // 顯示文案
  srLabel: string; // aria-label(中文補述)
}

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

  // [導覽列動態連動]：監聽捲動，高於12px則進入磨砂（scrolled），否則頂部極淡底色
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // 滾動時動態記憶狀態，連動視覺磨砂／LOGO可讀性
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化即判斷
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // [導覽選單點擊處理]：首頁→gsap動畫捲動　非首頁→navigate+setTimeout再滑動　無動畫回退hash
  // 出錯最大影響：沒動畫但能正確跳轉，結構完全不閃動
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
      // [scrolled 狀態連動]：頂端浮動磨砂，LOGO不受底圖影響辨識度（動態類別切換）
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? 'bg-gradient-to-b from-[#0E0C0B] via-[#0E0C0B]/90 to-transparent shadow-md'
            : 'bg-gradient-to-b from-black/20 to-transparent'
        }
      `}
    >
      <div className="main-container flex justify-between items-center py-4 md:py-6">
        {/* [LOGO區] 絕不變形 + ALT + 動態發光（group-hover:） */}
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="flex items-center gap-3 group nav-logo"
          tabIndex={0}
        >
          <img
            src={kikiLogo}
            className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-105"
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
        {/* [桌面導覽選單]：page menu 結構統一 map 渲染 */}
        <div className="hidden md:flex space-x-12 tracking-main-nav">
          {NAV_MENUS.map(menu => (
            <a
              key={menu.id}
              href={menu.id}
              onClick={e => handleNavClick(menu.id, e)}
              className="text-[12px] text-[var(--text-dim)] hover:text-white transition italic"
              aria-label={menu.srLabel}
            >
              {menu.label}
            </a>
          ))}
        </div>
        {/* [行動裝置-漢堡功能鈕] */}
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
 * [Kiki Style維護備註]
 * - menu永遠 map 渲染，資料與版型不重複。
 * - 樣式Only用Tailwind class（動態動畫屬性例外）。
 * - 圖片 object-contain 防止變形，alt 必填。
 * - 語義標籤完整（nav、main、footer），ARIA補強SEO。
 * - 報錯最多只失去動畫無閃動。
 */