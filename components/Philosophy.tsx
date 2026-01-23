import React from 'react';

/**
 * [Philosophy 區塊｜視覺化行為與結構總註解]
 * ────────────────────────────────────
 * ▍視覺化體驗（白話技術）
 * - 「記憶」：Philosophy 這一區塊的「主要視覺記憶」是「一致的寬度框架」與「對稱留白」，其上下間距、背景色皆由全域 CSS 變數集中管理。
 * - 「群體對齊」：所有主區塊（Hero, Works, Footer, Philosophy）都受 content-width-container 控制，讓畫面主軸統一、左右界線不會各自漂移。
 * - 「連動效果」：當全域設定改變 --section-padding-y、--section-bg-philosophy 等時，本區塊會自動同步間距與背景，達到全站主題一鍵換色、換留白一致。
 *
 * ▍資訊統整理（規範統一）
 * - 僅使用 content-width-container 控制所有內部寬度/間距，禁止重複個別 max-w 或 padding 設定（完全 DRY 並便於全站維運）。
 * - 文字屬性（顏色、間距、斜體...）全部變數化，集中 style 區域，後續僅改變一處即全站同步。
 * - 舊寫法/註解均已統整於一份說明區塊，避免重複或分散敘述。
 */

export const Philosophy: React.FC = () => (
  <section
    id="philosophy"
    // [視覺體驗註解]：此區塊的上下大型留白、背景色，來自全域 CSS 變數。
    style={{
      // 全域 padding 控制（mobile/desktop 皆可由媒體查詢調控）
      paddingTop: 'var(--section-padding-y, 10rem)',
      paddingBottom: 'var(--section-padding-y, 10rem)',
      // 背景顏色主題統一由 :root 控管（Kiki Design Style）
      background: 'var(--section-bg-philosophy, #0A0908)',
    }}
  >
    {/* [結構對齊] 所有內容皆包於 content-width-container，確保所有主區內容左右線條絕對一致 */}
    <div className="content-width-container w-full text-center">
      <p
        // [字級、間距、字體統一走 Tailwind + style 變數，便於全站一致性體驗]
        className="text-lg md:text-3xl leading-[2.2] font-extralight italic"
        style={{
          // 文字主色調（變數，可配合暗色/品牌主題統一調整）
          color: 'var(--philosophy-text, rgba(255,255,255,0.8))',
          // 字母間距由變數集中管理，字感統一
          letterSpacing: 'var(--philosophy-letter-spacing, 0.15em)',
        }}
      >
        「設計不只是為了解決問題，更是一種溫度的傳遞。<br className="hidden md:block" />
        我們在混亂中尋找秩序，在空白中賦予生命。」
      </p>
    </div>
  </section>
);