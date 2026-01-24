import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// [圖片資源集中管理]
import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoStationery from '../assets/images/logo-branding-stationery.webp';

/**
 * [元件的記憶統合]
 * - 作品資料抽象成陣列: 避免重複結構，便於動態渲染
 * - 字級、間距、顏色皆為精細微調，讓中英文都保持優雅精緻
 * [視覺註解] 更強調細膩與舒適，確保整體 Typography 輕盈且流暢
 * [新版] 每個作品新增 hoverShadow（Tailwind 顏色發光類別），搭配 group-hover 控制個別卡片高級光暈色
 */
const projects = [
  {
    id: 'personal-branding',
    title: '個人品牌形象官網 / Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    cardBg: 'bg-[var(--work-card-bg1,rgba(26,28,46,0.50))]',
    textAlign: 'md:text-left',
    extraClass: '',
    // 設定作品一：藍色發光
    hoverShadow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]',
  },
  {
    id: 'logo-design',
    title: '個人商標與名片 / Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoStationery,
    cardBg: 'bg-[var(--work-card-bg2,rgba(46,26,46,0.50))]',
    // [注意] 視覺設定優先：手機端需靠右，md 以上才左對齊
    textAlign: 'text-right md:text-left', // <--- 已正確設置
    extraClass: 'md:mt-64',
    // 設定作品二：紫色發光
    hoverShadow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]',
  }
];

/**
 * [視覺體驗註解]
 * - 標題字體美學優化，中文字維持正體穩重，英文精緻斜體並加大字距產生呼吸感
 * - 分隔線極簡淡化，副標題營造精品質感
 */
export const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // [連動效果] GSAP 進場動畫，淡入展現細緻動態
  useEffect(() => {
    // 若遇錯誤：畫面會少掉卡片流暢浮現的細節，但內容靜態仍正常
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
    // [語義化結構] section為主要視覺分區，方便RWD和SEO
    <section id="works" ref={containerRef} className="py-14 md:py-20 bg-[var(--works-bg,#181A23)]">
      <div className="content-width-container mx-auto w-full">
        {/* ────── 區塊標題，極簡細緻布局 ────── */}
        {/* 
          [視覺邏輯]
          - 主題字體升級為細緻斜體與優雅間距
          - 字級、間距皆更細膩
        */}
        <header className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-16 works-section-header">
          {/* 主標題：更小字級，Serif 細重斜體，字距加強優雅感 */}
          <h2 className="works-section-title mb-2 font-serif font-normal italic text-[1.1rem] md:text-[1.32rem] tracking-[0.22em] text-[var(--work-title-color,#FDF6ED)]">
            Portfolio
          </h2>
          {/* 補充標籤：優化字體細節提升輕盈感 */}
          <p className="uppercase mt-0.5 text-[9.5px] md:text-[10.6px] tracking-[0.28em] text-[var(--brand-subtle,#EAE2D6)] font-light">
            Selected Fragments
          </p>
        </header>
        {/* ────── 作品卡片區（資料驅動）────── */}
        <div className="grid gap-10 md:grid-cols-2 works-grid">
          {/* 
            [資料驅動視覺註解]
            - .map()依據projects設定自動生成卡片，確保一致性與可維護性
          */}
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/work/${p.id}`}
              className={`work-card group relative block ${p.extraClass}`}
              aria-label={`前往${p.title}詳細頁`}
            >
              {/* 
                [卡片本體]
                - 保持圓角不變，光暈和結構維持原有高級感
                - 新增根據個別作品指定的hoverShadow（資料驅動）：每張卡 hover 發光顏色感應
              */}
              <div
                className={`
                  relative overflow-hidden 
                  rounded-[18px] 
                  ${p.cardBg} 
                  min-h-[250px] md:min-h-[320px]
                  flex flex-col items-center justify-center
                  transition-all duration-500
                  group-hover:translate-y-[-2px]
                  border border-white/5
                  ${p.hoverShadow}
                `}
              >
                {/* 圖片：精確維持object-contain且無變形 */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-6 md:p-8">
                  <img
                    src={p.img}
                    // alt屬性保持中文具體描述
                    alt={p.title}
                    className="max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                {/* 
                  箭頭按鈕出現：
                  - 僅在滑鼠移入 (hover) 時於右上方顯現
                  - 保持動態色彩與美感比例
                  [視覺註解]
                  這個動態讓使用者 hover 卡片時右上角浮現箭頭，有「探索→」互動感
                */}
                <div 
                  className="
                    absolute right-3 top-3 z-30
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none
                  "
                >
                  <span className={`
                    arrow-circle w-7 h-7 flex items-center justify-center rounded-full border border-white/30 bg-black/30 text-[11px] text-white transition-all
                    ${p.id === 'personal-branding' ? 'group-hover:bg-blue-500' : 'group-hover:bg-purple-500'}
                  `}>
                    ↗
                  </span>
                </div>
              </div>
              {/*
                --- Works.tsx 資訊區塊：優化呼吸感與字體美感 ---
                [視覺註解]
                - 中英文標題各自精細分流：中文保持穩重字重、不使用斜體並提升字距，英文精緻斜體微縮、增加間距，分隔符號"/"用極淡配色與左右間距
                - 字體間距和行距大幅優化，副標題以極簡標籤形式呼吸感明顯
                [本次結構修正]：補足 h3 下 flex 實際會覆蓋 text-align，針對 text-right 場景補上 justify-end
                [本次字級修正]：右側英文斷詞(如 Personal Branding Website)與 Logo & Business Card，字級比中文略小
              */}
              <div className={`work-card-info mt-6 px-1 ${p.textAlign}`}>
                <h3 className="text-[0.95rem] md:text-[1.05rem] leading-relaxed uppercase">
                  {p.title.includes('/') ? (
                    <div
                      className={`flex flex-wrap items-center gap-y-1 ${
                        p.textAlign.includes('text-right')
                          ? 'justify-end'
                          : 'justify-start'
                      } md:justify-start`}
                    >
                      {/* 中文：normal，穩重視覺 */}
                      <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">
                        {p.title.split('/')[0].trim()}
                      </span>
                      {/* 斜線：淡化色彩，微距 */}
                      <span className="px-2 opacity-30 font-extralight text-[#FDF6ED]">/</span>
                      {/* 英文：斜體、曲線現代精品感；字級比中文略小  */}
                      <span className="font-light italic tracking-[0.22em] text-[#FDF6ED]/90 text-[0.8em] md:text-[0.87em]">
                        {p.title.split('/')[1].trim()}
                      </span>
                    </div>
                  ) : (
                    <span className="font-normal tracking-[0.18em] text-[#FDF6ED]">{p.title}</span>
                  )}
                </h3>
                {/* 副標題：text-right 或 text-left 由父層 div 控制繼承 */}
                <p className="text-[10px] md:text-[11px] font-extralight tracking-[0.4em] text-[#EAE2D6B2] mt-2.5 opacity-80 uppercase">
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