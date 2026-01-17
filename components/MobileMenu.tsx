import React, { useEffect, useRef } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuRef.current) {
      // Manual class manipulation to match the provided CSS transition logic
      // although React state is driving it, the CSS transition on transform handles the visual
      if (isOpen) {
        menuRef.current.classList.add('active');
        menuRef.current.style.transform = 'translateY(0)';
      } else {
        menuRef.current.classList.remove('active');
        menuRef.current.style.transform = 'translateY(-100%)';
      }
    }
  }, [isOpen]);

  const handleLinkClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    onClose();
    if (window.gsap) {
      window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
    }
  };

  return (
    <div 
      ref={menuRef}
      id="mobile-menu" 
      className="fixed inset-0 bg-[#0E0C0B] z-[60] flex flex-col justify-center items-center space-y-8"
      style={{
        transition: 'transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
        transform: 'translateY(-100%)'
      }}
    >
      <a href="#home" onClick={(e) => handleLinkClick('#home', e)} className="text-2xl font-light tracking-[0.3em] italic text-[#EAE2D6]">Index</a>
      <a href="#works" onClick={(e) => handleLinkClick('#works', e)} className="text-2xl font-light tracking-[0.3em] italic text-[#EAE2D6]">Works</a>
      <a href="#philosophy" onClick={(e) => handleLinkClick('#philosophy', e)} className="text-2xl font-light tracking-[0.3em] italic text-[#EAE2D6]">Vision</a>
      <a href="#contact" onClick={(e) => handleLinkClick('#contact', e)} className="text-2xl font-light tracking-[0.3em] italic text-[#EAE2D6]">Contact</a>
      <button 
        onClick={onClose} 
        className="mt-12 text-[10px] tracking-[0.5em] opacity-40 uppercase text-[#EAE2D6] hover:opacity-100 transition"
      >
        Close
      </button>
    </div>
  );
};