import React from 'react';

/**
 * [A] 視覺資訊備註
 * 首屏 Hero：滿版高度、垂直置中；#home、#hero-tag、#hero-title、#hero-line、#hero-desc 供 GSAP 進場使用，請勿更名。
 */

// [B] 樣式常數（基礎在前，字串末端為 RWD）
const STYLES = {
  section:
    'min-h-screen flex flex-col justify-center items-center pt-10 text-center relative bg-transparent',
  inner: 'content-width-container flex flex-col items-center justify-center w-full',
  tag: 'serif-italic block text-[10px] md:text-xs text-red-500/80 opacity-0 tracking-[0.5em] uppercase mb-8',
  title: 'chinese-art text-4xl md:text-7xl opacity-0 leading-tight mb-12',
  titleSpan: 'font-normal opacity-90',
  line: 'h-[1px] w-0 bg-red-500/30 mb-12',
  desc:
    'text-[rgba(234,226,214,0.5)] text-[11px] md:text-xs max-w-[280px] md:max-w-sm mx-auto leading-loose opacity-0 tracking-[0.2em] font-light',
} as const;

// [C] 元件主體
export const Hero: React.FC = () => {
  return (
    <section id="home" className={STYLES.section}>
      <div className={STYLES.inner}>
        <span id="hero-tag" className={STYLES.tag}>
          Aesthetic Sensitivity
        </span>

        <h1 id="hero-title" className={STYLES.title}>
          感性之眼
          <br />
          <span className={STYLES.titleSpan}>專業之筆</span>
        </h1>

        <div id="hero-line" className={STYLES.line}></div>

        <p id="hero-desc" className={STYLES.desc}>
          探索視覺深處的詩意與純粹。
          <br />
          將瞬息萬變的感官，轉化為永恆的視覺語法。
        </p>
      </div>
    </section>
  );
};
