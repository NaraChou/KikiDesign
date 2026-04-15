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

// [C] 自訂游標：導入 Lerp 演算法實現「呼吸感」跟隨體感
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  // 滑鼠物理座標記憶（代表滑鼠實際移動點）
  const mouse = useRef({ x: 0, y: 0 });
  // 元件視覺游標當前位置（每幀插值漸進）
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // [動態資訊連動] 監聽滑鼠座標，記錄當前位置（類比滑鼠「指向」的目標點）
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // [畫面動態渲染] 使用 Lerp 插值算法達到「滑動延遲 → 呼吸感浮動」效果
    const updateCursor = () => {
      // 每一幀僅移動剩餘距離 15%，營造出柔和減速的浮動感
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        // translate3d 啟用 GPU 硬體加速，-8px 居中（因 .custom-cursor 長寬預期 16px）
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 8}px, ${pos.current.y - 8}px, 0)`;
      }
      requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const rafId = requestAnimationFrame(updateCursor);

    // 🧹 畫面離開清理：移除監聽與停止動畫（避免報錯或記憶體洩漏）
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // [UI回饋] 初始顯示游標節點，設 style={{ display: 'block' }} 以防止第一次渲染閃爍
  return <div ref={cursorRef} className={STYLES.cursor} style={{ display: 'block' }} />;
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
