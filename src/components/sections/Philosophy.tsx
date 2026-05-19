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
  supporting:
    'mx-auto mt-8 max-w-2xl text-sm font-extralight not-italic leading-relaxed opacity-70 md:text-base',
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
      <p className={STYLES.supporting} style={DESCRIPTION_TYPO}>
        我相信好的畫面來自清楚的訊息層級：誰在看、要先讀什麼、品牌想留下什麼印象。無論是紙本油墨或螢幕上的版面，都用同一套色彩與字級說話；在送印與交付前多一道校稿，讓成品貼近腦中的樣子。
      </p>
    </div>
  </section>
);
