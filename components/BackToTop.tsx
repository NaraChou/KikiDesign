import React, { useEffect, useRef } from 'react';

export const BackToTop: React.FC = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (btnRef.current) {
        if (window.scrollY > 500) {
          btnRef.current.classList.add('visible');
          btnRef.current.style.opacity = '1';
          btnRef.current.style.pointerEvents = 'auto';
        } else {
          btnRef.current.classList.remove('visible');
          btnRef.current.style.opacity = '0';
          btnRef.current.style.pointerEvents = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.gsap) {
      window.gsap.to(window, { scrollTo: 0, duration: 1.5, ease: "power4.inOut" });
    }
  };

  return (
    <button 
      ref={btnRef}
      id="back-to-top" 
      onClick={scrollToTop}
      className="fixed bottom-10 right-6 md:right-10 z-[70] group flex flex-col items-center transition-opacity duration-500 opacity-0 pointer-events-none"
    >
      <div className="w-[1px] h-12 bg-red-500/50 group-hover:h-16 transition-all duration-500"></div>
      <span className="text-[8px] tracking-[0.4em] text-[rgba(234,226,214,0.5)] uppercase mt-4 vertical-text">Top</span>
    </button>
  );
};