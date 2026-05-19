import React from 'react';
import { LAYOUT } from '../../styles/layout';

/**
 * [A] 理念區 #philosophy：說明設計觀與工作價值；桌機版才在句中斷行，手機維持連貫閱讀。
 */

// [B] 樣式常數（版面在前，字級與 RWD 在後）
const STYLES = {
  container: LAYOUT.colCenterText,
  description: 'text-lg font-extralight italic leading-[2.2] md:text-3xl',
  breakMd: 'hidden md:block',
} as const;

const SECTION_SURFACE: React.CSSProperties = {
  paddingTop: 'var(--section-padding-y, 10rem)',
  paddingBottom: 'var(--section-padding-y, 10rem)',
  background: 'var(--section-bg-philosophy, #0E0C0B)',
};

const DESCRIPTION_TYPO: React.CSSProperties = {
  color: 'var(--philosophy-text, rgba(255,255,255,0.8))',
  letterSpacing: 'var(--philosophy-letter-spacing, 0.15em)',
};

// [C] 元件主體
export const Philosophy: React.FC = () => (
  <section id="philosophy" style={SECTION_SURFACE}>
    <div className={STYLES.container}>
      <p className={STYLES.description} style={DESCRIPTION_TYPO}>
        「讓品牌在每個接觸點都維持一致，
        <br className={STYLES.breakMd} />
        是我做視覺設計最重要的原則。」
      </p>
    </div>
  </section>
);
