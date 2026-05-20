import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectImage, projectsRecord } from '../../data/projectData';
import { LAYOUT } from '../../styles/layout';
import {
  FADE_IN_UP,
  FADE_IN_UP_FROM,
  STAGGER_WATERFALL,
  TAB_FADE_IN,
  TAB_FADE_OUT,
} from '../../utils/animationPresets';

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
  hoverMask:
    'absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 transition-opacity opacity-0 group-hover:opacity-100 waterfall-hover-mask',
  footer: 'flex justify-center back-nav-footer',
  footerLink: 'group flex flex-col items-center',
} as const;

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = id ? projectsRecord[id] : null;

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const lastStableGridHeightRef = useRef<number>(-1);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const roRafIdRef = useRef<number | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabTweenRef = useRef<gsap.core.Tween | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('全部');
  const isTabSwitched = useRef(false);
  const isPractice = Boolean(project?.tabs?.length);

  const tabList = useMemo(() => (project?.tabs ? ['全部', ...project.tabs] : []), [project]);

  const filteredImages = useMemo(() => {
    if (!project) return [];
    const visible = project.images.filter((img) => !img.coverOnly);
    if (!isPractice || activeTab === '全部') return visible;
    return visible.filter((img) => img.practiceCategory === activeTab);
  }, [project, activeTab, isPractice]);

  const lightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

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
    if (items) gsap.fromTo(items, { opacity: 0, y: 10 }, { ...TAB_FADE_IN });
    isTabSwitched.current = false;
  }, [activeTab]);

  useIsoLayoutEffect(() => {
    if (!project) return;
    const scopeRoot = containerRef.current;
    const gridEl = gridRef.current;
    if (!scopeRoot || !gridEl) return;

    lastStableGridHeightRef.current = -1;
    let ctx: gsap.Context | null = null;

    const executeRefreshPipeline = () => {
      const ro = resizeObserverRef.current;
      if (!ro) return;
      ro.disconnect();
      ScrollTrigger.refresh();
      lastStableGridHeightRef.current = Math.round(gridEl.getBoundingClientRect().height);
      if (roRafIdRef.current) cancelAnimationFrame(roRafIdRef.current);
      roRafIdRef.current = requestAnimationFrame(() => {
        ro.observe(gridEl);
        roRafIdRef.current = null;
      });
    };

    const debounceRefresh = () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(executeRefreshPipeline, DEBOUNCE_DELAY_MS);
    };

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

    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver((entries) => {
        if (!entries[0]) return;
        const entry = entries[0];
        const nextH =
          entry.borderBoxSize && entry.borderBoxSize[0]
            ? Math.round((entry.borderBoxSize[0] as { blockSize?: number }).blockSize || 0)
            : Math.round(gridEl.getBoundingClientRect().height);
        const prevH = lastStableGridHeightRef.current;
        if (prevH >= 0 && Math.abs(nextH - prevH) <= SCROLL_TRIGGER_LAYOUT_DELTA_PX) return;
        debounceRefresh();
      });
      observer.observe(gridEl);
      resizeObserverRef.current = observer;
    }

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
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') return setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) =>
          prev === null || filteredImages.length === 0 ? null : (prev - 1 + filteredImages.length) % filteredImages.length,
        );
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) => (prev === null || filteredImages.length === 0 ? null : (prev + 1) % filteredImages.length));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredImages]);

  useEffect(() => {
    if (lightboxImage) document.body.classList.add('scroll-lock');
    else document.body.classList.remove('scroll-lock');
    return () => document.body.classList.remove('scroll-lock');
  }, [lightboxImage]);

  useEffect(() => {
    if (lightboxImage) closeBtnRef.current?.focus();
  }, [lightboxImage]);

  useEffect(() => setLightboxIndex(null), [activeTab, id]);

  if (!project) return <main className={STYLES.wrapperEmpty}>找不到作品</main>;

  return (
    <main ref={containerRef} className={STYLES.wrapper} style={{ '--detail-glow-color': project.visual.glow } as React.CSSProperties}>
      <section className={STYLES.container}>
        <header id="detail-header" className={STYLES.header}>
          <span className={STYLES.label}>{project.category}</span>
          <h1 className="chinese-art detail-main-title">{project.title}</h1>
          <h2 className="serif-italic italic detail-subtitle-text">{project.subtitle}</h2>
          <div className="detail-vertical-divider"></div>
          <p className="font-light detail-description-text">{project.description}</p>

          {(project.description || project.summary || project.style) && (
            <section className="mt-8 mx-auto max-w-[56rem] text-left">
              <div className="grid gap-3 md:gap-4 lg:grid-cols-3">
                <article className="rounded-md border border-[rgba(255,255,255,0.26)] bg-[rgba(255,255,255,0.03)] px-4 py-3 md:px-5 md:py-4">
                  <h3 className="mb-2 text-[11px] tracking-[0.2em] uppercase text-[var(--brand-accent,#EF4444)]">做了什麼</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.92)]">{project.description}</p>
                </article>
                <article className="rounded-md border border-[rgba(255,255,255,0.26)] bg-[rgba(255,255,255,0.03)] px-4 py-3 md:px-5 md:py-4">
                  <h3 className="mb-2 text-[11px] tracking-[0.2em] uppercase text-[var(--brand-accent,#EF4444)]">解決什麼</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.92)]">{project.summary || '-'}</p>
                </article>
                <article className="rounded-md border border-[rgba(255,255,255,0.26)] bg-[rgba(255,255,255,0.03)] px-4 py-3 md:px-5 md:py-4">
                  <h3 className="mb-2 text-[11px] tracking-[0.2em] uppercase text-[var(--brand-accent,#EF4444)]">風格設定</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.92)]">{project.style || '-'}</p>
                </article>
              </div>
            </section>
          )}

          {project.tools && project.tools.length > 0 && (
            <section className="mt-5 mx-auto max-w-[56rem] text-left">
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center rounded-full border border-[rgba(255,255,255,0.24)] px-3 py-1 text-[11px] tracking-[0.08em] text-[rgba(234,226,214,0.92)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>
          )}
        </header>

        {isPractice && (
          <div className="practice-tabs" aria-label="作品分類">
            {tabList.map((tab) => (
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

        <section ref={gridRef} className={STYLES.grid} aria-label="作品圖片">
          {filteredImages.map((image: ProjectImage, idx: number) => (
            <figure
              key={`${activeTab}-${image.id}`}
              className={`waterfall-item group relative overflow-hidden cursor-pointer${isPractice ? ' practice-image-card' : ''}`}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
            >
              <figcaption className={STYLES.hoverMask}>
                <span className="uppercase waterfall-hover-btn">查看</span>
                {image.caption && <span className="waterfall-caption-dot" aria-hidden="true"></span>}
              </figcaption>
              <img
                src={image.src}
                alt={image.caption || project.title}
                className={`waterfall-image-main${isPractice ? ' practice-grayscale' : ''}`}
                width={1600}
                height={1000}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'low'}
              />
              <div className="waterfall-index-tag">
                <span className="waterfall-index-number">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
              </div>
            </figure>
          ))}
          {filteredImages.length === 0 && <div className="practice-empty col-span-full">此分類目前沒有作品</div>}
        </section>

        <footer className={STYLES.footer}>
          <Link to="/" className={STYLES.footerLink}>
            <span className="back-line group-hover:w-24"></span>
            <span className="back-label group-hover:text-white">返回首頁</span>
          </Link>
        </footer>
      </section>

      {lightboxImage && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)} role="dialog" aria-modal="true" aria-label="圖片檢視">
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button ref={closeBtnRef} className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="關閉">
              關閉
            </button>
            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav lightbox-prev"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length))
                  }
                  aria-label="上一張"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox-nav lightbox-next"
                  onClick={() => setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % filteredImages.length))}
                  aria-label="下一張"
                >
                  ›
                </button>
              </>
            )}
            <img src={lightboxImage.src} alt={lightboxImage.caption || project.title} className="lightbox-image" width={1600} height={1000} />
            {lightboxImage.caption && <p className="lightbox-caption">{lightboxImage.caption}</p>}
          </div>
        </div>
      )}
    </main>
  );
};
