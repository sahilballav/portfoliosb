import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Disable scrolling during loading
    document.body.style.overflow = 'hidden';

    const duration = 2500; // Total loading time in ms
    const start = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic bezier ease-out approximation for smooth counter
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      
      const currentCount = Math.floor(easeOutQuart(progress) * 100);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation finished
        setExit(true);
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = '';
        }, 800); // Wait for the slide-up animation (matches transition duration)
      }
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col justify-between p-6 md:p-12 transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exit ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
        {/* Top Header */}
        <div className="flex justify-between items-start opacity-50 text-xs md:text-sm font-mono uppercase tracking-widest">
            <span>Portfolio 2024</span>
            <span>Sahil Ballav</span>
        </div>

        {/* Center/Big Counter */}
        <div className="flex-1 flex items-center justify-center">
             <div className="relative overflow-hidden">
                <span className="text-[20vw] md:text-[15vw] font-bold leading-none tracking-tighter tabular-nums select-none">
                    {count}%
                </span>
             </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex justify-between items-end opacity-50 text-xs md:text-sm font-mono uppercase tracking-widest">
            <span>Loading Experience</span>
            <div className="flex gap-1.5 items-end">
                <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${count > 20 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${count > 40 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${count > 60 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${count > 80 ? 'opacity-100' : 'opacity-20'}`}></div>
                <div className={`w-2 h-2 bg-white rounded-full transition-opacity duration-300 ${count >= 100 ? 'opacity-100' : 'opacity-20'}`}></div>
            </div>
        </div>
    </div>
  );
};

export default Preloader;