import React, { useRef, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { BackgroundEffects } from './components/common/BackgroundEffects';
import { Loader } from './components/common/Loader';
import { Navigation } from './components/layout/Navigation';
import { MobileMenu } from './components/layout/MobileMenu';
import { Home } from './components/Home';
import { WorkDetail } from './components/sections/WorkDetail';
import { Footer } from './components/layout/Footer';
import { BackToTop } from './components/common/BackToTop';
import ScrollToTop from './components/common/ScrollToTop';
import { FADE_OUT_LOADER, FADE_IN_UP } from './utils/animationPresets';

/**
 * [A] 視覺資訊備註
 * 全站路由、自訂游標、背景與 Loader；首頁進場動畫綁定 #loader、#loader-progress、#hero-tag、#hero-title、#hero-line、#hero-desc，請勿更動這些 id 與選擇器字串。
 */

// [B] 樣式常數（基礎在前，字串末端為 RWD）
const STYLES = {
  cursor: 'custom-cursor pointer-events-none fixed z-[99] hidden md:block',
  wrapper: 'relative w-full',
} as const;

// [C] 自訂游標：桌面顯示圓形游標並使用 GPU 加速跟隨滑鼠（提升絲滑體驗）
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [視覺體驗] 讓品牌圓形游標在畫面上像浮在頂層一樣絲滑漂移
    // 使用 translate3d 啟用 GPU 合成層，避免觸發 Layout Reflow，確保 60/120fps 的極致跟隨感
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // 🔴 修正：將 left/top 座標轉化為 GPU 變換，徹底消除主線程計算壓力
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };
    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return <div ref={cursorRef} className={STYLES.cursor} aria-hidden="true" />;
};

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // [畫面效果] 註冊捲動相關外掛，之後錨點平滑捲動與區塊進場動畫才能正常播放
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    }
  }, []);

  useEffect(() => {
    // [畫面效果] 換頁後短暫延遲再允許 ScrollTrigger 重算，避免版面還在切換時動畫錯位或閃爍
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

  useEffect(() => {
    // [畫面效果] 首頁：Loader 進度條收合後淡出，Hero 標題／線條／說明依序淡入；其他頁僅淡出 Loader
    if (location.pathname === '/') {
      let ctx: ReturnType<typeof window.gsap.context> | null = null;
      const animationFrame = requestAnimationFrame(() => {
        ctx = window.gsap.context(() => {
          const tl = window.gsap.timeline();
          tl.to("#loader-progress", { x: "0%", duration: 0.3 })
            .to("#loader", { ...FADE_OUT_LOADER, duration: 0.3 })
            .to("#hero-tag",   { ...FADE_IN_UP, duration: 0.5 }, "-=0.2")
            .to("#hero-title", { ...FADE_IN_UP, duration: 0.8 }, "-=0.4")
            .fromTo(
              "#hero-line",
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: "left",
                duration: 0.6,
                force3D: true,
              },
              "-=0.6"
            )
            .to("#hero-desc", { ...FADE_IN_UP, duration: 0.8 }, "-=0.6");
        });
      });
      return () => {
        cancelAnimationFrame(animationFrame);
        ctx?.revert();
      };
    } else {
      window.gsap.to("#loader", { ...FADE_OUT_LOADER });
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={STYLES.wrapper}>
      <CustomCursor />
      <BackgroundEffects />
      <Loader />
      <Navigation onToggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<WorkDetail />} />
        </Routes>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
