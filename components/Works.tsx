// @ts-ignore
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// 使用剛設定好的 @ 別名
import workImg1 from '../assets/images/work-01.png';
import workImg2 from '../assets/images/work-02.png';

declare const window: any;


export const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = window.gsap.context(() => {
      const cards = document.querySelectorAll('.work-card');
      cards.forEach((card) => {
        window.gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top bottom-=50px" },
          opacity: 0, 
          y: 30, 
          duration: 1.2, 
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={containerRef} className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col mb-24 md:mb-48 border-l border-red-500/20 pl-6 md:pl-10">
        <h3 className="serif-italic text-3xl md:text-4xl mb-4 italic">Portfolio</h3>
        <p className="text-[9px] tracking-[0.5em] text-[rgba(234,226,214,0.5)] uppercase">Selected Fragments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40 items-start">
        {/* Work 1 - Linked to Detail Page */}
        <Link to="/work/personal-branding" className="work-card group cursor-pointer block">
          <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 duration-500"></div>
            <img 
              src={workImg1} // 這裡必須是大括號包住的變數名
              alt="個人品牌形象官網" 
              className="w-full h-full object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <span className="text-[10px] text-white">↗</span>
                </span>
            </div>
          </div>
          <div className="mt-8 md:mt-12 space-y-2">
            <h4 className="text-xs tracking-[0.4em] font-light uppercase group-hover:text-white transition-colors">個人品牌形象官網 / Personal Branding Website</h4>
            <p className="text-[9px] text-[rgba(234,226,214,0.5)] tracking-widest italic uppercase">BRAND IDENTITY / 2024</p>
          </div>
        </Link>
        
        {/* Work 2 - Linked to Detail Page */}
        <Link to="/work/logo-design" className="work-card group cursor-pointer md:mt-64 block">
          <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 duration-500"></div>
            <img 
              src={workImg2} // 這裡必須是大括號包住的變數名
              alt="個人商標與名片" 
              className="w-full h-full object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <span className="text-[10px] text-white">↗</span>
                </span>
            </div>
          </div>
          <div className="mt-8 md:mt-12 space-y-2 text-right md:text-left">
            <h4 className="text-xs tracking-[0.4em] font-light uppercase group-hover:text-white transition-colors">個人商標與名片 / Logo & Business Card</h4>
            <p className="text-[9px] text-[rgba(234,226,214,0.5)] tracking-widest italic uppercase">VISUAL DESIGN / 2025</p>
          </div>
        </Link>
      </div>
    </section>
  );
};