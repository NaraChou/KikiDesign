import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
 * [工程務實條款] 
 * 1. 閾值：2px 內不觸發，防止子像素抖動導致的無用刷新。
 * 2. 延遲：150ms 防抖，確保在使用者「停止縮放」後才執行昂貴的 refresh。
 */
const SCROLL_TRIGGER_LAYOUT_DELTA_PX = 2;
const DEBOUNCE_DELAY_MS = 150;

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const STYLES = {
  wrapperEmpty: 'h-screen flex items-center justify-center text-[var(--brand-subtle,#EAE2D6)]',
  wrapper: 'min-h-screen work-detail-wrapper',
  container: LAYOUT.container,
  header: 'mx-auto text-center detail-header-container',
  label: 'label-xs detail-label block mb-6',
  grid: 'columns-1 md:columns-2 lg:columns-3 mx-auto waterfall-grid',
  figureUI: 'group relative overflow-hidden cursor-pointer',
  hoverMask: 'absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask',
  footer: 'flex justify-center back-nav-footer',
  footerLink: 'group flex flex-col items-center',
} as const;

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // 🛡️ 穩定性追蹤 Ref
  const lastStableGridHeightRef = useRef<number>(-1);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const roRafIdRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabTweenRef = useRef<gsap.core.Tween | null>(null);

  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);
  const [activeTab, setActiveTab] = useState<string>('全部');
  const isTabSwitched = useRef(false);

  const isPractice = Boolean(project?.tabs?.length);

  const tabList = useMemo(() => (project?.tabs ? ['全部', ...project.tabs] : []), [project]);

  const filteredImages = useMemo(() => {
    if (!project) return [];
    const visible = project.images.filter(img => !img.coverOnly);
    if (!isPractice || activeTab === '全部') return visible;
    return visible.filter(img => img.practiceCategory === activeTab);
  }, [project, activeTab, isPractice]);

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    isTabSwitched.current = true;
    const items = gridRef.current?.querySelectorAll('.waterfall-item');
    if (items && items.length > 0) {
      tabTweenRef.current?.kill();
      tabTweenRef.current = gsap.to(items, {
        ...TAB_FADE_OUT,
        onComplete: () => setActiveTab(tab),
      });
    } else {
      setActiveTab(tab);
    }
  };

  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0);
    setActiveTab('全部');
  }, [id]);

  useEffect(() => {
    if (!isTabSwitched.current) return;
    const items = gridRef.current?.querySelectorAll('.waterfall-item');
    if (items) {
      gsap.fromTo(items, { opacity: 0, y: 10 }, { ...TAB_FADE_IN });
    }
    isTabSwitched.current = false;
  }, [activeTab]);

  useIsoLayoutEffect(() => {
    if (!project) return;

    const scopeRoot = containerRef.current;
    const gridEl = gridRef.current;
    if (!scopeRoot || !gridEl) return;

    lastStableGridHeightRef.current = -1;
    let ctx: gsap.Context | null = null;

    /**
     * 🔴 最終 Pipeline：線性執行，絕無遞迴
     * 流程：斷路 -> 刷新 -> 記錄快照 -> (rAF)恢復觀察
     */
    const executeRefreshPipeline = () => {
      const ro = resizeObserverRef.current;
      if (!ro) return;

      // 1. 物理斷路：停止觀察
      ro.disconnect();

      // 2. 執行昂貴刷新
      ScrollTrigger.refresh();

      // 3. 更新快照 (Border-box)
      lastStableGridHeightRef.current = Math.round(gridEl.getBoundingClientRect().height);

      // 4. 延後恢復：在 Paint 後再觀察
      if (roRafIdRef.current) cancelAnimationFrame(roRafIdRef.current);
      roRafIdRef.current = requestAnimationFrame(() => {
        ro.observe(gridEl);
        roRafIdRef.current = null;
      });
    };

    /**
     * 🔴 唯一入口：防抖機制
     * 只有在縮放停止 150ms 後才觸發一次刷新
     */
    const debounceRefresh = () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

      debounceTimerRef.current = setTimeout(() => {
        executeRefreshPipeline();
      }, DEBOUNCE_DELAY_MS);
    };

    try {
      ctx = gsap.context(() => {
        gsap.from('#detail-header > *', { ...FADE_IN_UP_FROM, ...FADE_IN_UP, stagger: 0.1, delay: 0.2 });
        const items = gridEl.querySelectorAll('.waterfall-item');
        items.forEach((item: Element) => {
          gsap.from(item as HTMLElement, {
            scrollTrigger: { trigger: item, start: 'top bottom-=100px', toggleActions: 'play none none reverse' },
            ...STAGGER_WATERFALL,
          });
        });
        ScrollTrigger.refresh();
      }, scopeRoot);
    } catch (e) {
      console.error("GSAP Context Error:", e);
    }

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((entries) => {
        if (!entries[0]) return;
        const entry = entries[0];

        // 統一使用 Border-box 度量
        const nextH = entry.borderBoxSize && entry.borderBoxSize[0]
          ? Math.round((entry.borderBoxSize[0] as any)?.blockSize || 0) 
          : Math.round(gridEl.getBoundingClientRect().height);

        const prevH = lastStableGridHeightRef.current;
        // 閾值守衛：防止子像素抖動觸發
        if (prevH >= 0 && Math.abs(nextH - prevH) <= SCROLL_TRIGGER_LAYOUT_DELTA_PX) return;

        debounceRefresh();
      });
      observer.observe(gridEl);
      resizeObserverRef.current = observer;
    }

    // 初始刷新
    debounceRefresh();

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (roRafIdRef.current) cancelAnimationFrame(roRafIdRef.current);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (ctx) ctx.revert();
      if (tabTweenRef.current) tabTweenRef.current.kill();
    };
  }, [id, project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (lightbox) document.body.classList.add('scroll-lock');
    else document.body.classList.remove('scroll-lock');
    return () => { document.body.classList.remove('scroll-lock'); };
  }, [lightbox]);

  if (!project) return <main className={STYLES.wrapperEmpty}>資料不存在，請回首頁</main>;

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
              className={`waterfall-item group relative overflow-hidden cursor-pointer${isPractice ? ' practice-image-card' : ''}`}
              onClick={() => setLightbox(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLightbox(image);
              }}
            >
              <figcaption className={STYLES.hoverMask}>
                <span className="uppercase waterfall-hover-btn">View</span>
                {image.caption && <span className="waterfall-caption-dot" aria-hidden="true"></span>}
              </figcaption>
              <img
                src={image.src}
                alt={`${project.title} 作品圖片 ${idx + 1}`}
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
