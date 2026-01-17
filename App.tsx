import React, { useEffect, useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BackgroundEffects } from './components/BackgroundEffects';
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { MobileMenu } from './components/MobileMenu';
import { Home } from './components/Home';
import { WorkDetail } from './components/WorkDetail';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import './types';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainTimeline = useRef<any>(null);
  const location = useLocation();

  // Initialize GSAP
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollToPlugin);
    }
  }, []);

  // Initial Loading Animation - Only run on initial load, but reset for visual consistency if needed
  // We check if it's the home page to run the full hero intro
  useEffect(() => {
    if (location.pathname === '/') {
        const ctx = window.gsap.context(() => {
          const tl = window.gsap.timeline();
          mainTimeline.current = tl;

          // 1. Loader Animation
          tl.to("#loader-progress", { x: "0%", duration: 0.8 })
            .to("#loader", { autoAlpha: 0, duration: 0.8 })
            
          // 2. Hero Animation
            .to("#hero-tag", { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")
            .to("#hero-title", { opacity: 1, y: 0, duration: 1.2 }, "-=0.5")
            .to("#hero-line", { width: "60px", duration: 0.8 }, "-=0.8")
            .to("#hero-desc", { opacity: 1, y: 0, duration: 1 }, "-=0.8");
        });
        return () => ctx.revert();
    } else {
        // Quick fade out for inner pages if loader exists
        window.gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="relative w-full">
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
            <AppContent />
        </Router>
    );
}
