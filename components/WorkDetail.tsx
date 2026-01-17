import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projectData';

export const WorkDetail: React.FC = () => {
  const { id } = useParams();
  const project = projects[id as keyof typeof projects];
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on enter
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Waterfall Animation
  useEffect(() => {
    const ctx = window.gsap.context(() => {
      // Header Animation
      window.gsap.from("#detail-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });

      // Waterfall Items Animation
      const items = document.querySelectorAll('.waterfall-item');
      items.forEach((item, i) => {
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
  }, [id]);

  if (!project) {
    return <div className="h-screen flex items-center justify-center text-white">Project not found</div>;
  }

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-16 min-h-screen bg-[#0E0C0B]">
      
      {/* Header */}
      <div id="detail-header" className="max-w-4xl mx-auto mb-20 md:mb-32 text-center">
        <div className="mb-6">
            <span className="text-[9px] text-red-500/80 tracking-[0.5em] uppercase">{project.category}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-light tracking-widest mb-6 text-[#EAE2D6] chinese-art">{project.title}</h1>
        <h2 className="text-xl md:text-2xl serif-italic text-white/40 mb-12 italic">{project.subtitle}</h2>
        <div className="w-[1px] h-16 bg-white/10 mx-auto mb-12"></div>
        <p className="text-xs md:text-sm leading-loose tracking-[0.15em] text-[#EAE2D6]/70 max-w-xl mx-auto font-light">
          {project.description}
        </p>
      </div>

      {/* Waterfall Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 max-w-7xl mx-auto">
        {project.images.map((img, index) => (
          <div key={index} className="waterfall-item break-inside-avoid relative group overflow-hidden bg-neutral-900/50">
             {/* Interactive Overlay */}
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center pointer-events-none">
                <span className="text-[9px] tracking-[0.2em] text-white uppercase border border-white/30 px-3 py-1">View Detail</span>
             </div>
             
             <img 
               src={img} 
               alt={`${project.title} - ${index + 1}`} 
               className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
             />
             
             {/* Simple Caption for waterfall effect aesthetic */}
             <div className="py-3 px-1">
                <span className="text-[8px] tracking-[0.2em] text-white/30">0{index + 1}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="mt-32 flex justify-center">
        <Link to="/" className="group flex flex-col items-center">
            <span className="w-12 h-[1px] bg-white/20 group-hover:w-24 transition-all duration-500 mb-4"></span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 group-hover:text-white transition-colors">Back to Index</span>
        </Link>
      </div>
    </div>
  );
};