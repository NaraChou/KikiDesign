import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsRecord } from '../data/projectData';

/**
 * [視覺化開發全統整註解]
 * ▍邏輯總覽 (溝通語言&白話)
 * 1. 「元件的記憶」：讀取路由 id，查找對應作品，失敗即單純顯示錯誤提示。
 * 2. 「畫面進場效果」：GSAP 控制標題與圖片依序動態進場，無 handcode style/事件，百分百一致交互靜動分離。
 * 3. 「資料驅動」：全部重複片段（如圖片、索引標籤、說明欄）皆循環渲染，中英字、分類、圖欄統分歸一 map。
 * 4. 「結構語義」：header/section/footer語義清楚，SEO 圖片 alt 完整（示意：alt="作品標題 作品圖片 1" 以此類推）。
 * 5. 「比例維護與樣式分工」：圖片維持 object-fit:contain、aspect-ratio 於 CSS 控管，hover 效果一律 CSS；嚴禁任何覆寫或重複手寫樣式。
 * 6. 「報錯處置」：查無資料時，只顯示一個置中訊息（視覺影響：畫面留白，顯示友善錯誤，無多餘結構）。
 */

export const WorkDetail: React.FC = () => {
  // [元件的記憶] 取得路由id，自動查出對應作品
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  // [畫面聯動]：id 變動即自動回到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // [連動效果]：進場動畫僅在有作品時觸發，標題/圖片分批動態顯現
  // [ScrollTrigger 同步] 等待圖片載入完成後再初始化動畫，防止動畫錯位
  useEffect(() => {
    if (!project) return;
    
    // [ScrollTrigger 清理] 讓 GSAP 先殺掉所有的 ScrollTrigger，重新計算座標
    // 確保動畫是從 0 開始算的，避免前一個頁面的動畫狀態影響
    window.ScrollTrigger?.getAll().forEach(t => t.kill());
    
    // [圖片載入檢查] 等待所有圖片載入完成，確保 ScrollTrigger 計算正確
    const initAnimations = () => {
      const ctx = window.gsap.context(() => {
        window.gsap.from('#detail-header > *', {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
        });
        document.querySelectorAll('.waterfall-item').forEach(item => {
          window.gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
          });
        });
        // [動畫啟動後] 強制重新整理 ScrollTrigger，確保位置正確
        window.ScrollTrigger?.refresh();
      }, containerRef);
      return ctx;
    };

    // [延遲初始化] 等待 DOM 渲染和第一張圖片載入
    const timer = setTimeout(() => {
      const ctx = initAnimations();
      // [額外刷新] 在短暫延遲後再次刷新，確保 lazy loading 圖片位置正確
      setTimeout(() => window.ScrollTrigger?.refresh(), 300);
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      // [清理] 組件卸載時清理所有 ScrollTrigger
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, [id, project]);

  // [資料查無] 只顯示一則提示，避免多餘結構
  if (!project) {
    // 視覺影響：畫面置中大幅留白，只顯示錯誤字樣
    return (
      <main className="h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]">
        資料不存在，請回首頁
      </main>
    );
  }

  // [主內容結構] header(分類/標題/副標/描述) → section(瀑布流) → footer(返回首頁)
  // [資料驅動 glow 色] 用 style 注入 --detail-glow-color 給 CSS 處理
  return (
    <main
      ref={containerRef}
      className="min-h-screen work-detail-wrapper"
      style={{ '--detail-glow-color': project.visual.glow } as React.CSSProperties}
    >
      <section className="content-width-container mx-auto">
        {/* ────── 作品標題與說明區（分類/標題/副標題/描述）────── */}
        <header id="detail-header" className="mx-auto text-center detail-header-container">
          <span className="uppercase detail-label block mb-6">{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>
        </header>

        {/* ────── 圖片瀑布流區 ────── 
            - 只用 map 產生，不重複結構
            - 每張圖皆object-fit:contain, aspect-ratio固定，不變形
            - alt說明完整
            - width/height協助佔位，排版穩定
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
              {/* 懸浮遮罩: hover 時透明度顯現 */}
              <figcaption className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask">
                <span className="uppercase waterfall-hover-btn">View</span>
              </figcaption>
              <img
                src={img}
                alt={`${project.title} 作品圖片 ${idx + 1}`}
                onLoad={() => {
                  // [ScrollTrigger 同步] 每張圖片載入完成後立即刷新，防止動畫錯位
                  // 使用 requestAnimationFrame 確保在下一幀刷新，避免頻繁更新
                  requestAnimationFrame(() => {
                    window.ScrollTrigger?.refresh();
                  });
                }}
                onError={(e) => {
                  // [錯誤處理] 圖片載入失敗時顯示替代內容，避免空白
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  console.warn(`圖片載入失敗: ${img}`);
                  // [錯誤後刷新] 載入失敗時也刷新 ScrollTrigger，避免位置計算錯誤
                  window.ScrollTrigger?.refresh();
                }}
                className="waterfall-image-main"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'low'}
                width="800"
                height="600"
                // [畫面安定] 固定寬高+CSS aspect-ratio，防止載入跳動
                // [載入優化] 第一張圖優先載入(eager+high)，其他延遲載入(lazy+low)
                // [效能優化] async 解碼不阻塞主線程，提升頁面流暢度
                // [ScrollTrigger 同步] onLoad 使用 requestAnimationFrame 優化刷新時機
              />
              {/* 圖片序號標 */}
              <div className="waterfall-index-tag">
                <span className="waterfall-index-number">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>
            </figure>
          ))}
        </section>

        {/* ────── 返回首頁：統一語意，無多餘結構或重複內容 ────── */}
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