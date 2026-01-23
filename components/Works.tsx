import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// [圖片資源集中管理]
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';

/**
 * [元件的記憶統合]
 * - 兩個作品資訊以陣列管理，避免重複結構
 * - 所有統一與相近屬性集合 ── 顏色、排版、字型與圖片
 * - 僅保留一個 textAlign 字串，由外部帶入 tailwind className
 * [註解說明] 這樣能讓資料驅動畫面、視覺樣式寫法更容易維護
 */
const projects = [
  {
    id: 'personal-branding',
    title: '個人品牌形象官網 / Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    cardBg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    textAlign: 'md:text-left',
    extraClass: '', // 如需額外微調padding/margin
  },
  {
    id: 'logo-design',
    title: '個人商標與名片 / Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    cardBg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    textAlign: 'text-right md:text-left',
    extraClass: 'md:mt-64',
  }
];

/**
 * [溝通視覺化：Works 區塊]
 * - 展示作品一覽，每個作品皆為卡片，動態進場動畫
 * - 內容排列、字體、比例皆走 Tailwind 樣式，圖片絕不變形
 * - 「元件的記憶」：每個卡片點擊導向各自詳細頁
 * - 卡片動畫採 GSAP + ScrollTrigger 實現連動流暢
 */
export const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // [連動效果] GSAP 進場動畫：每個「work-card」隨捲動淡進
  useEffect(() => {
    if (window.gsap) {
      const ctx = window.gsap.context(() => {
        window.gsap.utils.toArray('.work-card').forEach((card: any) => {
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
    // [語義化視覺] 用 section 主體包裹，確保 RWD 一致、SEO 友好
    <section id="works" ref={containerRef} className="py-20 md:py-32 bg-[var(--works-bg,#181A23)]">
      <div className="content-width-container mx-auto w-full">
        {/* ────── 區塊標題區（資訊統合）────── */}
        <header className="text-center mb-12 md:mb-20">
          {/* 主標題 */}
          <h2 className="chinese-art font-light italic text-[2rem] md:text-4xl tracking-widest works-section-title">
            Portfolio
          </h2>
          {/* 補充標籤 */}
          <p className="uppercase mt-2 text-xs tracking-[0.15em] text-[var(--brand-accent,#EF4444)] works-section-label">
            Selected Fragments
          </p>
        </header>

        {/* ────── 作品組合資源區（資料驅動，無重複結構）────── */}
        <div className="grid gap-12 md:grid-cols-2 works-grid">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              className={`work-card group relative block transition-transform ${p.extraClass}`}
              aria-label={`前往${p.title}詳細頁`}
            >
              {/* [卡片主體] 背景漸層 + overlay，確保色彩與動畫一致 */}
              <div className={`overflow-hidden rounded-xl relative shadow-lg ${p.cardBg} pb-10`}>
                {/* 漸變遮罩效果，營造深淺層次 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20 pointer-events-none z-10 work-card-overlay"></div>
                {/* 主圖：object-fit:contain 絕不變形 */}
                <img
                  src={p.img}
                  alt={`${p.title} 代表作圖像`}
                  className="work-card-image w-full aspect-[4/3] object-contain transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                {/* 箭頭圈圈放右下角，hover 亮起連動 */}
                <div className="absolute right-6 bottom-6 z-20 work-card-arrow">
                  <span className="arrow-circle w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-white text-lg transition bg-opacity-70 group-hover:bg-white group-hover:text-[var(--brand-accent,#EF4444)]">
                    ↗
                  </span>
                </div>
              </div>
              {/* 作品資料（資訊統一管理） */}
              <div className={`work-card-info mt-5 px-2 ${p.textAlign}`}>
                <h3 className="work-card-title font-semibold text-lg md:text-2xl text-[var(--work-card-title,#FDF6ED)] mb-2">
                  {p.title}
                </h3>
                <p className="work-card-subtitle font-light text-xs md:text-base tracking-wider text-[var(--work-card-subtitle,#EAE2D6B2)]">
                  {p.subtitle}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};