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
  actions: 'hero-actions opacity-0',
} as const;

// [B] 版面與按鈕外觀（不混入動畫專用 class）
const STYLES = {
  wrapper:
    'relative flex min-h-screen flex-col items-center justify-center bg-transparent pt-10 text-center',
  container: `${LAYOUT.colCenter} justify-center`,
  titleAccent: 'font-normal opacity-90',
  divider: 'hero-divider',
  resumeBtn:
    'inline-block border border-white/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-white/50 hover:text-white',
} as const;

// [C] 元件主體
export const Hero: React.FC = () => {
  return (
    <section id="home" className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <span id="hero-tag" className={GSAP_SELECTORS.tag}>
          平面與品牌視覺設計｜面試作品集
        </span>

        <h1 id="hero-title" className={GSAP_SELECTORS.title}>
          感性之眼
          <br />
          <span className={STYLES.titleAccent}>專業之筆</span>
        </h1>

        <div id="hero-line" className={STYLES.divider}></div>

        <p id="hero-desc" className={GSAP_SELECTORS.description}>
          專注識別系統、印刷物與主視覺延展，讓品牌在同一套色彩與字級裡說話。
          <br />
          亦涵蓋網頁與數位版面的視覺編排，讓線上閱讀維持與實體文宣一致的氣質。
        </p>

        <div className={GSAP_SELECTORS.actions}>
          <a
            href="/resume.pdf"
            className={STYLES.resumeBtn}
            aria-label="下載履歷 PDF（請將檔案置於 public/resume.pdf）"
            title="待補：請將 resume.pdf 放入 public 資料夾"
          >
            下載履歷
          </a>
        </div>
      </div>
    </section>
  );
};
