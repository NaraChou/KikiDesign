import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-24 md:py-48 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-16 md:mb-0">
          <h3 className="text-3xl md:text-5xl serif-italic italic mb-6">Create with Soul.</h3>
          <p className="text-[9px] tracking-[0.5em] text-[rgba(234,226,214,0.5)] uppercase">Available for collaborations 2026</p>
        </div>
        <div className="flex flex-col items-center md:items-end space-y-8">
          <a href="mailto:exloe574@gmail.com" className="text-sm tracking-[0.2em] border-b border-white/10 pb-2 hover:text-white transition">exloe574@gmail.com</a>
          <div className="flex space-x-8 text-[8px] tracking-[0.5em] text-[rgba(234,226,214,0.5)]">
            <a href="#" className="hover:text-white transition uppercase">Facebook</a>
            <a href="#" className="hover:text-white transition uppercase">LINE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};