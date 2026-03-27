// 匯入 React 相關與 React Router
import React, { useRef, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// 匯入「視覺結構元件」與動態組件
import { BackgroundEffects } from './components/BackgroundEffects';
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/Home';
import { WorkDetail } from './components/WorkDetail';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import './types';

/**
 * CustomCursor
 * ▍品牌圓游標，僅桌面 md+ 顯示，隨滑鼠移動呈現動態視覺
 * ▍不吃 pointerEvent，不影響實際互動
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [動態互動] 滑鼠移動時，圓游標自動跟隨座標，在畫面上飄移
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorRef.current.style.transform = `translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed z-[99] hidden md:block"
      aria-hidden="true"
    />
  );
};

/**
 * AppContent
 * [元件記憶]：統一管理主狀態，協同觸動畫面(動畫/菜單)
 * [連動效果]：根據路徑進行 Loader/Hero 動畫切換與 ScrollTrigger 統一維護
 */
function AppContent() {
  // —— [統合狀態區] ——
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainTimeline = useRef<any>(null);
  const location = useLocation();

  // —— [GSAP 與插件初始化，僅執行一次] ——
  useEffect(() => {
    // [動畫資源初始化] 頁面載入時只註冊一次，避免多次 register
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    }
  }, []);

  // —— [ScrollTrigger 刷新控制，避免切頁動畫斷裂] ——
  useEffect(() => {
    // [切頁優化] 強制等待路徑切換後 0.5 秒再刷新 ScrollTrigger，避免動畫重排
    if (!window.ScrollTrigger) return;
    const originalRefresh = window.ScrollTrigger.refresh;
    let isRefreshingBlocked = true;
    window.ScrollTrigger.refresh = () => {
      if (!isRefreshingBlocked) originalRefresh.call(window.ScrollTrigger);
    };
    const restoreTimer = setTimeout(() => {
      isRefreshingBlocked = false;
      window.ScrollTrigger.refresh = originalRefresh;
      window.ScrollTrigger.refresh();
    }, 500);
    return () => {
      clearTimeout(restoreTimer);
      if (window.ScrollTrigger) window.ScrollTrigger.refresh = originalRefresh;
    };
  }, [location.pathname]);

  // —— [首頁 Loader 與 Hero 動畫精簡優化版] ——
  useEffect(() => {
    // [進場動畫邏輯] 只在首頁網址時才運行完整流程
    if (location.pathname === '/') {
      // 首頁動畫流程：Loader → Hero 各元素漸進現身（全部動作精簡/縮短且避免 reflow）
      // [動畫說明] 下劃線統一用 scaleX，所有秒數壓縮，內容銜接極緊湊
      const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline();
        mainTimeline.current = tl;

        // ------ 精簡動畫時間＆reflow 修正版本 ------
        tl.to("#loader-progress", { x: "0%", duration: 0.3 }) // 進度條動畫：0.3秒收尾
          .to("#loader", { autoAlpha: 0, duration: 0.3 })     // Loader 統一 0.3 秒淡出
          .to("#hero-tag", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2") // Tag 提早 0.2 秒進場
          .to("#hero-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4") // title 重疊更緊
          // 只用 scaleX 拉線（避免 layout reflow），從 0 拉至 1
          .fromTo(
            "#hero-line",
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 0.6 }, // 0.6 秒拉線
            "-=0.6"
          )
          .to("#hero-desc", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6"); // 最終說明 0.8 秒淡入
      });
      return () => ctx.revert();
    }
    // [非首頁處理] 僅淡出 Loader，不執行額外動畫
    else {
      window.gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
    }
  }, [location.pathname]);

  // —— [MobileMenu 控制方法統整] ——
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // —— [全結構整合，主動態層級 + 子元件] ——
  return (
    <div className="relative w-full">
      <CustomCursor />
      <BackgroundEffects />
      <Loader />
      <Navigation onToggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<WorkDetail />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/**
 * App（全域入口，導入 SPA 機制）
 * [統一只 export 一個 App]
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
