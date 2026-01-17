import React from 'react';

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      <div 
        className="fixed w-[80vw] h-[80vw] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--tang-pink) 0%, transparent 70%)',
          top: '-20%',
          left: '-10%'
        }}
      />
      <div 
        className="fixed w-[80vw] h-[80vw] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--tang-pink) 0%, transparent 70%)',
          bottom: '-20%',
          right: '-10%'
        }}
      />
    </>
  );
};