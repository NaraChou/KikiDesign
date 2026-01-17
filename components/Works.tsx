// @ts-ignore
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// 匯入圖片 (路徑與副檔名已根據您的現狀調整)
import workImg1 from '../assets/images/work-01.webp';
import workImg2 from '../assets/images/work-02.png';

declare const window: any;

// 1. 定義作品資料陣列，將樣式與內容抽離
const projects = [
  {
    id: 'personal-branding',
    title: '個人品牌形象官網 / Personal Branding Website',
    subtitle: 'BRAND IDENTITY / 2024',
    img: workImg1,
    // 建議：使用深藍灰色，並加上 p-8 內距
    bgColor: 'bg-[#1a1c2e]/80 p-8',
    borderColor: 'border-white/10',
    customClass: '',
    textAlign: 'md:text-left'
  },
  {
    id: 'logo-design',
    title: '個人商標與名片 / Logo & Business Card',
    subtitle: 'VISUAL DESIGN / 2025',
    img: workImg2,
    // 建議：深紫色質感
    bgColor: 'bg-[#2e1a2e]/80 p-8',
    borderColor: 'border-white/10',
    customClass: 'md:mt-64',
    textAlign: 'text-right md:text-left'
  }
];

export const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 確保 gsap 存在後再執行
    if (window.gsap) {
      const ctx = window.gsap.context(() => {
        const cards = document.querySelectorAll('.work-card');
        cards.forEach((card) => {
          window.gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=50px"
            },
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: "power2.out"
          });
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="works" ref={containerRef} className="py-24 md:py-40 px-6 md:px-16 max-w-7xl mx-auto">
      {/* 標題區塊 */}
      <div className="flex flex-col mb-24 md:mb-48 border-l border-red-500/20 pl-6 md:pl-10">
        <h3 className="serif-italic text-3xl md:text-4xl mb-4 italic text-white">Portfolio</h3>
        <p className="text-[9px] tracking-[0.5em] text-[rgba(234,226,214,0.5)] uppercase">Selected Fragments</p>
      </div>

      {/* 作品網格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-40 items-start">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/work/${project.id}`}
            className={`work-card group cursor-pointer block ${project.customClass}`}
          >
            {/* 動態圖片容器：結合 object-contain (置中不切圖) 與自定義背景 */}
            <div className={`relative overflow-hidden aspect-4/5 rounded-2xl border shadow-inner transition-all duration-500 ${project.bgColor} ${project.borderColor}`}>

              {/* 遮罩層 */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10 duration-500"></div>

              <img
                src={project.img}
                alt={project.title}
                // 核心修正：object-contain + object-center 確保圖片完整
                className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* 右上角箭頭 */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                  <span className="text-[10px] text-white">↗</span>
                </span>
              </div>
            </div>

            {/* 下方文字資訊：保留您原本的字體大小與間距 */}
            <div className={`mt-8 md:mt-12 space-y-2 ${project.textAlign}`}>
              <h4 className="text-xs tracking-[0.4em] font-light uppercase text-white/80 group-hover:text-white transition-colors">
                {project.title}
              </h4>
              <p className="text-[9px] text-[rgba(234,226,214,0.5)] tracking-widest italic uppercase">
                {project.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};