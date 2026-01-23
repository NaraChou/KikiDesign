import React from 'react';

/**
 * [Hero 區塊總說明｜視覺化開發註解]
 * ─────────────────────────────
 * [版面/間距統一]
 * - 全站所有主要內容（含 Hero、Navigation、Footer）寬度/左右間距完全交給 content-width-container class。
 * - 禁止在本區塊或子元件內手動寫 max-width/padding，統一由 :root 變數（--content-max-width, --content-padding-x）控制。
 * 
 * [語義化結構]
 * - 使用 <section>（主角區塊語意化標籤）包裹首頁 Hero，並標註 id="home" 供 anchor 與 SEO 對應。
 * - 標題 h1 用於視覺主標，副標語作為 span 包在 h1 內，語義正確又易於動畫。
 * 
 * [動態視覺/層級]
 * - 所有需要動畫的元素皆標註 id，供外部動畫控制（opacity、width）
 * - class 僅採用 Tailwind，禁止 inline style
 * - 所有 spacing、色系、字級均由 Tailwind config 與全局 CSS 變數管理。
 * 
 * [資訊歸類規則]
 * 1. 視覺資訊分拆：小標、標題、分隔線、主敘述皆以結構明確、props單純為主，避免重複。
 * 2. 需要一致的樣式或行為，盡量合併並去除冗餘設定。
 */

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      // [視覺註解] Hero 區塊高度永遠滿版，內容垂直置中，不允許個別 px 修改
      className="min-h-screen flex flex-col justify-center items-center pt-10 text-center relative bg-transparent"
    >
      {/* [內容寬度容器] 全站一致，主要內容區都用 .content-width-container */}
      <div className="content-width-container flex flex-col items-center justify-center w-full">
        {/* [小標 ／ 小字 Tag] */}
        <span
          id="hero-tag"
          className="serif-italic block text-[10px] md:text-xs text-red-500/80 opacity-0 tracking-[0.5em] uppercase mb-8"
        >
          Aesthetic Sensitivity
        </span>

        {/* [主標題+副標 | h1 語義化] */}
        <h1
          id="hero-title"
          className="chinese-art text-4xl md:text-7xl opacity-0 leading-tight mb-12"
        >
          感性之眼<br />
          <span className="font-normal opacity-90">專業之筆</span>
        </h1>

        {/* [裝飾性分隔線] */}
        <div
          id="hero-line"
          className="h-[1px] w-0 bg-red-500/30 mb-12"
        ></div>

        {/* [主說明文字] */}
        <p
          id="hero-desc"
          className="text-[rgba(234,226,214,0.5)] text-[11px] md:text-xs max-w-[280px] md:max-w-sm mx-auto leading-loose opacity-0 tracking-[0.2em] font-light"
        >
          探索視覺深處的詩意與純粹。<br />
          將瞬息萬變的感官，轉化為永恆的視覺語法。
        </p>
      </div>
    </section>
  );
};