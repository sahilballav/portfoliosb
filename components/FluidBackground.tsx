
import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden transition-colors duration-500 bg-white dark:bg-black">
      
      {/* 
        Advanced Liquid Distortion Filter 
        combines Gaussian Blur, Turbulence (Noise), and Displacement to create a swirling, 
        marbled ink effect similar to the reference image.
      */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-swirl" colorInterpolationFilters="sRGB">
            {/* 1. Blur the shapes to merge them */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
            
            {/* 2. Generate fractal noise for the "swirl" texture */}
            <feTurbulence type="fractalNoise" baseFrequency="0.002" numOctaves="2" result="turbulence" />
            
            {/* 3. Distort the blurred shapes using the noise */}
            <feDisplacementMap in="blur" in2="turbulence" scale="150" xChannelSelector="R" yChannelSelector="G" result="displacement" />
            
            {/* 4. High contrast threshold to sharpen edges and create the "liquid" definition */}
            <feColorMatrix 
              in="displacement" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" 
              result="goo" 
            />
            
            {/* 5. Composite back if needed, but 'goo' is our result */}
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* 
        Animated Blob Layer with Filter Applied
        Added 'will-change-transform' to hint browser for GPU optimization
      */}
      <div 
        className="absolute inset-0 w-full h-full opacity-60 dark:opacity-50"
        style={{ filter: 'url(#liquid-swirl)' }}
      >
        {/* Blob 1: Top Left */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-zinc-300 dark:bg-zinc-700 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob opacity-80 will-change-transform"></div>
        
        {/* Blob 2: Bottom Right */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-zinc-400 dark:bg-zinc-600 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000 opacity-80 will-change-transform"></div>
        
        {/* Blob 3: Center Left */}
        <div className="absolute top-[30%] left-[-20%] w-[50vw] h-[50vw] bg-zinc-200 dark:bg-zinc-800 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000 opacity-80 will-change-transform"></div>
        
        {/* Blob 4: Center Right */}
        <div className="absolute top-[10%] right-[-20%] w-[40vw] h-[40vw] bg-zinc-300 dark:bg-zinc-700 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-5000 opacity-80 will-change-transform"></div>

        {/* Blob 5: Bottom Center */}
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-zinc-200 dark:bg-zinc-800 rounded-full mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-6000 opacity-80 will-change-transform"></div>
      </div>

      {/* Grain/Noise Overlay for texture fidelity */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
};

export default FluidBackground;
