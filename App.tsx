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
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    }
  }, []);

  // —— [ScrollTrigger 刷新控制，避免切頁動畫斷裂] ——
  useEffect(() => {
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

  // —— [首頁 Loader 與 Hero 動畫統整] ——
  useEffect(() => {
    if (location.pathname === '/') {
      // 首頁完整進場動態流程統一（Loader → Hero 淡入）
      // [動畫說明] Hero 下劃線 #hero-line 改以 scaleX 動畫伸展，確保長度動畫更細緻、不影響比例
      const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline();
        mainTimeline.current = tl;
        // [動畫變更] Loader bar 與 Loader 淡出時間加速, Hero Tag 0.4s 更早浮現
        // --------- 這裡根據需求將動畫時間及重疊點數值調整如下 ---------
        tl.to("#loader-progress", { x: "0%", duration: 0.3 }) // 加速進度條，create 敏捷感
          .to("#loader", { autoAlpha: 0, duration: 0.3 })     // 加速 Loader 消失，畫面更利落
          .to("#hero-tag", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2") // Tag 更早顯現，節奏明快
          .to("#hero-title", { opacity: 1, y: 0, duration: 1.2 }, "-=0.5")
          // ★ 改為使用 scaleX 動畫避免寬度直接改變導致不穩定
          .fromTo(
            "#hero-line",
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left", duration: 0.8 },
            "-=0.8"
          )
          .to("#hero-desc", { opacity: 1, y: 0, duration: 1 }, "-=0.8");
      });
      return () => ctx.revert();
    } else {
      // 非首頁只做 Loader 淡出
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
