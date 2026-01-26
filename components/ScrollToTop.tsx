import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop 組件
 * [中文註解]
 * ▍路由切換時自動滾動到頂部
 * - 監聽路由變化，每次切換頁面時自動滾動到最上方
 * - 同時處理 window 和 .main-container 兩種滾動情況，確保兼容性
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // [滾動處理] 每次路徑 (pathname) 改變時，捲動到最上方
    // 優先使用 window.scrollTo（標準情況）
    window.scrollTo(0, 0);
    
    // [兼容性處理] 如果 .main-container 設定了 overflow: auto，滾動容器而非 window
    // 檢查是否存在 .main-container 且可能有自己的滾動軸
    const mainContainer = document.querySelector('.main-container') as HTMLElement;
    if (mainContainer) {
      mainContainer.scrollTo(0, 0);
    }
    
    // [額外處理] 同時滾動 document.documentElement 和 document.body（某些瀏覽器需要）
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;