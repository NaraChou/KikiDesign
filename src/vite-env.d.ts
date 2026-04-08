/// <reference types="vite/client" />

// 擴充全域 window，只宣告一次並群組（GSAP 動畫函式庫）
interface Window {
  gsap: any;             // GSAP 主函式庫，負責動畫序列
  ScrollTrigger: any;    // GSAP 延伸插件，處理畫面滑動觸發動畫
}