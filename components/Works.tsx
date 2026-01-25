import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// [圖片資源集中管理]
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';

/**
 * [資料歸類與結構優化]
 * 同上說明
 */
const projectData = [
  {
    id: 'personal-branding',
    title: '個人品牌形象官網 / Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    bg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    textAlign: 'md:text-left',
    extraClass: '',
    shadowColor: 'rgba(59,130,246,0.5)', // 統一資料歸類
    arrowHoverBg: 'group-hover:bg-blue-500',
  },
  {
    id: 'logo-design',
    title: '個人商標與名片 / Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    bg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    textAlign: 'text-right md:text-left',
    extraClass: 'md:mt-64',
    shadowColor: 'rgba(168,85,247,0.5)',
    arrowHoverBg: 'group-hover:bg-purple-500',
  }
];

// [視覺結構動態說明]
// Kiki Style：1.語義化分區；2.RWD基礎配置一致；3.所有互動細節由 CSS group-hover 管理
export const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // [連動效果] 卡片進場動畫（淡入與浮現）
  useEffect(() => {
    // 若出現錯誤，畫面的動態流暢進場會消失（靜態內容OK）
    if (window.gsap) {
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
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    // [語義化結構] section標記內容區
    <section id="works" ref={containerRef} className="py-14 md:py-20 bg-[var(--works-bg,#181A23)]">
      <div className="content-width-container mx-auto w-full">
        {/* --------- 區塊標題與副標題 --------- */}
        {/* 
          [視覺行為]
          主標題字體精緻斜體，中英文字距優雅，副標題淡化強化辨識感
        */}
        <header className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-16 works-section-header">
          <h2 className="works-section-title mb-2 font-serif font-normal italic text-[1.1rem] md:text-[1.32rem] tracking-[0.22em] text-[var(--work-title-color,#FDF6ED)]">
            Portfolio
          </h2>
          <p className="works-section-label mt-0.5 font-light tracking-[0.28em]">
            Selected Fragments
          </p>
        </header>
        {/* --------- 作品卡片資料驅動區 --------- */}
        <div className="grid gap-10 md:grid-cols-2 works-grid">
          {/* 
            [資料驅動]
            - forEach 使用 .map() 動態生成結構，減少一切重複的 HTML 渲染
            - 分類整理所有 className，集中維護
          */}
          {projectData.map((proj) => (
            <Link
              key={proj.id}
              to={`/work/${proj.id}`}
              className={`work-card group relative block ${proj.extraClass}`}
              aria-label={`前往${proj.title}詳細頁`}
              // [動態注入變數] 以 style 傳遞 glow 顏色給 CSS --card-glow-color
              style={{ "--card-glow-color": proj.shadowColor } as React.CSSProperties}
            >
              {/* --- 卡片主體：維持圓角、光暈、比例 --- */}
              <div
                className={[
                  "relative overflow-hidden rounded-[18px]",
                  proj.bg,
                  "min-h-[250px] md:min-h-[320px]",
                  "flex flex-col items-center justify-center",
                  "transition-all duration-500 group-hover:translate-y-[-2px]",
                  "border border-white/5",
                  "work-card-inner" // 新 class，使用 CSS 處理 hover-glow
                ].join(' ')}
              >
                {/* 圖片需維持比例與物件貼齊，不可變形 */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-6 md:p-8">
                  <img
                    src={proj.img}
                    alt={proj.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                {/* 
                  箭頭浮現：hover 時顯示且色彩依作品變化 
                  [視覺化說明] → 畫面動畫引導探索意圖
                */}
                <div 
                  className="
                    absolute right-3 top-3 z-30
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none
                  "
                >
                  <span className={[
                    "arrow-circle w-7 h-7 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-[11px] text-white transition-all",
                    proj.arrowHoverBg
                  ].join(' ')}>
                    ↗
                  </span>
                </div>
              </div>
              {/* --- 資訊區塊（標題＋副標題） --- */}
              {/* 
                [結構歸併]
                - 標題支援中英文精緻分流、不重複組件
                - justify-end, justify-start自動帶入
              */}
              <div className={`work-card-info mt-6 px-1 ${proj.textAlign}`}>
                <h3 className="text-[0.95rem] md:text-[1.05rem] leading-relaxed uppercase">
                  {proj.title.includes('/') ? (
                    <div
                      className={`flex flex-wrap items-center gap-y-1 ${
                        proj.textAlign.includes('text-right')
                          ? 'justify-end'
                          : 'justify-start'
                      } md:justify-start`}
                    >
                      {/* 中文主題字 */}
                      <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">
                        {proj.title.split('/')[0].trim()}
                      </span>
                      {/* 分隔斜線 */}
                      <span className="px-2 opacity-30 font-extralight text-[#FDF6ED]">/</span>
                      {/* 英文主題字 */}
                      <span className="font-light italic tracking-[0.22em] text-[#FDF6ED]/90 text-[0.8em] md:text-[0.87em]">
                        {proj.title.split('/')[1].trim()}
                      </span>
                    </div>
                  ) : (
                    <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">{proj.title}</span>
                  )}
                </h3>
                <p className="text-[10px] md:text-[11px] font-extralight tracking-[0.4em] text-[#EAE2D6B2] mt-2.5 opacity-80 uppercase">
                  {proj.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};