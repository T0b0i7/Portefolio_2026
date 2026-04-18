import React from 'react';

export const AlternativeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-parchment dark:bg-near-black">
      {/* Subtle organic shapes */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(201, 100, 66, 0.15) 0%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(201, 100, 66, 0.1) 0%, transparent 70%)',
          animation: 'float 25s ease-in-out infinite reverse',
          animationDelay: '-5s'
        }}
      />
      
      {/* Texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Cfilter id='noiseFilter'%3%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3%3C/filter%3%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3%3C/svg%3")`,
        }}
      />
    </div>
  );
};
