
import React, { useEffect, useRef } from 'react';
import { HERO_DATA } from '../constants';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Reveal } from './Reveal';

const Hero: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetWidth = 60;
    let currentWidth = 0;
    let isActive = false;
    let animationFrameId: number;

    // Initial entrance animation for the separator line
    const timer = setTimeout(() => {
      if (boxRef.current) {
        boxRef.current.style.transition = 'width 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
        boxRef.current.style.width = '60px';
        // Initialize currentWidth to match the starting state after entrance
        currentWidth = 60;
      }
    }, 500);

    // Animation Loop for Smooth Lerp
    const animate = () => {
      if (isActive && boxRef.current) {
        // Linear Interpolation (Lerp): Move current towards target by 10% each frame
        // This creates a very smooth, weighted feeling
        currentWidth += (targetWidth - currentWidth) * 0.1;
        boxRef.current.style.width = `${currentWidth}px`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Once user scrolls past threshold, disable CSS transition and take over with JS
      if (scrollY > 5) {
        if (!isActive && boxRef.current) {
            isActive = true;
            boxRef.current.style.transition = 'none';
        }
        // Update target width based on scroll position
        targetWidth = 60 + (scrollY * 0.8);
      } else {
        // If back at top, reset target
        targetWidth = 60;
      }
    };

    window.addEventListener('scroll', handleScroll);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timer);
    };
  }, []);

  const taglineWords = HERO_DATA.tagline.split(' ');

  // Helper for staggered letter animation
  const renderLetters = (text: string, delayOffset: number = 0) => {
    return text.split('').map((char, index) => (
        <span 
            key={index}
            className="inline-block animate-reveal-mask origin-bottom"
            style={{ animationDelay: `${delayOffset + index * 0.06}s` }}
        >
            {char}
        </span>
    ));
  };

  return (
    <section className="min-h-screen relative flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 overflow-hidden">
      
      {/* Middle Content */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl z-10 relative">
         {/* Staggered Word Reveal */}
         <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-100 uppercase max-w-4xl transition-colors duration-500 flex flex-wrap gap-x-3 lg:gap-x-4 gap-y-1">
           {taglineWords.map((word, i) => (
             <Reveal key={i} delay={i * 0.04} className="inline-block">
               {word}
             </Reveal>
           ))}
         </h1>
         
         <div className="flex items-center gap-6 mt-12">
           <Reveal delay={0.6}>
             <a 
               href="#projects" 
               className="bg-black text-white dark:bg-zinc-100 dark:text-black px-8 py-4 rounded-sm text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-300 inline-block cursor-hover"
             >
               View works
             </a>
           </Reveal>
           <Reveal delay={0.8}>
             <a 
               href="#" 
               className="flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-300 font-medium group hover:opacity-70 transition-opacity cursor-hover"
             >
               Read my writing 
               <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
             </a>
           </Reveal>
         </div>
      </div>

      {/* Bottom Giant Text */}
      <div className="relative mt-20 z-10">
        {/* Staggered Text Reveal */}
        <div className="text-[13vw] md:text-[13vw] leading-[0.8] font-bold tracking-tighter text-black dark:text-white flex flex-wrap items-center select-none whitespace-nowrap overflow-hidden transition-colors duration-500">
           
           {/* SAHIL - Staggered Letters */}
           <div className="reveal-container flex">
             {renderLetters("SAHIL", 0.1)}
           </div>
           
           {/* Single Line Dynamic Box */}
           <div 
             ref={boxRef}
             className="relative mx-[2vw] h-[0.15em] bg-black dark:bg-white"
             style={{ width: '0px' }} // Start width at 0 for entrance animation
           ></div>

           {/* BALLAV - Staggered Letters */}
           <div className="reveal-container flex">
             {renderLetters("BALLAV", 0.4)}
           </div>
        </div>
        
        <Reveal delay={1.2} className="flex justify-between items-end mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-4 transition-colors duration-500">
           <div className="text-xs md:text-sm font-medium text-zinc-500 dark:text-zinc-400">
             <p>Creative developer</p>
             <p className="flex items-center gap-1 mt-1 text-zinc-400 dark:text-zinc-500">
               <MapPin size={12}/> {HERO_DATA.location}
             </p>
           </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
