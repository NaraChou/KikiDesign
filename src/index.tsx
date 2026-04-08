import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/globals.css';
import './css/style.css';
import './css/works.css';
import './css/work-detail.css';
import './css/motion.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

/**
 * [A] 視覺資訊備註
 * 根節點外層 .main-container 與全站寬度／左右留白一致；路由換頁時 ScrollToTop 會一併重置此容器的捲動。
 */

// [B] 樣式常數
const STYLES = {
  wrapper: 'main-container',
} as const;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('找不到 root 元素，React App 無法掛載，畫面完全無法顯示');
}

// [C] 掛載應用
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <div className={STYLES.wrapper}>
      <App />
    </div>
  </React.StrictMode>
);
