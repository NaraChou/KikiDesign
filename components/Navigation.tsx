import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

interface NavigationProps {
  onToggleMenu: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onToggleMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isHome) {
      if (window.gsap) {
        window.gsap.to(window, { duration: 1.5, scrollTo: id, ease: "power4.inOut" });
      }
    } else {
      // If not home, navigate home then scroll (simple implementation: just nav home)
      // For precise scroll after nav, we would need context/state, but for now simple nav is sufficient UX
      navigate('/');
      setTimeout(() => {
         if (window.gsap) {
            window.gsap.to(window, { duration: 0, scrollTo: id });
         }
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full px-6 py-6 md:px-16 md:py-10 flex justify-between items-center z-50 mix-blend-difference text-[#EAE2D6]">
      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-[18px] h-[18px] border border-red-500/50 relative rotate-45">
            <div className="absolute w-1 h-1 bg-[#E63946] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="text-sm md:text-base tracking-[0.5em] font-light chinese-art uppercase">棠想視界</div>
      </div>
      
      {/* Desktop Links */}
      <div className="hidden md:flex space-x-12 text-[9px] tracking-[0.4em]">
        <a href="#home" onClick={(e) => handleNavClick('#home', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">01 / Index</a>
        <a href="#works" onClick={(e) => handleNavClick('#works', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">02 / Works</a>
        <a href="#philosophy" onClick={(e) => handleNavClick('#philosophy', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">03 / Vision</a>
        <a href="#contact" onClick={(e) => handleNavClick('#contact', e)} className="text-[rgba(234,226,214,0.8)] hover:text-white transition italic">04 / Contact</a>
      </div>

      {/* Mobile Toggle */}
      <button 
        id="menu-toggle" 
        className="md:hidden flex flex-col space-y-1.5 p-2 cursor-pointer"
        onClick={onToggleMenu}
      >
        <div className="w-6 h-[1px] bg-white/80"></div>
        <div className="w-4 h-[1px] bg-white/80 ml-auto"></div>
      </button>
    </nav>
  );
};