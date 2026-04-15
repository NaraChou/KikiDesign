import React, { useEffect, useRef } from 'react';
import { LAYOUT } from '../../styles/layout';
import { STAGGER_WATERFALL } from '../../utils/animationPresets';
import { WorkCard } from './WorkCard';

// 🔴 修正：改為 npm import gsap 與 ScrollTrigger
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import brandingMockupMain from '../../assets/images/branding-mockup-main.webp';
import logoKiki2025Mockup from '../../assets/images/namecard-kiki-2025-mockup-concrete.webp';
import posterMockupMain from '../../assets/images/poster-mockup-main.webp';
import ecommerceMockup from '../../assets/images/ecommerce-mockup.webp';
import practiceLabCover from '../../assets/images/practice-lab-cover.webp';
import aiLabCover from '../../assets/images/ai-lab-cover.webp';

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

// [B] Section 層級樣式（卡片 UI 已移至 WorkCard.tsx）
const STYLES = {
  container: LAYOUT.container,
  grid: 'works-grid',
} as const;

type WorkType = (typeof WORKS)[number];

// [C] 主區塊
export const Works: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 🔴 修正：不再依賴 window.gsap，統一以 npm 方式取得 gsap + ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 視覺化開發說明：每當作品卡片進入畫面時，觸發進場動畫，使用「元件動態展示」強化空間感
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.work-card').forEach((card: any) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=50px',
            invalidateOnRefresh: true,
          },
          ...STAGGER_WATERFALL,
          y: 30,
        });
      });
    }, sectionRef);
    // 當組件卸載時，清潔動畫上下文，防止殘影（保護 UI 畫面一致性）
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
