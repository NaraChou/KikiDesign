import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 pt-10 text-center relative">
      <div className="mb-8">
        <span 
          id="hero-tag" 
          className="serif-italic text-[10px] md:text-xs text-red-500/80 opacity-0 block tracking-[0.5em] uppercase"
        >
          Aesthetic Sensitivity
        </span>
      </div>
      
      <h1 
        id="hero-title" 
        className="text-4xl md:text-7xl opacity-0 chinese-art leading-tight mb-12"
      >
        感性之眼<br/><span className="font-normal opacity-90">專業之筆</span>
      </h1>

      <div 
        id="hero-line" 
        className="h-[1px] w-0 bg-red-500/30 mb-12"
      ></div>

      <p 
        id="hero-desc" 
        className="text-[rgba(234,226,214,0.5)] text-[11px] md:text-xs max-w-[280px] md:max-w-sm mx-auto leading-loose opacity-0 tracking-[0.2em] font-light"
      >
        探索視覺深處的詩意與純粹。<br/>將瞬息萬變的感官，轉化為永恆的視覺語法。
      </p>
    </section>
  );
};