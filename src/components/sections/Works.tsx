import React, { useEffect, useRef } from 'react';
import { LAYOUT } from '../../styles/layout';
import { STAGGER_WATERFALL } from '../../utils/animationPresets';
import { WorkCard } from './WorkCard';

// ── 封面圖（首頁卡片用）──────────────────────────────────────
import brandingDarkUI      from '../../assets/images/branding-dark-ui-landing.webp';
import posterMockupMain    from '../../assets/images/poster-mockup-main.webp';
import practiceLogoHejia  from '../../assets/images/practice-logo-hejia.webp';
import practiceComp01     from '../../assets/images/practice-comp-01.webp';

/**
 * [A] 視覺資訊備註
 * 作品列表 #works；卡片光暈顏色、底色在 works.css 以變數管理；
 * 此檔負責 data-work-id 與滑鼠座標（--mouse-x / --mouse-y）。
 *
 * ▍2026.05 最終結構（4 張卡片）
 * - 移除數位視覺設計卡片（素材暫無安全來源，待補）
 * - ai-lab / logo-design 保留路由，可從 Footer 或 About 頁連結進入
 * - 封面圖全部更換，提升首頁視覺衝擊力
 *
 * ▍封面圖對應說明
 * 1. Behavior Logic → branding-dark-ui-landing（深色科技感，視覺衝擊強）
 * 2. 小兔熊         → poster-mockup-main（暖黃色調，角色明確）
 * 3. 合家小食屋     → practice-logo-hejia（黑底Logo，視覺乾淨）
 * 4. 設計練習       → practice-comp-01（武俠風影像合成，技術感高）
 */

const ALIGN_CONFIG = {
  left:  { textAlign: 'text-left'  as const },
  right: { textAlign: 'text-right' as const },
};

const WORKS = [
  // ① 主力：Behavior Logic 完整品牌案
  {
    id: 'personal-branding',
    titleZH: '品牌視覺建置｜Behavior Logic',
    titleEN: 'Brand Identity / Website',
    subtitle: 'BRAND IDENTITY / 2024–2025',
    img: brandingDarkUI,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  // ② 次主力：小兔熊完整品牌識別（Logo + 名片 + 海報，有現場使用照）
  {
    id: 'rabbit-bear',
    titleZH: '品牌視覺設計｜小兔熊',
    titleEN: 'Brand Identity / Print',
    subtitle: 'BRAND IDENTITY / 2023',
    img: posterMockupMain,
    extraClass: 'lg:mt-32',
    ...ALIGN_CONFIG.right,
  },
  // ③ 提案：合家小食屋 Logo + 包裝標籤系統
  {
    id: 'hejia-branding',
    titleZH: '品牌識別提案｜小琉球合家麻花捲',
    titleEN: 'Brand Identity Proposal',
    subtitle: 'BRAND PROPOSAL / 2018',
    img: practiceLogoHejia,
    extraClass: '',
    ...ALIGN_CONFIG.left,
  },
  // ④ 練習收尾：Redesign & Lab（影像合成 / 字體 / UI / Logo / Redesign）
  {
    id: 'practice-lab',
    titleZH: '設計練習｜Redesign & Lab',
    titleEN: 'Visual Lab / Redesign',
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
