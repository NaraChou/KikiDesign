import React from 'react';

/**
 * [Loader 元件｜視覺化結構與資訊統整註解]
 * ──────────────────────────────
 * ▍畫面行為說明（白話）
 * - 畫面顯示時，Loader 永遠鋪滿整個視窗，背景色與內容皆走全局 CSS 變數，保證與全站色系一致、比例一致。
 * - Loader 內容（Loading 條與品牌名稱）上下置中、不會左右偏移，且最大寬度與其他主要內容（如 Hero, Works, Footer）一致，由 content-width-container 控管。
 * 
 * ▍規範統合
 * 1. 樣式全部由 Tailwind class 配合全域 CSS 變數驅動，不能有重複的 px、顏色寫死在組件。
 * 2. 背景色、loading 條尺寸／色彩／圓角、品牌標語 spacing/顏色全部從 :root 統一調校，方便以後設計師一個地方總控全站 Loader/Nav/Footer 一致。
 * 3. 結構只保留一份資訊，相關屬性（如 background, color, border-radius...）歸類於 style 一處，規範更好讀。
 * 4. 禁止任何會導致變形的寬高設定（無 object-fit、無拉寬拉高），一律用寬高/對齊變數。
 *
 * ▍視覺體驗
 * - Loader 進場時畫面整齊、顏色品牌感統一、無論 RWD 或高寬比例變動都穩定置中。
 */

export const Loader: React.FC = () => (
  // [畫面全螢幕鋪滿，z-100確保任何內容都不能蓋住 Loader] 
  <div
    id="loader"
    className="fixed inset-0 z-[100] flex justify-center items-center"
    // 所有顏色、背景走全域變數，Loader、Nav、Footer統一控管
    style={{
      background: 'var(--loader-bg, #0E0C0B)',
    }}
  >
    {/* [內容最大寬度與全站一致，以下內容永遠不會偏離左右邊界比例] */}
    <div className="content-width-container w-full flex flex-col items-center text-center">
      {/* [Loader 條：寬高度、顏色、圓角皆統一以 CSS 變數控管，僅此一份來源] */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{
          width: 'var(--loader-bar-width, 4rem)',
          height: 'var(--loader-bar-height, 1px)',
          background: 'var(--loader-bar-bg, rgba(255,255,255,0.08))',
          borderRadius: 'var(--loader-bar-radius, 0)',
        }}
      >
        {/* [進度動畫區塊] 主色走全域變數，供動畫外部加載時直接操控 transform */}
        <div
          id="loader-progress"
          className="absolute top-0 left-0 h-full w-full -translate-x-full"
          style={{
            background: 'var(--brand-accent, #EF4444)',
          }}
        ></div>
      </div>
      {/* [品牌標語：spacing、字級、顏色皆歸類至 style 變數，維護超簡單] */}
      <p
        className="uppercase"
        style={{
          marginTop: 'var(--loader-label-mt, 2rem)',
          fontSize: 'var(--loader-label-font-size, 8px)',
          letterSpacing: 'var(--loader-label-tracking, 0.8em)',
          opacity: 0.3,
          color: 'var(--brand-subtle, rgba(234,226,214,0.5))',
          fontFamily: 'inherit'
        }}
      >
        KiKi Design
      </p>
    </div>
  </div>
);