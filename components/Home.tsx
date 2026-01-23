import React from 'react';
import { Hero } from './Hero';
import { Works } from './Works';
import { Philosophy } from './Philosophy';

/**
 * [Home 元件｜視覺結構與資訊統一註解]
 * ──────────────────────────────
 * ▍內容區主邏輯（視覺行為說明）：
 * - 所有主要頁面區塊（Hero、Works、Philosophy）統一包在 content-width-container 之內，
 *   確保無論裝置寬度如何，「左右間距」「上限寬度」「RWD 斷點」都一致，視覺線條永不亂跑。
 * - 關於 container 控制：所有 padding 與最大寬度統一走 CSS :root 全域變數（已於全域 CSS/gloabls 設定），後續不用逐區塊調整，彈性高且不易跑版。
 * - gap-32／md:gap-48 完全採用 Tailwind 間距變數（8px倍數），在主內容區內確保區塊之間分隔「比例感」一致。
 * - 若未來需全站微調寬度、留白、區塊spacing，僅需於 content-width-container 或 :root 變數調整一次即可，所有版型自動同步，美觀且可持續。
 *
 * ▍結構語義說明
 * 1. 最外層 <main>：表明這裡是主要內容區域，對 SEO 與可讀性均有加分。
 * 2. <div className="content-width-container ...">：RWD 保證主要內容左右對齊，不需重複設定。
 * 3. 子區塊 <Hero/>、<Works/>、<Philosophy/> 按順序渲染，未來如需增減區塊，一律統一寫在此陣列流程。
 * 
 * ▍關鍵：所有 spacing/寬度統一交由外層 container 控制，內部禁止手動寫 px，相同邏輯不可重複出現在 component 內容。
 */

export const Home: React.FC = () => (
  <main>
    {/* [主內容區：RWD/間距完全統一，利於維護的內容模板] */}
    <div className="content-width-container flex flex-col gap-32 md:gap-48">
      {/* 各主要區塊依序掛載，繼承統一寬度與 spacing，絕無多餘 px 控制 */}
      <Hero />
      <Works />
      <Philosophy />
    </div>
  </main>
);