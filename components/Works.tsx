/**
 * A. 核心導入與主圖資源集中管理
 *   - 控制元件的記憶、動態效果與主視覺素材統一維護
 *   - 管理主圖讓日後易於擴充與更動
 */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/works.css';

import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';
import posterFlyerMain from '../assets/images/poster-flyer-main.webp';

/**
 * B. 資料結構與類型統一管理
 *   - 將共通樣式與屬性交由資料層統整，減少重複與易讀可維護
 *   - 將左右對齊配置歸納於同一區段，僅不同部分額外標註
 */
const ALIGN_CONFIG = {
  left: { textAlign: "text-left", infoJustify: "justify-start" },
  right: { textAlign: "text-right", infoJustify: "justify-end" },
};

const WORKS: {
  id: string;
  titleZH: string;
  titleEN: string;
  subtitle: string;
  img: string;
  bg: string;
  glow: string;
  extraClass?: string;
  textAlign: string;
  infoJustify: string;
}[] = [
  {
    id: 'personal-branding',
    titleZH: '個人品牌形象官網',
    titleEN: 'Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    bg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    glow: 'rgba(59, 130, 246, 0.4)',
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'logo-design',
    titleZH: '個人商標與名片',
    titleEN: 'Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    bg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    glow: 'rgba(168, 85, 247, 0.4)',
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
  {
    id: 'poster-flyer-design',
    titleZH: '海報、傳單設計',
    titleEN: 'Poster & Flyer Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: posterFlyerMain,
    bg: 'bg-[var(--work-card-bg3,rgba(46,26,26,0.50))]',
    glow: 'rgba(255, 127, 80, 0.4)',
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
];

/**
 * C. 型別定義與 WorkCard 組件
 *   - 型別集中於此，享有自動推斷與擴充彈性
 *   - WorkCard負責動態聚光、主圖顯示、資訊區排版
 */
type WorkType = typeof WORKS[number];

interface WorkCardProps {
  work: WorkType;
}

/**
 * D. WorkCard 卡片元件（結構清晰、樣式歸於 works.css，動態都用記憶法說明）
 */
const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  // [視覺記憶] 動態聚光效果（滑鼠追蹤）及樣式控制
  const setCardGlowVars = (target: HTMLDivElement, x: number, y: number) => {
    // 控制卡片上的 CSS 變數，使主圖動態聚焦於滑鼠座標
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    target.style.setProperty("--card-glow-color", work.glow);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 行動裝置不處理聚光避免效能負擔
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, clientX - rect.left, clientY - rect.top);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    // 滑鼠離開回到卡片中心
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, rect.width / 2, rect.height / 2);
  };

  return (
    <div
      className={`work-card ${work.extraClass ?? ''} group relative block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // [動態記憶] 卡片聚光 CSS 變數初始化，聚焦中心，顏色回預設
      style={{
        "--card-glow-color": work.glow,
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      <Link
        to={`/work/${work.id}`}
        className="absolute inset-0 z-40"
        aria-label={work.titleZH}
      />
      {/* [結構] 卡片圖區域，所有比例/aspect-ratio 由 object-contain 與 CSS 控制，無變形風險 */}
      <div className={`work-card-inner ${work.bg} transition-all duration-500 group-hover:translate-y-[-2px]`}>
        <div className="work-card-image-wrapper relative z-20 w-full h-full flex items-center justify-center p-6 md:p-8">
          <img
            src={work.img}
            alt={work.titleZH}
            className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </div>
        {/* [結構] 互動箭頭全交由 CSS 控制視覺，不使用動態 Tailwind */}
        <div className="work-card-arrow-wrapper absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="arrow-circle">↗</span>
        </div>
      </div>
      {/* [結構] 資訊區（左右對齊）語義化分層 */}
      <div className={`work-card-info ${work.textAlign}`}>
        <h3 className="uppercase">
          <div className="title-group">
            <span className="title-zh">{work.titleZH}</span>
            <span className="title-divider">/</span>
            <span className="title-en">{work.titleEN}</span>
          </div>
        </h3>
        <p className="work-card-subtitle uppercase">
          {work.subtitle}
        </p>
      </div>
    </div>
  );
};

/**
 * E. Works主場景區（結構與動畫邏輯統一於此）
 *   - section 層包裹 > 標題群 > 作品網格
 *   - 動畫進場效果僅於 GSAP 啟動一次，用於卡片同步動畫
 */
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // [視覺動態記憶] gsap 進場動畫初始化，確保滾動時卡片連動效果正確同步
  useEffect(() => {
    if (!window.gsap) return;
    const ctx = window.gsap.context(() => {
      window.gsap.utils.toArray('.work-card').forEach((card: any) => {
        window.gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=50px",
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
    <section id="works" ref={sectionRef}>
      <div className="content-width-container mx-auto w-full">
        {/* [結構] 區塊標題群（階層分明，不綁定Flex對齊由CSS主導） */}
        <header className="works-section-header">
          <h2 className="works-section-title">Portfolio</h2>
          <p className="works-section-label">Selected Fragments</p>
        </header>
        {/* [結構] 作品網格，資料驅動渲染，無重複HTML */}
        <div className="works-grid">
          {WORKS.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * F. 樣式/RWD管理區（總結）
 *   - 所有間距與RWD排版由 works.css與Tailwind統一管理
 *   - 主圖與圖片皆以 object-contain與max-* 控管比例防止變形
 *   - 間距統一採用Tailwind配置或8px倍數
 *   - 本區無!important，所有結構/邏輯分流與樣式分流
 */
