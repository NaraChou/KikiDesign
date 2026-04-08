import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * [A] 視覺資訊備註
 * 路由（網址路徑）切換時，將視窗與 .main-container 捲回頂端，避免讀者留在上一頁的捲動位置。
 * 不使用暫改 body/html overflow 的方式，以免與其他畫面效果打架。
 */

// [B] 與捲動行為相關的 DOM 選擇器（僅供此元件使用，勿與 GSAP 動畫 id 混用）
const MAIN_CONTAINER_SELECTOR = '.main-container';

// [C] 元件主體：依 pathname 精準重置 window 與主容器的捲動位置
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // [畫面效果] 先讓瀏覽器視窗回頂，再處理包在 .main-container 內可能存在的捲動
    window.scrollTo(0, 0);

    const mainEl = document.querySelector(MAIN_CONTAINER_SELECTOR) as HTMLElement | null;
    if (mainEl) {
      mainEl.scrollTop = 0;
      mainEl.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
