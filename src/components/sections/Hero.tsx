import React from 'react';
import { LAYOUT } from '../../styles/layout';

/**
 * [A] 視覺資訊備註
 * 首屏 Hero：滿版高度、垂直置中；#home、#hero-tag、#hero-title、#hero-line、#hero-desc 供 GSAP 進場使用，請勿更名。
 */

// [B] 樣式常數（基礎在前，字串末端為 RWD）
// opacity-0 保留：GSAP 進場動畫初始狀態，不進語意 class
const STYLES = {
  wrapper:
    'min-h-screen flex flex-col justify-center items-center pt-10 text-center relative bg-transparent',
  container: `${LAYOUT.colCenter} justify-center`,
  tag: 'hero-tag opacity-0',
  title: 'hero-title opacity-0',
  titleAccent: 'font-normal opacity-90',
  divider: 'hero-divider',
  description: 'hero-description opacity-0',
} as const;

// [C] 元件主體
export const Hero: React.FC = () => {
  return (
    <section id="home" className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <span id="hero-tag" className={STYLES.tag}>
          Aesthetic Sensitivity
        </span>

        <h1 id="hero-title" className={STYLES.title}>
          感性之眼
          <br />
          <span className={STYLES.titleAccent}>專業之筆</span>
        </h1>

        <div id="hero-line" className={STYLES.divider}></div>

        <p id="hero-desc" className={STYLES.description}>
          探索視覺深處的詩意與純粹。
          <br />
          將瞬息萬變的感官，轉化為永恆的視覺語法。
        </p>
      </div>
    </section>
  );
};
