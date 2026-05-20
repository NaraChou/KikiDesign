import React, { useEffect, useRef } from 'react';
import { LAYOUT } from '../../styles/layout';
import { STAGGER_WATERFALL } from '../../utils/animationPresets';
import { WorkCard } from './WorkCard';

import brandingMockupMain from '../../assets/images/branding-mockup-main.webp';
import hejiaDisplayMockup from '../../assets/images/hojia_display_mockup.webp';
import posterMockupMain from '../../assets/images/poster-mockup-main.webp';
import practiceComp01 from '../../assets/images/practice-comp-01.webp';

const ALIGN_CONFIG = {
  left: { textAlign: 'text-left' as const },
  right: { textAlign: 'text-right' as const },
};

const WORKS = [
  {
    id: 'personal-branding',
    titleZH: '品牌視覺設計｜Behavior Logic',
    titleEN: 'Brand Identity / Consultant Brand',
    subtitle: 'BRAND IDENTITY / 2024–2025',
    img: brandingMockupMain,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'rabbit-bear',
    titleZH: '品牌視覺設計｜小兔熊',
    titleEN: 'Parenting Education Brand',
    subtitle: 'BRAND IDENTITY / 2025',
    img: posterMockupMain,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
  {
    id: 'hejia-branding',
    titleZH: '品牌提案｜合家咔脆條',
    titleEN: 'Brand Proposal / Packaging Visual',
    subtitle: 'BRAND PROPOSAL / 2018',
    img: hejiaDisplayMockup,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  {
    id: 'practice-lab',
    titleZH: '視覺探索｜Visual Exploration',
    titleEN: 'Visual Exploration',
    subtitle: 'PRACTICE / 2017–2026',
    img: practiceComp01,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
] as const;

const STYLES = {
  container: LAYOUT.container,
  grid: 'works-grid',
} as const;

export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      window.gsap.from('.work-card', {
        scrollTrigger: {
          trigger: '.works-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        ...STAGGER_WATERFALL,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={sectionRef}>
      <div className={STYLES.container}>
        <header className="works-section-header">
          <h2 className="works-section-title">作品精選</h2>
          <p className="works-section-label">Portfolio</p>
        </header>
        <div className={STYLES.grid}>
          {WORKS.map((work) => (
            <WorkCard
              key={work.id}
              id={work.id}
              titleZH={work.titleZH}
              titleEN={work.titleEN}
              subtitle={work.subtitle}
              img={work.img}
              textAlign={work.textAlign}
              extraClass={work.extraClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
