import React from 'react';
// @ts-ignore
import kikiLogo from '../assets/images/logo-kiki-main.svg';

/**
 * [Loader 統一品牌進場區塊 | 以「視覺連動」方式解釋本元件]
 * -----------------------------------------------------------
 * - 整個 Loader 構成以「視覺聚焦」為核心：
 *   1. 背景遮罩(loader-wrapper)：阻止所有互動，給使用者專注等待進場的暗示。
 *   2. 品牌區塊（logo）與紅色光暈(loader-glow)：核心視覺同時呼吸脈動，創造動畫生命力。
 *   3. 進度條(loader-bar-container/loader-bar-fill)：GSAP 控制條狀動態，象徵頁面準備度，滑動填滿即進入主內容。
 *   4. 品牌標語(loader-slogan)：低彩、低調但強化記憶點。
 *
 * [註解說明規範]
 * - 一律用 Tailwind 與語義化結構，無內聯 style。
 * - 所有功能和結構都聚合成一層，依據畫面用途歸類。
 * - 視覺描述用「元件記憶」和「動態連動」方式白話化，易於後續維護。
 */
export const Loader: React.FC = () => (
  // loader-wrapper: 處於最高層級，進行全螢幕聚焦遮罩——任何等待時畫面唯一主角
  <div id="loader" className="loader-wrapper">
    {/* 「視覺聚焦核心」：垂直置中區：光暈、Logo、進度條、標語 */}
    <div className="content-width-container w-full flex flex-col items-center text-center">
      
      {/* 
        [動態組合區]
        - relative 父層確保紅光與 Logo 疊加居中，紅色光暈與 Logo 一體成形
        - mb-12 拉開與下方間距
      */}
      <div className="relative mb-12 flex items-center justify-center">
        {/* loader-glow: 品牌主色紅的呼吸光暈，脈動效果營造等待的儀式感 */}
        <div className="loader-glow" />
        {/* Logo: 保持比例避免失真，object-fit 由 CSS 保護，支持品牌細節 */}
        <img
          src={kikiLogo}
          className="w-16 h-16 relative z-10"
          alt="KiKi Design 品牌標誌"
        />
      </div>

      {/* 
        [進度條 + GSAP 控制動畫]
        - loader-bar-container: 裝載進度條容器(含裝飾)，寬度與高度統一通用變數，比例固定美感一致
        - loader-bar-fill: 進度條本身，由 GSAP 逐漸填滿。預設 X 軸隱藏，動態顯現
      */}
      <div className="loader-bar-container">
        <div id="loader-progress" className="loader-bar-fill" />
      </div>

      {/* [品牌標語區]：字級低調，進場儀式營造專業印象，不影響互動 */}
      <p className="loader-slogan">KiKi Design</p>
    </div>
  </div>
);