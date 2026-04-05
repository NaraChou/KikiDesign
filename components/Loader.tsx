import React from 'react';
// @ts-ignore
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/**
 * [A] 視覺資訊備註
 * 全屏進場 Loader：#loader、#loader-progress 由 GSAP 控制淡出與進度條；結構與 class 與 works 樣式表對齊，勿改 id。
 */

// [B] 樣式常數（RWD 類別置於字串末端）
const STYLES = {
  container: 'content-width-container w-full flex flex-col items-center text-center',
  logoStack: 'relative mb-12 flex items-center justify-center',
  logoImage: 'w-16 h-16 relative z-10',
} as const;

// [C] 元件主體
export const Loader: React.FC = () => (
  <div id="loader" className="loader-wrapper">
    <div className={STYLES.container}>
      <div className={STYLES.logoStack}>
        <div className="loader-glow" />
        <img src={kikiLogo} className={STYLES.logoImage} alt="KiKi Design 品牌標誌" />
      </div>

      <div className="loader-bar-container">
        <div id="loader-progress" className="loader-bar-fill" />
      </div>

      <p className="loader-slogan">KiKi Design</p>
    </div>
  </div>
);
