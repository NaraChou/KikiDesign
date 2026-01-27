import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 圖片資源統一管理
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';
import posterFlyerMain from '../assets/images/poster-flyer-main.webp';

// [資料結構統整]
// 只保留差異key, 相同資料合併到下方共用區
const COMMON_CARD_PROPS = {
  textAlign: 'md:text-left', // 預設左對齊
  infoJustify: 'justify-start md:justify-start',
  extraClass: '',
};
const WORKS = [
  {
    id: 'personal-branding',
    titleZH: '個人品牌形象官網',
    titleEN: 'Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    bg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    glow: 'rgba(59,130,246,0.9)',
    arrowHover: 'group-hover:bg-blue-500',
    ...COMMON_CARD_PROPS,
  },
  {
    id: 'logo-design',
    titleZH: '個人商標與名片',
    titleEN: 'Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    bg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    textAlign: 'text-right md:text-left', // 此卡片右對齊
    infoJustify: 'justify-end md:justify-start',
    extraClass: 'md:mt-64', // 此卡片有額外間距
    glow: 'rgba(168,85,247,0.4)',
    arrowHover: 'group-hover:bg-purple-500',
  },
  {
    id: 'poster-flyer-design',
    titleZH: '海報、傳單設計',
    titleEN: 'Poster & Flyer Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: posterFlyerMain,
    bg: 'bg-[var(--work-card-bg3,rgba(46,26,26,0.50))]',
    glow: 'rgba(255,127,80,0.4)',
    arrowHover: 'group-hover:bg-orange-500',
    ...COMMON_CARD_PROPS,
  }
];

// [型別定義] — 直接從 WORKS 條目推衍
type WorkType = typeof WORKS[number];
interface WorkCardProps {
  work: WorkType;
}

// 卡片元件
const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  // 滑鼠事件歸類
  const setCardGlowVars = (
    target: HTMLDivElement, x: number, y: number
  ) => {
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    target.style.setProperty("--card-glow-color", work.glow || "rgba(255,255,255,0.15)");
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, clientX - rect.left, clientY - rect.top);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, rect.width / 2, rect.height / 2);
  };

  // 共用class統整
  const innerCardClasses = [
    "relative overflow-hidden rounded-[18px]",
    work.bg,
    "min-h-[250px] md:min-h-[320px]",
    "flex flex-col items-center justify-center",
    "transition-all duration-500 group-hover:translate-y-[-2px]",
    "border border-white/5",
    "work-card-inner"
  ].join(' ');

  const arrowClasses = [
    "arrow-circle w-7 h-7 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-[11px] text-white transition-all",
    work.arrowHover
  ].join(' ');

  return (
    <div
      className={`work-card ${work.extraClass} group relative block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--card-glow-color': work.glow || "rgba(255,255,255,0.15)",
        '--mouse-x': '-500px',
        '--mouse-y': '-500px'
      } as React.CSSProperties}
    >
      <Link
        to={`/work/${work.id}`}
        className="absolute inset-0 z-40"
        aria-label={`前往${work.titleZH} / ${work.titleEN} 詳細頁`}
        tabIndex={-1}
        style={{ display: 'block' }}
      />
      {/* 卡片主體 */}
      <div className={innerCardClasses}>
        <div className="work-card-image-wrapper relative z-20 w-full h-full flex items-center justify-center p-6 md:p-8">
          <img
            src={work.img}
            alt={`${work.titleZH} 代表圖片`}
            className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        {/* 箭頭提示 */}
        <div className="
          absolute right-3 top-3 z-30
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          pointer-events-none
        ">
          <span className={arrowClasses}>↗</span>
        </div>
      </div>
      {/* 卡片資訊區塊 */}
      <div className={`work-card-info mt-6 px-1 ${work.textAlign}`}>
        <h3 className="text-[0.95rem] md:text-[1.05rem] leading-relaxed uppercase">
          <div
            className={`flex flex-wrap items-center gap-y-1 ${work.infoJustify}`}
          >
            {/* 主題統一： 中文 / 英文 */}
            <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">{work.titleZH}</span>
            <span className="px-2 opacity-30 font-extralight text-[#FDF6ED]">/</span>
            <span className="font-light italic tracking-[0.22em] text-[#FDF6ED]/90 text-[0.8em] md:text-[0.87em]">
              {work.titleEN}
            </span>
          </div>
        </h3>
        <p className="text-[10px] md:text-[11px] font-extralight tracking-[0.4em] text-[var(--text-dim)] mt-2.5 uppercase">
          {work.subtitle}
        </p>
      </div>
    </div>
  );
};

// 主元件
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP動畫統一管理
  useEffect(() => {
    if (!window.gsap) return;
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
    <section
      id="works"
      ref={sectionRef}
      className="py-14 md:py-20 bg-[var(--works-bg,#181A23)]"
    >
      <div className="content-width-container mx-auto w-full">
        <header className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-16 works-section-header">
          <h2 className="works-section-title mb-2 font-serif font-normal italic text-[1.1rem] md:text-[1.32rem] tracking-[0.22em] text-[var(--work-title-color,#FDF6ED)]">
            Portfolio
          </h2>
          <p className="works-section-label mt-0.5 font-light tracking-[0.28em]">
            Selected Fragments
          </p>
        </header>
        <div className="grid gap-10 md:grid-cols-2 works-grid">
          {WORKS.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};