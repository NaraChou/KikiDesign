import React, { useRef, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

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
 * [A] 視覺資訊備註
 * 全站路由、自訂游標、背景與 Loader；首頁進場動畫綁定 #loader、#loader-progress、#hero-tag、#hero-title、#hero-line、#hero-desc，請勿更動這些 id 與選擇器字串。
 */

// [B] 樣式常數（基礎在前，字串末端為 RWD）
const STYLES = {
  cursor: 'custom-cursor pointer-events-none fixed z-[99] hidden md:block',
  wrapper: 'relative w-full',
} as const;

// [C] 自訂游標：桌面顯示圓形游標並跟隨滑鼠（不攔截點擊）
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // [畫面效果] 桌機游標移動時，品牌圓形游標跟著滑鼠在畫面上漂移（不影響點擊判定）
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

  return <div ref={cursorRef} className={STYLES.cursor} aria-hidden="true" />;
};

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainTimeline = useRef<any>(null);
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
      const animationFrame = requestAnimationFrame(() => {
        window.gsap.context(() => {
          const tl = window.gsap.timeline();
          mainTimeline.current = tl;

          tl.to("#loader-progress", { x: "0%", duration: 0.3 })
            .to("#loader", { autoAlpha: 0, duration: 0.3 })
            .to("#hero-tag", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
            .to("#hero-title", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
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
            .to("#hero-desc", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
        });
      });
      return () => cancelAnimationFrame(animationFrame);
    } else {
      window.gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
      <Analytics />
    </Router>
  );
}
