import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/works.css';
import { LAYOUT } from '../styles/layout';

import brandingMockupMain from '../assets/images/branding-mockup-main.webp';
import logoKiki2025Mockup from '../assets/images/namecard-kiki-2025-mockup-concrete.webp';
import posterMockupMain from '../assets/images/poster-mockup-main.webp';
import ecommerceMockup from '../assets/images/ecommerce-mockup.webp';
import practiceLabCover from '../assets/images/practice-lab-cover.webp';
import aiLabCover from '../assets/images/ai-lab-cover.webp';

/**
 * [A] 視覺資訊備註
 * 作品列表 #works；卡片光暈顏色、底色在 works.css 以變數管理；此檔負責 data-work-id 與滑鼠座標（--mouse-x / --mouse-y）。
 */

// [B] 資料與樣式常數
const ALIGN_CONFIG = {
  left: { textAlign: 'text-left' as const },
  right: { textAlign: 'text-right' as const },
};

const WORKS = [
  {
    id: 'personal-branding',
    titleZH: '個人品牌形象官網',
    titleEN: 'Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: brandingMockupMain,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'logo-design',
    titleZH: '個人商標與名片',
    titleEN: 'Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: logoKiki2025Mockup,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
  {
    id: 'poster-design',
    titleZH: '海報設計',
    titleEN: 'Poster Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: posterMockupMain,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'ecommerce-visual-design',
    titleZH: '電商視覺設計',
    titleEN: 'E-commerce Visual Design',
    subtitle: 'GRAPHIC DESIGN / 2025',
    img: ecommerceMockup,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
  {
    id: 'practice-lab',
    titleZH: '視覺實驗室',
    titleEN: 'Visual Lab',
    subtitle: 'PRACTICE / 2017 – 2026',
    img: practiceLabCover,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'ai-lab',
    titleZH: 'AI 數位效率實驗室',
    titleEN: 'AI Technology Lab',
    subtitle: 'AI APPLICATION / 2025 – 2026',
    img: aiLabCover,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
] as const;

const STYLES = {
  wrapper: 'work-card group relative block',
  overlay: 'absolute inset-0 z-40',
  inner: 'work-card-inner transition-all duration-500 group-hover:translate-y-[-2px]',
  media: 'work-card-image-wrapper relative z-20 w-full h-full flex items-center justify-center',
  image:
    'max-w-full max-h-full object-contain transition-transform duration-1000 group-hover:scale-[1.03]',
  arrow:
    'work-card-arrow-wrapper absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none',
  meta: 'work-card-info',
  heading: 'title-group',
  title: 'title-zh',
  titleDivider: 'title-divider',
  titleSecondary: 'title-en',
  description: 'work-card-subtitle',
  container: LAYOUT.container,
  grid: 'works-grid',
} as const;

type WorkType = (typeof WORKS)[number];

const WorkCard: React.FC<{ work: WorkType }> = ({ work }) => {
  // [畫面效果] 只更新滑鼠在卡片上的相對位置，讓 works.css 的 radial-gradient 光斑跟著游標走
  const setPointerPosition = (target: HTMLDivElement, x: number, y: number) => {
    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPointerPosition(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointerPosition(e.currentTarget, rect.width / 2, rect.height / 2);
  };

  const cardClass = `${STYLES.wrapper} ${work.extraClass}`.trim();

  return (
    <div
      className={cardClass}
      data-work-id={work.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
        } as React.CSSProperties
      }
    >
      <Link
        to={`/work/${work.id}`}
        className={STYLES.overlay}
        aria-label={`查看 ${work.titleZH} 作品詳情`}
      />

      <div className={STYLES.inner}>
        <div className={STYLES.media}>
          <img
            src={work.img}
            alt={work.titleZH}
            className={STYLES.image}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className={STYLES.arrow}>
          <span className="arrow-circle">↗</span>
        </div>
      </div>

      <div className={`${STYLES.meta} ${work.textAlign}`}>
        <h3>
          <div className={STYLES.heading}>
            <span className={STYLES.title}>{work.titleZH}</span>
            <span className={STYLES.titleDivider}>/</span>
            <span className={STYLES.titleSecondary}>{work.titleEN}</span>
          </div>
        </h3>
        <p className={STYLES.description}>{work.subtitle}</p>
      </div>
    </div>
  );
};

// [C] 主區塊
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap) return;
    const ctx = window.gsap.context(() => {
      window.gsap.utils.toArray('.work-card').forEach((card: any) => {
        window.gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=50px',
            invalidateOnRefresh: true,
          },
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: 'power2.out',
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={sectionRef}>
      <div className={STYLES.container}>
        <header className="works-section-header">
          <h2 className="works-section-title">Portfolio</h2>
          <p className="works-section-label">Selected Fragments</p>
        </header>
        <div className={STYLES.grid}>
          {WORKS.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};
