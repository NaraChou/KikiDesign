import React from 'react';

export const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-40 md:py-64 px-8 bg-[#0A0908]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-3xl leading-[2.2] font-extralight tracking-[0.15em] text-white/80 italic">
          「設計不只是為了解決問題，更是一種溫度的傳遞。<br className="hidden md:block" />
          我們在混亂中尋找秩序，在空白中賦予生命。」
        </p>
      </div>
    </section>
  );
};