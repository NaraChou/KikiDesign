import React, { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// [視覺結構元件] — 全域 UI 主體（動態背景、導航、主內容、頁腳）
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
 * CustomCursor 自訂游標元件
 * [中文註解]
 * ▍視覺上跟隨使用者的滑鼠移動，形成品牌感專屬圓形游標。
 * ▍僅在桌面版顯示（md 以上才可見），確保手機不被干擾。
 * ▍動態跟隨 — 游標移動時，即時驅動 <div> 元素移動到滑鼠位置。
 * ▍本身不吃 pointer 事件，實體無阻 UI 交互。
 */
export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [動態觸發] 游標跟隨，根據滑鼠移動調整位置
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

  // [美術細節] 
  // .custom-cursor 請在全域 CSS 定義（外部設計組控制直徑、混和模式、透明度）
  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed z-[99] hidden md:block"
      aria-hidden="true"
    />
  );
};

/**
 * AppContent 組件
 * [中文註解]
 * ▍「元件的記憶」：統一管理全站狀態（isMenuOpen），並協調 GSAP 動畫效果。
 * ▍「連動效果」：根據 pathname 控制初始 Loader 與 Hero 進場動畫，讓首頁與作品內頁有不同的動態節奏。
 */
function AppContent() {
  // [元件的記憶] 狀態統一
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制 MobileMenu 顯示狀態
  const mainTimeline = useRef<any>(null);              // 保存 GSAP 動畫時間軸
  const location = useLocation();                      // 動態監聽路徑，做動態視覺切換

  // [連動效果] —— GSAP 外部插件初始化（僅需一次）
  useEffect(() => {
    // 若缺少 gsap 插件，將導致所有動畫無法觸發，畫面會變靜態
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    }
  }, []);

  // [暴力方案 #1] 監聽路徑變化，暫時阻止 GSAP ScrollTrigger 的刷新
  useEffect(() => {
    if (!window.ScrollTrigger) return;
    const originalRefresh = window.ScrollTrigger.refresh;
    let isRefreshingBlocked = true;
    window.ScrollTrigger.refresh = () => {
      if (!isRefreshingBlocked) {
        originalRefresh.call(window.ScrollTrigger);
      }
    };
    const restoreTimer = setTimeout(() => {
      isRefreshingBlocked = false;
      window.ScrollTrigger.refresh = originalRefresh;
      window.ScrollTrigger.refresh();
    }, 500);
    return () => {
      clearTimeout(restoreTimer);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.refresh = originalRefresh;
      }
    };
  }, [location.pathname]);

  // [連動效果] —— 首頁 Hero 與 Loader 動畫
  useEffect(() => {
    // 首頁才執行完整進場動畫，內頁僅快速淡出 loader
    if (location.pathname === '/') {
      const ctx = window.gsap.context(() => {
        const tl = window.gsap.timeline();
        mainTimeline.current = tl;
        // 動畫流程：Loader 條進度 → Loader 消失 → Hero 各元素依序淡入
        tl.to("#loader-progress", { x: "0%", duration: 0.8 })
          .to("#loader", { autoAlpha: 0, duration: 0.8 })
          .to("#hero-tag", { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
          .to("#hero-title", { opacity: 1, y: 0, duration: 1.2 }, "-=0.5")
          .to("#hero-line", { width: "60px", duration: 0.8 }, "-=0.8")
          .to("#hero-desc", { opacity: 1, y: 0, duration: 1 }, "-=0.8");
      });
      return () => ctx.revert();
    } else {
      window.gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
    }
  }, [location.pathname]);

  // [互動邏輯] —— 控制 MobileMenu 開闔狀態
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // [語義化結構] —— <main> 主體、footer 與輔助元件
  return (
    <div className="relative w-full">
      {/* [全域自訂滑鼠游標渲染] — 視覺動態，僅桌面模式顯示 */}
      <CustomCursor />
      {/* 動態背景視覺 */}
      <BackgroundEffects />
      {/* 首次進站 Loading 效果 */}
      <Loader />
      {/* 導覽列與手機選單 */}
      <Navigation onToggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      {/* 主內容區（動態渲染路由）*/}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<WorkDetail />} />
        </Routes>
      </main>
      {/* 頁腳與輔助回頂按鈕 */}
      <Footer />
      <BackToTop />
    </div>
  );
}

/**
 * App 元件（全域入口）
 * [中文註解]
 * ▍統一以 HashRouter 包覆，維持 SPA 路由機制
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop /> {/* [關鍵] 放在這裡，確保每次換頁都先執行捲動到頂部 */}
      <AppContent />
    </Router>
  );
}
