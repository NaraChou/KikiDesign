import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsRecord } from '../data/projectData';

/**
 * [中文註解]（新規範資訊統整）
 * ▍元件視覺邏輯簡述：
 *  - 進入畫面時讀取ID→找到目標作品→若查無顯示錯誤。
 *  - 完全依據資料內容產生標題、分類、描述、圖片瀑布流。
 *  - 動畫效果統一用 GSAP 驅動（scroll/進場），無重複手動 style、事件。
 *  - 圖片比例與 hover 皆交予 CSS 控管（不手動 class 疊加）。
 *  - 所有可重覆片段均統一由資料 .map() 循環產生。
 *  - 返回首頁導向明確，標註語義。
 */

export const WorkDetail: React.FC = () => {
  // [元件的記憶] 依據路由URL取得作品id，自動選取對應資料
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  // [連動效果] 每次id變動，畫面自動回頂
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // [動畫連動] 統一進場動畫，適用標題區與每張圖片
  useEffect(() => {
    if (!project) return;
    const ctx = window.gsap.context(() => {
      // header依序動畫
      window.gsap.from("#detail-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
      // waterfall圖片進場
      document.querySelectorAll('.waterfall-item').forEach((item) => {
        window.gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100px",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [id, project]);

  // [視覺處理] 查無作品顯示
  if (!project) {
    // 對畫面影響：整個主區域只會顯示簡明錯誤文字
    return (
      <main className="h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]">
        資料不存在，請回首頁
      </main>
    );
  }

  // [畫面主體] 統一語義標籤與層級，所有結構數據驅動
  return (
    <main
      ref={containerRef}
      className={`min-h-screen work-detail-wrapper project-${id}`}
    >
      <section className="content-width-container mx-auto">

        {/* ────────── 資訊展板：分類／標題／副標題／描述 ────────── */}
        <header id="detail-header" className="mx-auto text-center detail-header-container">
          <span className="uppercase detail-label block mb-6">{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>
        </header>

        {/* ────────── 圖片瀑布流 ────────── 
           [重點] 僅由資料生成，每張圖統一風格、SEO alt完善，hover不內嵌group-hover:shadow，權重交由work-detail.css控制
        */}
        <section
          className="columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid"
          aria-label="作品圖片瀑布流"
        >
          {project.images.map((img: string, idx: number) => (
            <figure
              key={idx}
              className="waterfall-item group relative overflow-hidden waterfall-card"
            >
              {/* 懸浮遮罩 */}
              <figcaption className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask">
                <span className="uppercase waterfall-hover-btn">View</span>
              </figcaption>
              {/* 不變形主圖 */}
              <img
                src={img}
                alt={`${project.title} 作品圖片 ${idx + 1}`}
                onLoad={() => window.ScrollTrigger?.refresh()}
                className="waterfall-image-main"
                loading="lazy"
              />
              {/* 序號標籤 */}
              <div className="waterfall-index-tag">
                <span className="waterfall-index-number">0{idx + 1}</span>
              </div>
            </figure>
          ))}
        </section>

        {/* ────────── 返回首頁連結 ────────── */}
        <footer className="flex justify-center back-nav-footer">
          <Link to="/" className="group flex flex-col items-center">
            <span className="back-line group-hover:w-24"></span>
            <span className="uppercase back-label group-hover:text-white">
              返回首頁 / Back to Home
            </span>
          </Link>
        </footer>
      </section>
    </main>
  );
};