import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsRecord, ProjectImage } from '../data/projectData';

/**
 * WorkDetail — 作品詳情頁
 * ─────────────────────────────────────────
 * A. 一般作品：標題 → 瀑布流圖片 → 返回
 * B. 練習專區（有 tabs）：標題 → 標籤列 → 過濾後瀑布流 → 返回
 *    - 標籤點擊後 GSAP 淡出舊圖、淡入新圖
 *    - 圖片預設灰階，hover 恢復全彩
 * C. Lightbox：點任何圖開啟，有 caption 顯示說明，ESC 關閉
 */

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('全部');

  const isPractice = Boolean(project?.tabs?.length);

  // [標籤列表：全部 + 各分類]
  const tabList = useMemo(() => {
    if (!project?.tabs) return [];
    return ['全部', ...project.tabs];
  }, [project]);

  // [過濾後的圖片]
  const filteredImages = useMemo(() => {
    if (!project) return [];
    const visible = project.images.filter(img => !img.coverOnly);
    if (!isPractice || activeTab === '全部') return visible;
    return visible.filter(img => img.practiceCategory === activeTab);
  }, [project, activeTab, isPractice]);

  // [切換標籤動畫]
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    if (gridRef.current && window.gsap) {
      window.gsap.to(gridRef.current.querySelectorAll('.waterfall-item'), {
        opacity: 0,
        y: 10,
        duration: 0.2,
        stagger: 0.03,
        onComplete: () => {
          setActiveTab(tab);
        },
      });
    } else {
      setActiveTab(tab);
    }
  };

  // [切換標籤後淡入]
  useEffect(() => {
    if (!gridRef.current || !window.gsap) return;
    window.gsap.fromTo(
      gridRef.current.querySelectorAll('.waterfall-item'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeTab]);

  // [id 變動回頂]
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('全部');
  }, [id]);

  // [ESC 關閉 lightbox]
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // [lightbox 開啟時鎖定捲動]
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  // [進場動畫]
  useEffect(() => {
    if (!project) return;
    window.ScrollTrigger?.getAll().forEach(t => t.kill());

    const timer = setTimeout(() => {
      const ctx = window.gsap.context(() => {
        window.gsap.from('#detail-header > *', {
          y: 50, opacity: 0, duration: 1, stagger: 0.1,
          ease: 'power3.out', delay: 0.2,
        });
        document.querySelectorAll('.waterfall-item').forEach(item => {
          window.gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              toggleActions: 'play none none reverse',
            },
            y: 50, opacity: 0, duration: 1, ease: 'power2.out',
          });
        });
        window.ScrollTrigger?.refresh();
      }, containerRef);
      setTimeout(() => window.ScrollTrigger?.refresh(), 300);
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      window.ScrollTrigger?.getAll().forEach(st => st.kill());
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

        {/* ── 標題區 ── */}
        <header id="detail-header" className="mx-auto text-center detail-header-container">
          <span className="uppercase detail-label block mb-6">{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>
        </header>

        {/* ── 標籤列（練習專區限定）── */}
        {isPractice && (
          <div className="practice-tabs" aria-label="作品分類篩選">
            {tabList.map(tab => (
              <button
                key={tab}
                className={`practice-tab-btn${activeTab === tab ? ' active' : ''}`}
                onClick={() => handleTabChange(tab)}
                aria-pressed={activeTab === tab}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* ── 圖片瀑布流 ── */}
        <section
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid"
          aria-label="作品圖片瀑布流"
        >
          {filteredImages.map((image: ProjectImage, idx: number) => (
            <figure
              key={`${activeTab}-${idx}`}
              className={`waterfall-item group relative overflow-hidden waterfall-card cursor-pointer${isPractice ? ' practice-image-card' : ''}`}
              onClick={() => setLightbox(image)}
              role="button"
              tabIndex={0}
              aria-label={`查看第 ${idx + 1} 張圖片${image.caption ? '（含說明）' : ''}`}
              onKeyDown={(e) => { if (e.key === 'Enter') setLightbox(image); }}
            >
              {/* 懸浮遮罩 */}
              <figcaption className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask">
                <span className="uppercase waterfall-hover-btn">View</span>
                {image.caption && <span className="waterfall-caption-dot" aria-hidden="true" />}
              </figcaption>
              <img
                src={image.src}
                alt={`${project.title} ${image.practiceCategory ?? ''} 作品圖片 ${idx + 1}`}
                onLoad={() => { requestAnimationFrame(() => { window.ScrollTrigger?.refresh(); }); }}
                onError={(e) => { e.currentTarget.style.display = 'none'; window.ScrollTrigger?.refresh(); }}
                className={`waterfall-image-main${isPractice ? ' practice-grayscale' : ''}`}
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

          {/* 無結果提示 */}
          {filteredImages.length === 0 && (
            <div className="practice-empty col-span-full">
              此分類尚無作品，敬請期待。
            </div>
          )}
        </section>

        {/* ── 返回首頁 ── */}
        <footer className="flex justify-center back-nav-footer">
          <Link to="/" className="group flex flex-col items-center">
            <span className="back-line group-hover:w-24"></span>
            <span className="uppercase back-label group-hover:text-white">
              返回首頁 / Back to Home
            </span>
          </Link>
        </footer>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大檢視"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="關閉">✕</button>
            <img src={lightbox.src} alt="作品圖片放大檢視" className="lightbox-image" />
            {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </main>
  );
};
