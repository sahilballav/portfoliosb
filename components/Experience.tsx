
import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../constants';
import { X, MapPin, Sparkles, Pin } from 'lucide-react';
import { Reveal } from './Reveal';

// Custom hook for intersection observer
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, isVisible };
};

const ExperienceCard: React.FC<{ exp: typeof EXPERIENCE[0]; index: number }> = ({ exp, index }) => {
  const isEven = index % 2 === 0;
  const { ref, isVisible } = useOnScreen({ threshold: 0.2 });
  const [videoError, setVideoError] = useState(false);

  return (
    <div 
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-center gap-12 md:gap-24 group perspective-1000`}
    >
      {/* Visual Card Section (Video/Image) */}
      <div 
        className={`relative w-full md:w-[320px] lg:w-[380px] aspect-[9/16] md:aspect-[3/4] flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible 
            ? `opacity-100 translate-y-0 ${isEven ? 'md:-rotate-3' : 'md:rotate-3'}` 
            : 'opacity-0 translate-y-20 rotate-0'
        }`}
      >
        {/* Photo/Video Frame */}
        <div className="w-full h-full rounded-2xl border-[4px] border-black overflow-hidden shadow-2xl relative bg-black">
           {exp.videoUrl && !videoError ? (
             <video 
                src={exp.videoUrl} 
                poster={exp.imageUrl}
                autoPlay 
                muted 
                loop 
                playsInline
                onError={() => setVideoError(true)}
                className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
                  isVisible ? 'scale-125 blur-0' : 'scale-110 blur-sm'
                } group-hover:scale-105 transition-transform duration-700`}
             />
           ) : (
             <img 
               src={exp.imageUrl} 
               alt={exp.company} 
               className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
                  isVisible ? 'scale-100 blur-0' : 'scale-110 blur-sm'
               } group-hover:scale-105 transition-transform duration-700`}
             />
           )}
           
           {/* Top Badge */}
           <div className={`absolute top-4 right-4 flex items-center gap-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="bg-black/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/10">
                <Pin size={12} className="fill-white" /> Pinned
              </div>
           </div>

           {/* Icons Overlay */}
           <div className={`absolute top-4 left-4 flex gap-2 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="bg-black/50 p-1.5 rounded-full text-white backdrop-blur-sm">
                <Sparkles size={12} />
              </div>
           </div>

           {/* Location Label Bottom */}
           <div className={`absolute bottom-6 left-6 text-white z-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
             <p className="text-xs font-bold uppercase tracking-wider drop-shadow-md flex items-center gap-1">
                <MapPin size={12} className="fill-white/50" />
                {exp.location || 'Location'}
             </p>
           </div>
           
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Text Card Section */}
      <div className={`w-full md:w-[450px] lg:w-[500px] relative z-10 transition-all duration-1000 delay-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}>
        <div className="bg-[#111] text-white p-8 md:p-10 rounded-2xl shadow-2xl border border-zinc-800 relative hover:-translate-y-2 transition-transform duration-300">
          {/* Close Button Style Decoration */}
          <div className={`absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black border-4 border-[#f9f9f9] dark:border-zinc-900 shadow-lg cursor-pointer hover:rotate-90 transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}>
            <X size={20} />
          </div>

          <div className="flex flex-col gap-6">
             <div>
               <h3 className={`text-3xl font-bold leading-tight mb-2 transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 {exp.role}
               </h3>
               <div className={`flex flex-wrap items-center gap-3 transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <span className="px-3 py-1 bg-zinc-800 rounded-md text-xs font-mono text-zinc-300 border border-zinc-700">
                   {exp.company}
                 </span>
                 <span className="px-3 py-1 bg-zinc-800 rounded-md text-xs font-mono text-zinc-300 border border-zinc-700">
                   {exp.period}
                 </span>
               </div>
             </div>

             <div className="space-y-3">
                {exp.description.map((line, i) => (
                  <p key={i} className={`text-zinc-400 text-sm leading-relaxed transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${500 + (i * 100)}ms` }}>
                    {line}
                  </p>
                ))}
             </div>

             <div className={`pt-4 border-t border-zinc-800 transition-all duration-700 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map(skill => (
                    <span key={skill} className="text-xs font-medium text-white bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
             </div>
          </div>
          
          {/* Triangle Indicator (Speech Bubble effect) */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#111] transform border-l border-b border-zinc-800 hidden md:block transition-all duration-700 delay-500 ease-back-out ${
             isEven ? '-left-2' : '-right-2 border-l-0 border-b-0 border-r border-t'
          } ${isVisible ? 'scale-100 rotate-45' : 'scale-0 rotate-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 w-full overflow-hidden transition-colors duration-500">
      <Reveal className="mb-24 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter uppercase transition-colors duration-500">
          Career Journey
        </h2>
      </Reveal>

      <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-32 relative">
        {EXPERIENCE.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} />
        ))}

        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-zinc-200 dark:bg-zinc-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-zinc-300 dark:bg-zinc-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -z-10 animate-blob animation-delay-2000"></div>
      </div>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .ease-back-out {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </section>
  );
};

export default Experience;