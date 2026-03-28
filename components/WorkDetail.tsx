import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsRecord, ProjectImage } from '../data/projectData';

/**
 * [視覺化開發全統整註解]
 * ▍邏輯總覽
 * 1. 「元件的記憶」：讀取路由 id，查找對應作品，失敗即顯示錯誤提示。
 * 2. 「Lightbox」：點擊任何圖片開啟全屏 lightbox，有 caption 的圖片額外顯示說明文字。
 * 3. 「畫面進場效果」：GSAP 控制標題與圖片依序動態進場。
 * 4. 「資料驅動」：所有圖片皆循環渲染，caption 選填，未來只需補資料。
 */

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  // [Lightbox 狀態記憶]
  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);

  // [畫面聯動]：id 變動即自動回到頂部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // [鍵盤支援]：ESC 關閉 lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // [body 捲動鎖定]：lightbox 開啟時禁止背景捲動
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // [連動效果]：進場動畫
  useEffect(() => {
    if (!project) return;
    window.ScrollTrigger?.getAll().forEach(t => t.kill());

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
        window.ScrollTrigger?.refresh();
      }, containerRef);
      return ctx;
    };

    const timer = setTimeout(() => {
      const ctx = initAnimations();
      setTimeout(() => window.ScrollTrigger?.refresh(), 300);
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(st => st.kill());
      }
    };
  }, [id, project]);

  if (!project) {
    return (
      <main className="h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]">
        資料不存在，請回首頁
      </main>
    );
  }

  return (
    <main
      ref={containerRef}
      className="min-h-screen work-detail-wrapper"
      style={{ '--detail-glow-color': project.visual.glow } as React.CSSProperties}
    >
      <section className="content-width-container mx-auto">
        {/* ────── 標題區 ────── */}
        <header id="detail-header" className="mx-auto text-center detail-header-container">
          <span className="uppercase detail-label block mb-6">{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>
        </header>

        {/* ────── 圖片瀑布流區 ────── */}
        <section
          className="columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid"
          aria-label="作品圖片瀑布流"
        >
          {project.images.filter((image: ProjectImage) => !image.coverOnly).map((image: ProjectImage, idx: number) => (
            <figure
              key={idx}
              className="waterfall-item group relative overflow-hidden waterfall-card cursor-pointer"
              onClick={() => setLightbox(image)}
              role="button"
              tabIndex={0}
              aria-label={`查看第 ${idx + 1} 張圖片${image.caption ? '（含說明）' : ''}`}
              onKeyDown={(e) => { if (e.key === 'Enter') setLightbox(image); }}
            >
              {/* 懸浮遮罩 */}
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask">
                <span className="uppercase waterfall-hover-btn">View</span>
                {image.caption && (
                  <span className="waterfall-caption-dot" aria-hidden="true" />
                )}
              </figcaption>
              <img
                src={image.src}
                alt={`${project.title} 作品圖片 ${idx + 1}`}
                onLoad={() => {
                  requestAnimationFrame(() => { window.ScrollTrigger?.refresh(); });
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  window.ScrollTrigger?.refresh();
                }}
                className="waterfall-image-main"
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'low'}
              />
              <div className="waterfall-index-tag">
                <span className="waterfall-index-number">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>
            </figure>
          ))}
        </section>

        {/* ────── 返回首頁 ────── */}
        <footer className="flex justify-center back-nav-footer">
          <Link to="/" className="group flex flex-col items-center">
            <span className="back-line group-hover:w-24"></span>
            <span className="uppercase back-label group-hover:text-white">
              返回首頁 / Back to Home
            </span>
          </Link>
        </footer>
      </section>

      {/* ────── Lightbox ────── */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大檢視"
        >
          <div
            className="lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="關閉"
            >
              ✕
            </button>
            <img
              src={lightbox.src}
              alt="作品圖片放大檢視"
              className="lightbox-image"
            />
            {lightbox.caption && (
              <p className="lightbox-caption">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
