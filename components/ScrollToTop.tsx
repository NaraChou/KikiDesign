import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop 組件
 * [中文註解]
 * ▍路由切換時自動滾動到頂部（暴力方案）
 * - 使用 useLayoutEffect 確保在 DOM 更新後、瀏覽器繪製前執行
 * - 暫時隱藏 overflow 強迫瀏覽器重置捲動座標
 * - 同時處理 window、#root、.main-container 及所有可能的容器，確保兼容性
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // [暴力方案 #2] 換頁時先將 overflow 設為 hidden，置頂後再恢復
    // 這會強迫瀏覽器重置捲動座標
    // 保存原始的 inline style（如果有的話）
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    // 暫時隱藏滾動軸
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // [暴力方案] 使用 requestAnimationFrame 確保在下一幀執行
    requestAnimationFrame(() => {
      // [滾動處理] 每次路徑 (pathname) 改變時，捲動到最上方
      // 優先使用 window.scrollTo（標準情況）
      window.scrollTo(0, 0);
      
      // [兼容性處理 #1] 如果 #root 設定了 height: 100% 或 overflow，滾動 #root 容器
      const rootElement = document.querySelector('#root') as HTMLElement;
      if (rootElement) {
        rootElement.scrollTo(0, 0);
        rootElement.scrollTop = 0;
      }
      
      // [兼容性處理 #2] 如果 .main-container 設定了 overflow: auto，滾動容器而非 window
      const mainContainer = document.querySelector('.main-container') as HTMLElement;
      if (mainContainer) {
        mainContainer.scrollTo(0, 0);
        mainContainer.scrollTop = 0;
      }
      
      // [檢查 layout 結構] 處理 App.tsx 中包裹 Routes 的 div（如果有 display: flex 或 height: 100vh）
      const appWrapper = document.querySelector('.relative.w-full') as HTMLElement;
      if (appWrapper) {
        appWrapper.scrollTo(0, 0);
        appWrapper.scrollTop = 0;
      }
      
      // [額外處理] 同時滾動 document.documentElement 和 document.body（某些瀏覽器需要）
      document.documentElement.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTo(0, 0);
      document.body.scrollTop = 0;
      
      // [恢復 overflow] 在短暫延遲後恢復滾動軸，確保置頂已完成
      // 恢復為空字串，讓 CSS 樣式表控制（這樣會恢復到 CSS 中定義的值）
      setTimeout(() => {
        document.body.style.overflow = originalBodyOverflow || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
      }, 100);
    });
    
    // [清理函數] 確保組件卸載時也恢復 overflow（重要：防止滾動被永久禁用）
    return () => {
      document.body.style.overflow = originalBodyOverflow || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;