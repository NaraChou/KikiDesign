/**
 * A. React/Router 核心導入
 *    - 負責元件邏輯記憶、動態效果觸發
 *    - 資料結構與主視覺素材集中管理
 */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/works.css'; // 需指向 works.css 以掛載本區樣式

// B. 主圖資源集中管理（避免硬編、方便日後統一維護）
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';
import posterFlyerMain from '../assets/images/poster-flyer-main.webp';

/**
 * C. 主要資料結構（WORKS）與共用屬性集中
 *    - 統整對齊/排版/自定 class，避免重複
 *    - 將相同屬性統一，只針對不同細項再額外標註
 *    - 所有互動樣式純交由 tailwind + works.css 控制（不使用 inline style 除非變數）
 */
const CARD_ALIGN = {
  textAlign: 'text-left',  // A1. 預設資訊左對齊（排版語意用） 
  infoJustify: 'justify-start',
};
const CARD_ALIGN_RIGHT = {
  textAlign: 'text-right', // A2. 特定卡片右對齊
  infoJustify: 'justify-end',
};

const WORKS = [
  {
    id: 'personal-branding',
    titleZH: '個人品牌形象官網',
    titleEN: 'Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    bg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    glow: 'rgba(59, 130, 246, 0.4)',
    arrowHover: 'group-hover:bg-blue-500',
    extraClass: '',
    ...CARD_ALIGN,
  },
  {
    id: 'logo-design',
    titleZH: '個人商標與名片',
    titleEN: 'Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    bg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    glow: 'rgba(168, 85, 247, 0.4)',
    arrowHover: 'group-hover:bg-purple-500',
    extraClass: 'lg:mt-32', // 大型桌機時由 works.css 處理視覺落差
    ...CARD_ALIGN_RIGHT,
  },
  {
    id: 'poster-flyer-design',
    titleZH: '海報、傳單設計',
    titleEN: 'Poster & Flyer Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: posterFlyerMain,
    bg: 'bg-[var(--work-card-bg3,rgba(46,26,26,0.50))]',
    glow: 'rgba(255, 127, 80, 0.4)',
    arrowHover: 'group-hover:bg-orange-500',
    extraClass: '',
    ...CARD_ALIGN,
  },
];

/**
 * D. 型別定義（方便閱讀/未來資料擴充）
 */
type WorkType = typeof WORKS[number];
interface WorkCardProps {
  work: WorkType;
}

/**
 * E. WorkCard 卡片組件
 *    - 負責卡片單元：動態聚光、圖片顯示、資訊/箭頭
 *    - 註解翻譯視覺記憶行為
 */
const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  // [視覺化記憶] 控制 CSS 變數以實現卡片光暈聚焦（滑鼠追蹤），預設回中央
  const setCardGlowVars = (target: HTMLDivElement, x: number, y: number) => {
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
    target.style.setProperty("--card-glow-color", work.glow || "rgba(255,255,255,0.15)");
  };

  // [動態聚光] 滑鼠移動於卡片範圍時移動聚光焦點
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return; // 行動裝置不處理聚光
    const { currentTarget: target, clientX, clientY } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, clientX - rect.left, clientY - rect.top);
  };

  // [還原聚光] 滑鼠離開時，聚焦回卡片中心點
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    setCardGlowVars(target, rect.width / 2, rect.height / 2);
  };

  return (
    <div
      className={`work-card ${work.extraClass} group relative block`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // 動態變數交由聚光控制，禁用其它 inline style
      style={{
        '--card-glow-color': work.glow || "rgba(255,255,255,0.15)",
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      } as React.CSSProperties}
    >
      <Link
        to={`/work/${work.id}`}
        className="absolute inset-0 z-40"
        aria-label={work.titleZH}
      />
      {/* F. 卡片主體：視覺結構與動態樣式全部移至 works.css（object-fit: contain 保證主圖不變形） */}
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
        {/* 
          [互動箭頭區] 提示使用者可點擊進入更多細節
          視覺行為：預設隱藏，滑鼠進入卡片時淡入。顏色類別只以 work.arrowHover 控制 hover 狀態的背景色，不進行多餘 style 計算。
        */}
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {/* 這裡只需傳入 work.arrowHover 來控制 hover 時的背景色顏色 */}
          <span className={`arrow-circle ${work.arrowHover}`}>↗</span>
        </div>
      </div>
      {/* G. 資訊區域：依 textAlign 決定資訊對齊（左 or 右），語義分層 */}
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
 * H. Works 主區塊
 *    - 主場景容器 ref 綁定動畫
 *    - 結構 > 標題群組 > 網格
 *    - 動畫刷新、RWD 實作交由 works.css 處理
 */
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // [動畫記憶] 元件初次載入，啟動 gsap 進場動畫，保證畫面滾動時卡片連動效果不會錯位
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

  // [結構渲染] 標題群(header)已完全移除 md:items-center/md:items-start 等 Tailwind 置中或 flex類別，由 works.css 主導所有垂直&橫向對齊
  return (
    <section id="works" ref={sectionRef}>
      <div className="content-width-container mx-auto w-full">
        {/* I. 區塊標題群：視覺階層資訊。注意：header 上不應有 md:items-center 等置中類名，全部交由 CSS 控制。 */}
        <header className="works-section-header">
          <h2 className="works-section-title">Portfolio</h2>
          <p className="works-section-label">Selected Fragments</p>
        </header>
        {/* J. 作品網格（結構/樣式全數由 works.css、tailwind 處理） */}
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
 * K. 響應式統一說明（RWD 統合說明）：
 *    - 本模組所有 RWD 斷點、間距、排版動作皆交由 works.css、tailwind 於尾端 RWD 區統一管理
 *    - 保證主圖比例/aspect-ratio，無任何位移或變形風險（由 object-contain、works.css 控管）
 *    - 所有 spacing 統一以 tailwind spacing config or 8px 為單位
 */
