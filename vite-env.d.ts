/// <reference types="vite/client" />

/** * 1. 擴展全域 Window 接口 
 * 解決 "Property 'gsap' does not exist on type 'Window'"
 * 這裡不需要 declare，直接擴展即可
 */
interface Window {
    gsap?: any;
    ScrollTrigger?: any;
  }
  
  /** * 2. 處理特定資源 
   * Vite 預設已經處理了多數圖片，如果妳還有報錯，才需要個別定義。
   * 這裡保持空白或僅放 Window 擴展，通常就能解決 90% 的紅字。
   */