import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsRecord, ProjectImage } from '../../data/projectData';
import { LAYOUT } from '../../styles/layout';
import {
  TAB_FADE_OUT,
  TAB_FADE_IN,
  STAGGER_WATERFALL,
  FADE_IN_UP,
  FADE_IN_UP_FROM,
} from '../../utils/animationPresets';

/**
 * [A] 視覺資訊備註
 * 作品詳情：標題區（#detail-header 供 GSAP 使用）、瀑布流（.waterfall-item）、練習專區分頁籤、Lightbox 放大檢視。
 * Lightbox 開啟時以 body 加上 scroll-lock class 鎖捲動，不直接改 inline overflow。
 */

// [B-0] GSAP 白名單（此區 class/id 永不 refactor，供動畫 hook 使用）
const GSAP_SELECTORS = {
  waterfallItem: 'waterfall-item',  // WorkDetail GSAP target — querySelectorAll('.waterfall-item')
  waterfallCard: 'waterfall-card',  // WorkDetail GSAP target — hover/scroll 動畫錨點
} as const;

// [B] 樣式常數（基礎類別在前，同一字串內 RWD 類別置於末端）
const STYLES = {
  wrapperEmpty: 'h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]',
  wrapper: 'min-h-screen work-detail-wrapper',
  container: LAYOUT.container,
  header: 'mx-auto text-center detail-header-container',
  label: 'label-xs detail-label block mb-6',
  grid: 'columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid',
  figureUI: 'group relative overflow-hidden cursor-pointer',
  hoverMask:
    'absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask',
  footer: 'flex justify-center back-nav-footer',
  footerLink: 'group flex flex-col items-center',
} as const;

const BODY_SCROLL_LOCK_CLASS = 'scroll-lock';

// [C] 元件主體
export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('全部');
  const isTabSwitched = useRef(false);

  const isPractice = Boolean(project?.tabs?.length);

  const tabList = useMemo(() => {
    if (!project?.tabs) return [];
    return ['全部', ...project.tabs];
  }, [project]);

  const filteredImages = useMemo(() => {
    if (!project) return [];
    const visible = project.images.filter(img => !img.coverOnly);
    if (!isPractice || activeTab === '全部') return visible;
    return visible.filter(img => img.practiceCategory === activeTab);
  }, [project, activeTab, isPractice]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    isTabSwitched.current = true;
    if (gridRef.current && window.gsap) {
      window.gsap.to(gridRef.current.querySelectorAll('.waterfall-item'), {
        ...TAB_FADE_OUT,
        onComplete: () => { setActiveTab(tab); },
      });
    } else {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (!isTabSwitched.current) return;
    if (!gridRef.current || !window.gsap) return;
    window.gsap.fromTo(
      gridRef.current.querySelectorAll('.waterfall-item'),
      { opacity: 0, y: 10 },
      { ...TAB_FADE_IN }
    );
  }, [activeTab]);

  useEffect(() => {
    window.scrollTo(0, 0);
    isTabSwitched.current = false;
    setActiveTab('全部');
  }, [id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.classList.add(BODY_SCROLL_LOCK_CLASS);
    } else {
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    }
    return () => {
      document.body.classList.remove(BODY_SCROLL_LOCK_CLASS);
    };
  }, [lightbox]);

  useEffect(() => {
    if (!project) return;
    window.ScrollTrigger?.getAll().forEach(t => t.kill());

    let ctx: ReturnType<typeof window.gsap.context> | null = null;

    const timer = setTimeout(() => {
      ctx = window.gsap.context(() => {
        window.gsap.from('#detail-header > *', {
          ...FADE_IN_UP_FROM,
          ...FADE_IN_UP,
          stagger: 0.1,
          delay: 0.2,
        });
        document.querySelectorAll('.waterfall-item').forEach(item => {
          window.gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top bottom-=100px',
              toggleActions: 'play none none reverse',
            },
            ...STAGGER_WATERFALL,
          });
        });
        window.ScrollTrigger?.refresh();
      }, containerRef);
      setTimeout(() => window.ScrollTrigger?.refresh(), 300);
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      window.ScrollTrigger?.getAll().forEach(st => st.kill());
    };
  }, [id, project]);

  if (!project) {
    return <main className={STYLES.wrapperEmpty}>資料不存在，請回首頁</main>;
  }

  return (
    <main
      ref={containerRef}
      className={STYLES.wrapper}
      style={{ '--detail-glow-color': project.visual.glow } as React.CSSProperties}
    >
      <section className={STYLES.container}>
        <header id="detail-header" className={STYLES.header}>
          <span className={STYLES.label}>{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>
        </header>

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

        <section
          ref={gridRef}
          className={STYLES.grid}
          aria-label="作品圖片瀑布流"
        >
          {filteredImages.map((image: ProjectImage, idx: number) => (
            <figure
              key={`${activeTab}-${idx}`}
              className={`${GSAP_SELECTORS.waterfallItem} ${GSAP_SELECTORS.waterfallCard} ${STYLES.figureUI}${isPractice ? ' practice-image-card' : ''}`}
              onClick={() => setLightbox(image)}
              role="button"
              tabIndex={0}
              aria-label={`查看第 ${idx + 1} 張圖片${image.caption ? '（含說明）' : ''}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLightbox(image);
              }}
            >
              <figcaption className={STYLES.hoverMask}>
                <span className="uppercase waterfall-hover-btn">View</span>
                {image.caption && <span className="waterfall-caption-dot" aria-hidden="true" />}
              </figcaption>
              <img
                src={image.src}
                alt={`${project.title} ${image.practiceCategory ?? ''} 作品圖片 ${idx + 1}`}
                onLoad={() => {
                  requestAnimationFrame(() => {
                    window.ScrollTrigger?.refresh();
                  });
                }}
                onError={(e) => {
                  e.currentTarget.classList.add('hidden');
                  window.ScrollTrigger?.refresh();
                }}
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

          {filteredImages.length === 0 && (
            <div className="practice-empty col-span-full">此分類尚無作品，敬請期待。</div>
          )}
        </section>

        <footer className={STYLES.footer}>
          <Link to="/" className={STYLES.footerLink}>
            <span className="back-line group-hover:w-24"></span>
            <span className="uppercase back-label group-hover:text-white">
              返回首頁 / Back to Home
            </span>
          </Link>
        </footer>
      </section>

      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大檢視"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="關閉">
              ✕
            </button>
            <img src={lightbox.src} alt="作品圖片放大檢視" className="lightbox-image" />
            {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </main>
  );
};
