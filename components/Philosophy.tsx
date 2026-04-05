import React from 'react';
import { LAYOUT } from '../styles/layout';

/**
 * [A] 視覺資訊備註
 * 理念區 #philosophy：上下留白與背景色由 CSS 變數控制；內文斷行在 md 以上才插入換行，手機維持連貫閱讀。
 */

// [B] 樣式常數（字串末端為 RWD）
const STYLES = {
  container: LAYOUT.colCenterText,
  description: 'text-lg md:text-3xl leading-[2.2] font-extralight italic',
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
        「設計不只是為了解決問題，更是一種溫度的傳遞。
        <br className={STYLES.breakMd} />
        我們在混亂中尋找秩序，在空白中賦予生命。」
      </p>
    </div>
  </section>
);
