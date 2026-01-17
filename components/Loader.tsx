import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div id="loader" className="fixed inset-0 bg-[#0E0C0B] z-[100] flex justify-center items-center">
      <div className="text-center">
        <div className="w-16 h-[1px] bg-white/10 relative overflow-hidden mx-auto">
          <div 
            id="loader-progress" 
            className="absolute top-0 left-0 h-full w-full bg-red-500 -translate-x-full"
          ></div>
        </div>
        <p className="mt-6 text-[8px] tracking-[0.8em] opacity-30 uppercase">KiKi Design</p>
      </div>
    </div>
  );
};