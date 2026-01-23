import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 統一引入所有全域樣式，分類明確、避免重複（統整資訊註解）
import './css/globals.css';        // 全站預設變數、字型、斷點定義
import './css/style.css';          // 核心架構樣式（含 main-container 與:root 變數）
import './css/works.css';          // 作品一覽專區
import './css/work-detail.css';    // 作品詳細頁專區

/**
 * [中文註解]
 * ▍視覺化開發 — 內容統一包覆於 .main-container
 * - 「main-container」是一個最大寬且自帶左右 padding 的全站容器。所有頁面內容（含 Navigation、主內容、Footer）始終對齊，無需每頁重複定義。
 * - CSS 變數（如 --container-max-width, --container-padding-mobile）全部集中於 style.css 的 :root 管理，任何空間或寬度調整都能一站式同步。
 * - 實作重點：嚴禁在元件嵌套 hardcode px 或 margin，確保設計比例完全依 Kiki Design Style 共通規格。
 * 
 * ▍錯誤處理（視覺影響說明）
 * - 若無法找到 root 元素，整個畫面將無法顯示，需檢查 index.html 配置。
 */

const rootElement = document.getElementById('root');
if (!rootElement) {
  // 報錯時，畫面內容不會出現，需立即處理 DOM 結構
  throw new Error('找不到 root 元素，React App 無法掛載，畫面完全無法顯示');
}

// React 18 啟用 createRoot 掛載應用，App 統一包於 main-container
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <div className="main-container">
      <App />
    </div>
  </React.StrictMode>
);