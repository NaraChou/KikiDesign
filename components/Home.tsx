import React from 'react';
import { Hero } from './Hero';
import { Works } from './Works';
import { Philosophy } from './Philosophy';

/**
 * [Home 元件｜主頁視覺架構暨邏輯資訊統合]
 * ──────────────
 * ▍結構語義 + 元件行為（歸類整理註解）
 * 
 * 1. 頁面主要內容由 <main> 作為容器，符合語義標籤規範，有利於 SEO 和輔助閱讀程式抓取重點。
 * 2. content-width-container（同一外層 div）控制所有主要寬度與 RWD spacing，一律透過 CSS :root 變數及 Tailwind 統一維護，禁止各區手動 px 設定，減少重複與維護痛點。
 * 3. 主要區塊（Hero / Works / Philosophy）由同一入口依序渲染，感知上一層 spacing，因此每一子元件內部不允許再做多餘「外圍留白」控制。
 * 4. spacing 統一化：flex-col 讓子區塊垂直排列，md:gap-48（桌面）/ 預設 gap（行動端）皆以 8px 倍數為唯一依據，美學比例高度一致，方便批次全站細節優化。
 * 5. 若全站需調整主體區間距、寬度，只需於 content-width-container 或 :root 變數調整一次，視覺動態與版面自動同步，維護效率高。
 * 
 * ▍同類型資訊已整併、無重複：
 * - "控制主內容寬度/間距"、「禁止分區內再重複 spacing」、「語義結構說明」、「全行動/桌面一致 RWD」已合併歸類為單一描述。
 * - 各元件若需增刪時，皆於此陣列（render list）依序調整，不分散至 component 內部，方便規劃。
 */

export const Home: React.FC = () => (
  <main>
    {/* [主內容區：所有 spacing／寬度一致由此統一掌控，維持 Kiki Design Style] */}
    <div className="content-width-container flex flex-col md:gap-48">
      <Hero />
      <Works />
      <Philosophy />
    </div>
  </main>
);