import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// [圖片資源統一管理，所有圖片集中用於驅動渲染]
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';
import posterFlyerMain from '../assets/images/poster-flyer-main.webp';

/**
 * [資料結構歸一]
 * - 每一項作品，只保留有實質差異的資料欄位
 * - RWD 與互動相關 class，統一集中於這裡，防止散落各處不易維護
 * - 所有顏色與動態用於資料欄，CSS class 共用，減少類名的重複書寫
 */
const WORKS = [
  {
    id: 'personal-branding',
    titleZH: '個人品牌形象官網',
    titleEN: 'Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    bg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    textAlign: 'md:text-left',
    infoJustify: 'justify-start md:justify-start',
    extraClass: '',
    glow: 'rgba(59,130,246,0.5)',
    arrowHover: 'group-hover:bg-blue-500',
  },
  {
    id: 'logo-design',
    titleZH: '個人商標與名片',
    titleEN: 'Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    bg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    textAlign: 'text-right md:text-left',
    infoJustify: 'justify-end md:justify-start',
    extraClass: 'md:mt-64',
    glow: 'rgba(168,85,247,0.5)',
    arrowHover: 'group-hover:bg-purple-500',
  },
  {
    id: 'poster-flyer-design',
    titleZH: '海報、傳單設計',
    titleEN: 'Poster & Flyer Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: posterFlyerMain,
    bg: 'bg-[var(--work-card-bg3,rgba(46,26,26,0.50))]',
    textAlign: 'md:text-left',
    infoJustify: 'justify-start md:justify-start',
    extraClass: '',
    glow: 'rgba(255,127,80,0.5)',
    arrowHover: 'group-hover:bg-orange-500',
  }
];

/**
 * [滑鼠追蹤卡片組件]
 * [中文註解]
 * ▍滑鼠追蹤光暈效果
 * - 追蹤滑鼠在卡片上的相對位置 (X, Y)
 * - 將位置傳入 CSS 變數 --mouse-x 和 --mouse-y
 * - 在手機版（觸控）會自動失效，維持原本的全發光狀態
 */
interface WorkCardProps {
  work: typeof WORKS[0];
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  // [滑鼠追蹤] 為每個卡片建立獨立的滑鼠位置狀態
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLAnchorElement>(null);
  
  // [滑鼠追蹤處理] 計算滑鼠在卡片上的相對位置（百分比）
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // [觸控檢測] 如果是觸控設備，不執行滑鼠追蹤
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }
    
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };
  
  // [滑鼠離開] 重置到中心位置，恢復全發光狀態
  const handleMouseLeave = () => {
    setMousePosition({ x: 50, y: 50 });
  };
  
  return (
    <Link
      ref={cardRef}
      to={`/work/${work.id}`}
      className={`work-card group relative block ${work.extraClass}`}
      aria-label={`前往${work.titleZH} / ${work.titleEN} 詳細頁`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // [資料驅動 glow 色] 用 style 注入 --card-glow-color 給 CSS 處理
      // [滑鼠追蹤] 注入滑鼠位置 CSS 變數，用於 radial-gradient 光暈效果
      style={{ 
        '--card-glow-color': work.glow,
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      } as React.CSSProperties}
    >
      {/* === 卡片本體 — 相同結構合併統一管理 === */}
      <div
        className={[
          "relative overflow-hidden rounded-[18px]",
          work.bg,
          "min-h-[250px] md:min-h-[320px]",
          "flex flex-col items-center justify-center",
          "transition-all duration-500 group-hover:translate-y-[-2px]",
          "border border-white/5",
          "work-card-inner"
        ].join(' ')}
      >
        {/* [圖片] — 保持比例與細緻圓角，object-contain 有效維持不變型 */}
        <div className="relative z-20 w-full h-full flex items-center justify-center p-6 md:p-8">
          <img
            src={work.img}
            alt={`${work.titleZH} 代表圖片`}
            className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        {/* [浮動箭頭] — 每卡依資料色動態組合，hover時引導提點探索 */}
        <div
          className="
            absolute right-3 top-3 z-30
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            pointer-events-none
          "
        >
          <span className={[
            "arrow-circle w-7 h-7 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-[11px] text-white transition-all",
            work.arrowHover
          ].join(' ')}>
            ↗
          </span>
        </div>
      </div>
      {/* === 資訊欄 — 標題（中英/分色），副標題統整 === */}
      <div className={`work-card-info mt-6 px-1 ${work.textAlign}`}>
        <h3 className="text-[0.95rem] md:text-[1.05rem] leading-relaxed uppercase">
          <div
            className={`flex flex-wrap items-center gap-y-1 ${work.infoJustify}`}
          >
            {/* 中文主題 */}
            <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">
              {work.titleZH}
            </span>
            {/* 分隔斜線 */}
            <span className="px-2 opacity-30 font-extralight text-[#FDF6ED]">/</span>
            {/* 英文主題 */}
            <span className="font-light italic tracking-[0.22em] text-[#FDF6ED]/90 text-[0.8em] md:text-[0.87em]">
              {work.titleEN}
            </span>
          </div>
        </h3>
        <p className="text-[10px] md:text-[11px] font-extralight tracking-[0.4em] text-[var(--text-dim)] mt-2.5 uppercase">
          {work.subtitle}
        </p>
      </div>
    </Link>
  );
};

/**
 * [Kiki Design Style 實踐][完整視覺化白話說明]
 * ▍結構分層 = 區塊語義 → 卡片表現 → 互動動畫
 *   1.「元件的記憶」：GSAP 動畫初始化於 section 外層進場，促進視覺流暢。
 *   2.「視覺分區」：header(標題分流)、grid(卡片自動生成)、卡片獨立資料源。
 *   3.「語義化」：section/ header / h2 / h3 單純描寫，不重複結構。
 *   4.「純分流」：中英文主題欄以資料驅動判斷，不再分開手寫。
 *   5.「比例/非對稱/間距」：所有圖片 object-contain，間距皆依 config、class 體現。
 */
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // [連動效果] 畫面滾動到作品區即逐格漸顯，若報錯則所有卡片無進場動畫（但保留畫面結構）
  useEffect(() => {
    if (!window.gsap) return; // 報錯影響：畫面靜態進場、欠缺滑順動畫，可以補載 gsap
    const ctx = window.gsap.context(() => {
      window.gsap.utils.toArray('.work-card').forEach((card: HTMLElement) => {
        window.gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50px"
          },
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power2.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // [語義化分區] section：分派此區主題，便於 SEO 與結構統一
    <section
      id="works"
      ref={sectionRef}
      className="py-14 md:py-20 bg-[var(--works-bg,#181A23)]"
    >
      <div className="content-width-container mx-auto w-full">
        {/* === HEADER 區 — 主標、次標 === */}
        {/* 
          [視覺行為白話]
          - 主標題（斜體）中文與英文各自處理字距、美感
          - 副標加強輕量層次感
        */}
        <header className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-16 works-section-header">
          <h2 className="works-section-title mb-2 font-serif font-normal italic text-[1.1rem] md:text-[1.32rem] tracking-[0.22em] text-[var(--work-title-color,#FDF6ED)]">
            Portfolio
          </h2>
          <p className="works-section-label mt-0.5 font-light tracking-[0.28em]">
            Selected Fragments
          </p>
        </header>
        {/* === GRID 區 — 多卡片動態生成、無硬編重複 === */}
        <div className="grid gap-10 md:grid-cols-2 works-grid">
          {WORKS.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};