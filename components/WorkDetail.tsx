import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectData';

/**
 * [中文註解]
 * [溝通視覺化] 當使用者開啟此作品詳細頁時：
 * - 「元件的記憶」會從 URL 取得識別碼，並自動從作品資料集中找到對應細節。
 * - 首區為「資訊展板」：集中顯示分類、標題、副標題、描述。
 * - 下方依序為「圖片瀑布流」：每張圖片皆維持比例無扭曲，滑動時有動畫進場。
 * - 頁底獨立一區「返回首頁」做收尾。
 * 
 * [技術重點]
 * - 全面以語義標籤 + Tailwind CSS 控制結構與風格，嚴禁重複/冗餘結構。
 * - 圖片、分類等皆走純資料驅動，未重複編排。
 * - 所有交互動畫皆交由 GSAP、ScrollTrigger 控制，無手動 style 或 onMouseOver 事件。
 * - 若資料異常（查無作品），以簡明標示呈現。
 */

export const WorkDetail: React.FC = () => {
  // [視覺記憶邏輯] 路由的元件記憶同步抓資料
  const { id } = useParams();
  const project = id ? (projects as any)[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  // [連動效果] 新作品切換即自動回到畫面頂端
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // [連動效果] GSAP 進場動畫（一次設定兩類動畫，整合無重複）
  useEffect(() => {
    if (!project) return;
    const ctx = window.gsap.context(() => {
      // 1.「資訊展板」整體分段滑入
      window.gsap.from("#detail-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
      // 2.「瀑布流每張相片」分別出現
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

  // [錯誤視覺處理] 查無資料時給出簡明畫面
  if (!project) {
    // 對畫面影響：主要區域會呈現一行錯誤訊息，無其他內容。
    return (
      <main className="h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]">
        資料不存在，請回首頁
      </main>
    );
  }

  // 頁面主體
  return (
    <main ref={containerRef} className="min-h-screen work-detail-wrapper">
      <section className="content-width-container mx-auto">

        {/* ───────────── 資訊展板區（分類、標題、副標題、描述）───────────── */}
        <header id="detail-header" className="mx-auto text-center detail-header-container">
          {/* Category */}
          <span className="uppercase detail-label block mb-6">
            {project.category}
          </span>
          {/* 主標題 */}
          <h1 className="chinese-art detail-main-title">
            {project.title}
          </h1>
          {/* 副標題 */}
          <h2 className="serif-italic italic detail-subtitle-text">
            {project.subtitle}
          </h2>
          {/* 分隔線 */}
          <div className="detail-vertical-divider"></div>
          {/* 說明 */}
          <p className="font-light detail-description-text">
            {project.description}
          </p>
        </header>

        {/* ───────────── 圖片瀑布流區 ───────────── */}
        <section className="columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid" aria-label="作品圖片瀑布流">
          {project.images.map((img: string, index: number) => (
            <figure
              key={index}
              className="waterfall-item group relative overflow-hidden waterfall-card"
            >
              {/* 懸浮遮罩（hover）效果 */}
              <figcaption className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask">
                <span className="uppercase waterfall-hover-btn">
                  View
                </span>
              </figcaption>
              {/* 主圖，維持比例 object-fit: contain，不會變形 */}
              <img
                src={img}
                alt={`${project.title} 作品圖片 ${index + 1}`}
                onLoad={() => window.ScrollTrigger?.refresh()}
                // [移除 group-hover:scale-150，統一由 CSS 管理視覺放大效果]
                className="waterfall-image-main"
                loading="lazy"
              />
              {/* 序號標籤 */}
              <div className="waterfall-index-tag">
                <span className="waterfall-index-number">
                  0{index + 1}
                </span>
              </div>
            </figure>
          ))}
        </section>

        {/* ───────────── 返回首頁按鈕區 ───────────── */}
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