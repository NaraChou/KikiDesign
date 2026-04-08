/**
 * [全域宣告 - 動畫外掛與插件]
 * ▍說明：此區定義 window 上的外部動畫元件，便於全站掛載及 TypeScript 型別自動提示，不必重複宣告。
 * ▍視覺化連結：確保 GSAP 及關聯插件在任何動畫互動元件都能即時取用，避免因型別缺失造成動畫視覺失效。
 */
export {};

declare global {
  interface Window {
    gsap: any;              // [外部動畫引擎] 統一管理全局進場、離場等動態效果
    ScrollTrigger: any;     // [滾動觸發插件] 用於產生視覺滑動連動效果
    ScrollToPlugin: any;    // [平滑捲動插件] 實作自動回頂、錨點跳轉視覺體驗
  }
}
