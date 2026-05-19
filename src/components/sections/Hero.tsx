import React from 'react';
import { LAYOUT } from '../../styles/layout';

/**
 * [A] 首屏 Hero：滿版高度、垂直置中；#home、#hero-tag、#hero-title、#hero-line、#hero-desc 供進場動畫使用，請勿更名。
 * 定位為面試用作品集，語氣以平面／品牌／印刷為主，數位版面僅輕描。
 */

// [B-0] 進場動畫鉤子：含初始隱藏狀態，供時間軸淡入上移
const GSAP_SELECTORS = {
  tag: 'hero-tag opacity-0',
  title: 'hero-title opacity-0',
  description: 'hero-description opacity-0',
} as const;

// [B] 版面與按鈕外觀（不混入動畫專用 class）
const STYLES = {
  wrapper:
    'relative flex min-h-screen flex-col items-center justify-center bg-transparent pt-10 text-center',
  container: `${LAYOUT.colCenter} justify-center`,
  titleAccent: 'font-normal opacity-90',
  divider: 'hero-divider',
} as const;

// [C] 元件主體
export const Hero: React.FC = () => {
  return (
    <section id="home" className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <span id="hero-tag" className={GSAP_SELECTORS.tag}>
          品牌視覺｜平面設計｜AI 協作
        </span>

        <h1 id="hero-title" className={GSAP_SELECTORS.title}>
          感性之眼
          <br />
          <span className={STYLES.titleAccent}>專業之筆</span>
        </h1>

        <div id="hero-line" className={STYLES.divider}></div>

        <p id="hero-desc" className={GSAP_SELECTORS.description}>
          品牌視覺與平面設計為主，
          <br />
          結合 AI 協作提升設計效率與視覺延展。
        </p>
      </div>
    </section>
  );
};
