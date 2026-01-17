import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectData';

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  // 修正：使用 (projects as any) 確保動態 ID 能正確抓取到 projectData.ts 的內容
  const project = id ? (projects as any)[id] : null;
  const containerRef = useRef<HTMLDivElement>(null);

  // 進入頁面時自動捲動到最上方
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // GSAP 瀑布流動畫邏輯
  useEffect(() => {
    if (!project) return;

    const ctx = window.gsap.context(() => {
      // 標頭文字動畫
      window.gsap.from("#detail-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      // 瀑布流圖片項目的滾動觸發動畫
      const items = document.querySelectorAll('.waterfall-item');
      items.forEach((item) => {
        window.gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=100px",
            toggleActions: "play none none reverse"
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id, project]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Project not found
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-16 min-h-screen bg-[#0E0C0B]">

      {/* Header 資訊區 */}
      <div id="detail-header" className="max-w-4xl mx-auto mb-20 md:mb-32 text-center">
        <div className="mb-6">
          <span className="text-[9px] text-red-500/80 tracking-[0.5em] uppercase">
            {project.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-light tracking-widest mb-6 text-[#EAE2D6] chinese-art">
          {project.title}
        </h1>
        <h2 className="text-xl md:text-2xl serif-italic text-white/40 mb-12 italic">
          {project.subtitle}
        </h2>
        <div className="w-px h-16 bg-white/10 mx-auto mb-12"></div>
        <p className="text-xs md:text-sm leading-loose tracking-[0.15em] text-[#EAE2D6]/70 max-w-xl mx-auto font-light">
          {project.description}
        </p>
      </div>

      {/* Waterfall Layout - 核心圖片渲染區 */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {project.images.map((img: string, index: number) => (
          <div key={index} className="waterfall-item break-inside-avoid relative group overflow-hidden bg-neutral-900/50 mb-8">
            {/* 懸停效果層 */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center pointer-events-none">
              <span className="text-[9px] tracking-[0.2em] text-white uppercase border border-white/30 px-3 py-1">
                View Detail
              </span>
            </div>

            {/* 圖片標籤：加入 onLoad 確保圖片載入後刷新 GSAP 觸發點 */}
            <img
              src={img}
              alt={`${project.title} - ${index + 1}`}
              onLoad={() => window.ScrollTrigger?.refresh()}
              className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
            />

            {/* 序號標記 */}
            <div className="py-3 px-1">
              <span className="text-[8px] tracking-[0.2em] text-white/30">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 底部導覽 */}
      <div className="mt-32 flex justify-center">
        <Link to="/" className="group flex flex-col items-center">
          <span className="w-12 h-px bg-white/20 group-hover:w-24 transition-all duration-500 mb-4"></span>
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white transition-colors">
            Back to Index
          </span>
        </Link>
      </div>
    </div>
  );
};