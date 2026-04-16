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

// [C] 自訂游標：導入 Lerp 演算法實現「呼吸感」跟隨體感，並加入「靜止休眠」邏輯優化效能
const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  // 滑鼠物理座標記憶（代表滑鼠實際移動點）
  const mouse = useRef({ x: 0, y: 0 });
  // 元件視覺游標當前位置（每幀插值漸進）
  const pos = useRef({ x: 0, y: 0 });
  // rAF 狀態旗標，用於控制休眠時不持續重啟 animationFrame
  const rafActive = useRef(false);
  // 休眠機制旗標
  const sleeping = useRef(false);

  useEffect(() => {
    /**
     * [互動邏輯] 監聽滑鼠座標，只要使用者有移動游標即喚醒動畫
     * 這能保證靜止期間 rAF 處於休眠，不浪費資源
     */
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // 滑鼠移動時如果進入休眠，立即喚醒動畫循環
      if (sleeping.current && !rafActive.current) {
        sleeping.current = false;
        rafActive.current = true;
        requestAnimationFrame(updateCursor);
      }
    };

    /**
     * [動畫循環-優化版]
     * 如果 dx/dy 均極小（靜止閾值 < 0.1），則進入休眠，rAF 暫停
     * 下次滑鼠移動時才再次啟動
     * 
     * [視覺行為說明] 
     * - 動畫循環僅當游標明顯移動或者剛被拖動時才會密集更新。
     * - 長時間靜止不會浪費 GPU/CPU，使筆電省電與瀏覽器背景頁面負載降低。
     */
    function updateCursor() {
      // 計算與滑鼠目標的距離
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      // Lerp 插值運動（營造流暢跟隨感）
      pos.current.x += dx * 0.15;
      pos.current.y += dy * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // ★★★ 靜止休眠判斷：距離非常小時停止動畫循環 ★★★
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        // [效能最佳化] 游標基本已到位，暫停 rAF，直到下次用戶移動
        rafActive.current = false;
        sleeping.current = true;
        return;
      }

      // 尚未靜止時維持下一幀遞迴
      requestAnimationFrame(updateCursor);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    // 首次掛載預設啟動 animationFrame
    rafActive.current = true;
    sleeping.current = false;
    requestAnimationFrame(updateCursor);

    // 🧹 畫面離開清理：移除監聽與停止動畫（避免報錯或記憶體洩漏）
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // [註] rAF 已自我停止，不需額外 cancelAnimationFrame
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
