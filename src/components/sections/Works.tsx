import React, { useEffect, useRef } from 'react';
import { LAYOUT } from '../../styles/layout';
import { STAGGER_WATERFALL } from '../../utils/animationPresets';
import { WorkCard } from './WorkCard';

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

// [C] 主區塊，改用語意化 <section> Ref
export const Works: React.FC = () => {
  // 👁️ 用於 gsap 物理範圍限制的 section 參考
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 💡 動畫觸發設計：依據畫面中 .works-grid 的出現來啟動淡入
    // [視覺化說明] → 當作品清單區進入視窗下緣 85% 時，卡片群將如瀑布般一張張淡入浮現
    const ctx = window.gsap.context(() => {
      window.gsap.from('.work-card', {
        scrollTrigger: {
          trigger: '.works-grid',       // 以 works-grid 為集體出發點
          start: 'top 85%',             // 進入畫面 15% 時啟動
          toggleActions: 'play none none none', // 播放一次
        },
        opacity: 0,                     // 初始為透明
        y: 40,                          // 略帶下方浮起感
        ...STAGGER_WATERFALL,           // 應用瀑布序列淡入
      });
    }, sectionRef); // 🛡️ 限定 only 區塊內動畫，避免全站污染

    // 🚮 頁面切換時，GSAP 動畫與觀察者自動一鍵清除，防止用戶切換頁面後動畫殘留或失靈
    return () => ctx.revert();
  }, []);

  return (
    // 語意化標籤 & 視覺記憶載體（section）包覆
    <section id="works" ref={sectionRef}>
      <div className={STYLES.container}>
        <header className="works-section-header">
          <h2 className="works-section-title">Portfolio</h2>
          <p className="works-section-label">Selected Fragments</p>
        </header>
        <div className={STYLES.grid}>
          {/* 
            [視覺邏輯] 逐筆渲染卡片元件，維持資料驅動。每張卡片即 portfolio 碎片的獨立視覺區塊。
            - 關鍵設計：img/標題/說明文字由 map 產生，維持未來可擴充性
          */}
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
