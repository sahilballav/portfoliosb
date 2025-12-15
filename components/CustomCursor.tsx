
import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      if (dotRef.current) {
        // Instant movement for the dot
        // Using translate3d forces GPU acceleration
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      
      if (outlineRef.current) {
        // Smooth follow for the outline using Web Animations API
        // cubic-bezier(0.16, 1, 0.3, 1) provides a very smooth, "weighted" feel
        outlineRef.current.animate({
          transform: `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
        }, { 
          duration: 800, 
          fill: "forwards", 
          easing: "cubic-bezier(0.16, 1, 0.3, 1)" 
        });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block will-change-transform" />
      <div ref={outlineRef} className="cursor-outline hidden md:block will-change-transform" />
    </>
  );
};

export default CustomCursor;
