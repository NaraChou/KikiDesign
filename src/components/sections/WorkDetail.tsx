import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsRecord, ProjectImage } from '../../data/projectData';
import { DEFAULT_TECHNICAL_NOTES } from '../../data/technicalNotes';
import { LAYOUT } from '../../styles/layout';
import { projectImageAlt } from '../../utils/imageAlt';
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
  linkRow: 'mt-8 flex flex-col sm:flex-row items-center justify-center gap-4',
  linkBtn:
    'inline-block px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase border border-white/25 text-[rgba(234,226,214,0.92)] hover:border-white/50 hover:text-white transition-colors',
  teamList: 'mb-5 grid gap-1',
  teamItem: 'text-[13px] leading-6 tracking-[0.05em] text-[rgba(234,226,214,0.9)]',
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
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
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
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((prev) => {
          if (prev === null || filteredImages.length === 0) return null;
          return (prev - 1 + filteredImages.length) % filteredImages.length;
        });
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((prev) => {
          if (prev === null || filteredImages.length === 0) return null;
          return (prev + 1) % filteredImages.length;
        });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filteredImages]);

  useEffect(() => {
    if (lightboxImage) document.body.classList.add('scroll-lock');
    else document.body.classList.remove('scroll-lock');
    return () => { document.body.classList.remove('scroll-lock'); };
  }, [lightboxImage]);

  useEffect(() => {
    if (lightboxImage) closeBtnRef.current?.focus();
  }, [lightboxImage]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeTab, id]);

  if (!project) return <main className={STYLES.wrapperEmpty}>資料不存在，請回首頁</main>;

  const liveUrl = project.links?.live?.trim();
  const githubUrl = project.links?.github?.trim();
  const technicalNotes = [
    ...DEFAULT_TECHNICAL_NOTES,
    ...(project.technicalNotes ?? []),
  ];

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

          {(liveUrl || githubUrl) && (
            <div className={STYLES.linkRow}>
              {liveUrl && (
                <a
                  href={liveUrl}
                  className={STYLES.linkBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  觀看線上呈現
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  className={STYLES.linkBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub 專頁備份
                </a>
              )}
            </div>
          )}

          {project.caseStudy && (
            <section className="mt-10 mx-auto max-w-[42rem] text-left">
              <div className="grid gap-4">
                <div>
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-1">課題背景</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.9)]">{project.caseStudy.problem}</p>
                </div>
                <div>
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-1">期望成果</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.9)]">{project.caseStudy.goal}</p>
                </div>
                <div>
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-1">設計做法</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.9)]">{project.caseStudy.solution}</p>
                </div>
                <div>
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-1">實際應用</h3>
                  <p className="text-[13px] leading-7 tracking-[0.06em] text-[rgba(234,226,214,0.9)]">{project.caseStudy.application}</p>
                </div>
              </div>
            </section>
          )}
          {(project.meta ||
            project.team ||
            project.responsibility ||
            project.tools ||
            project.process ||
            project.outcomes ||
            technicalNotes.length > 0) && (
            <section className="mt-8 mx-auto max-w-[42rem] text-left">
              {project.team && project.team.length > 0 && (
                <div className="mb-5">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">
                    團隊與分工
                  </h3>
                  <div className={STYLES.teamList}>
                    {project.team.map((member) => (
                      <p key={member} className={STYLES.teamItem}>
                        {member}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {project.meta && (
                <div className="mb-5 grid gap-2 sm:grid-cols-3">
                  {project.meta.duration && (
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.65)]">
                      製作期間 <span className="normal-case tracking-[0.05em] text-[rgba(234,226,214,0.92)]">{project.meta.duration}</span>
                    </p>
                  )}
                  {project.meta.type && (
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.65)]">
                      專案類型 <span className="normal-case tracking-[0.05em] text-[rgba(234,226,214,0.92)]">{project.meta.type}</span>
                    </p>
                  )}
                  {project.meta.status && (
                    <p className="text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.65)]">
                      目前狀態 <span className="normal-case tracking-[0.05em] text-[rgba(234,226,214,0.92)]">{project.meta.status}</span>
                    </p>
                  )}
                </div>
              )}
              {project.responsibility && (
                <div className="mb-5">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">我的角色範圍</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.responsibility.map((item) => (
                      <span key={item} className="text-[12px] tracking-[0.05em] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.2)] text-[rgba(234,226,214,0.92)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.tools && (
                <div className="mb-5">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">使用工具</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span key={tool} className="text-[12px] tracking-[0.05em] px-2.5 py-1 rounded border border-[rgba(255,255,255,0.2)] text-[rgba(234,226,214,0.92)]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.process && (
                <div className="mb-5">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">製作流程</h3>
                  <div className="grid gap-2">
                    {project.process.map((step, idx) => (
                      <p key={step} className="text-[13px] leading-6 tracking-[0.05em] text-[rgba(234,226,214,0.9)]">
                        {idx + 1}. {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              {project.outcomes && (
                <div className="mb-5">
                  <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">專案成果</h3>
                  <div className="grid gap-2">
                    {project.outcomes.map((outcome) => (
                      <p key={outcome} className="text-[13px] leading-6 tracking-[0.05em] text-[rgba(234,226,214,0.9)]">
                        {outcome}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 className="text-[11px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.58)] mb-2">
                  製作與交付說明
                </h3>
                <div className="grid gap-2">
                  {technicalNotes.map((note) => (
                    <p key={note} className="text-[13px] leading-6 tracking-[0.05em] text-[rgba(234,226,214,0.85)]">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          )}
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
          aria-label="作品圖像展示"
        >
          {filteredImages.map((image: ProjectImage, idx: number) => (
            <figure
              key={`${activeTab}-${image.id}`}
              className={`waterfall-item group relative overflow-hidden cursor-pointer${isPractice ? ' practice-image-card' : ''}`}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setLightboxIndex(idx);
              }}
            >
              <figcaption className={STYLES.hoverMask}>
                <span className="uppercase waterfall-hover-btn">放大</span>
                {image.caption && <span className="waterfall-caption-dot" aria-hidden="true"></span>}
              </figcaption>
              <img
                src={image.src}
                alt={projectImageAlt(image, project.title)}
                className={`waterfall-image-main${isPractice ? ' practice-grayscale' : ''}`}
                width={1600}
                height={1000}
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
            <span className="back-label group-hover:text-white">
              返回首頁
            </span>
          </Link>
        </footer>
      </section>

      {lightboxImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="圖片放大檢視"
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeBtnRef}
              className="lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="關閉"
            >
              ✕
            </button>
            {filteredImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox-nav lightbox-prev"
                  onClick={() => {
                    setLightboxIndex((prev) => {
                      if (prev === null) return null;
                      return (prev - 1 + filteredImages.length) % filteredImages.length;
                    });
                  }}
                  aria-label="上一張"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="lightbox-nav lightbox-next"
                  onClick={() => {
                    setLightboxIndex((prev) => {
                      if (prev === null) return null;
                      return (prev + 1) % filteredImages.length;
                    });
                  }}
                  aria-label="下一張"
                >
                  ›
                </button>
              </>
            )}
            <img
              src={lightboxImage.src}
              alt={projectImageAlt(lightboxImage, project.title)}
              className="lightbox-image"
              width={1600}
              height={1000}
            />
            {lightboxImage.caption && <p className="lightbox-caption">{lightboxImage.caption}</p>}
          </div>
        </div>
      )}

    </main>
  );
};
