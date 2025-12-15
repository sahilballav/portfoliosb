
import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';

const Projects: React.FC = () => {
  // Default to the first project being open
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleProjectClick = (id: string, index: number) => {
    if (activeId === id) return;
    
    setActiveId(id);

    // Scroll the clicked project into view
    // We use a small timeout to allow React to render the new layout (collapsed/expanded states)
    // before calculating the scroll position.
    setTimeout(() => {
      const element = projectRefs.current[index];
      if (element) {
        // Calculate position: element top + current scroll - offset for navbar
        const y = element.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="projects" className="py-24 w-full">
      {/* Header */}
      <Reveal className="text-center mb-16 px-6">
        <h2 className="text-6xl md:text-9xl font-bold text-zinc-900 dark:text-white tracking-tighter uppercase transition-colors duration-500">
          Selected Works
        </h2>
      </Reveal>

      {/* List Container */}
      <div className="border-t-[3px] border-black dark:border-zinc-800 transition-colors duration-500">
        {PROJECTS.filter(p => p.featured).map((project, index) => {
          const isActive = activeId === project.id;
          const listNumber = index + 1;

          return (
            <Reveal key={project.id} delay={index * 0.1} className="w-full">
              <div 
                ref={el => { projectRefs.current[index] = el; }}
                className={`border-b-[3px] border-black dark:border-zinc-800 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'bg-white dark:bg-zinc-950' : 'bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-hover cursor-pointer group'}`}
                onClick={() => handleProjectClick(project.id, index)}
              >
                <div className="w-full max-w-[1920px] mx-auto">
                  
                  {isActive ? (
                    /* EXPANDED STATE */
                    <div className="flex flex-col lg:flex-row min-h-[500px] animate-fade-in">
                      
                      {/* Image Area (Left) - Reduced width to 45% */}
                      <div className="lg:w-[45%] border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black dark:border-zinc-800 p-6 md:p-10 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center overflow-hidden transition-colors duration-500">
                         <div className="w-full h-full max-h-[400px] lg:max-h-full rounded-lg overflow-hidden shadow-2xl relative group-image">
                            {project.imageUrl ? (
                              <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-400 font-mono uppercase bg-zinc-200 dark:bg-zinc-800">
                                No Preview
                              </div>
                            )}
                         </div>
                      </div>

                      {/* Content Area (Right) - Increased width to 55% */}
                      <div className="lg:w-[55%] p-6 md:p-12 flex flex-col justify-between relative">
                        <div className="absolute top-6 right-6 text-xl font-bold text-zinc-900 dark:text-zinc-100">{listNumber}.</div>
                        
                        <div className="mt-8">
                          <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9] text-zinc-900 dark:text-white">
                            {project.title}
                          </h3>
                          
                          <p className="text-lg md:text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 font-medium mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {project.description}
                          </p>

                          <div className="mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-4">Stack</span>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map(tech => (
                                <span key={tech} className="px-4 py-2 border-[1.5px] border-black dark:border-zinc-700 text-xs font-bold uppercase bg-white dark:bg-zinc-900 text-black dark:text-zinc-200 hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-colors cursor-hover">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Status / Buttons */}
                        <div className="mt-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
                           <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest block mb-4">Status</span>
                           <div className="flex flex-wrap gap-4">
                              {project.liveUrl && (
                                <a 
                                  href={project.liveUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-8 py-3 border-[1.5px] border-blue-600 text-blue-600 dark:text-blue-400 font-bold uppercase hover:bg-blue-600 hover:text-white transition-all text-sm tracking-wide cursor-hover"
                                >
                                  Watch Demo
                                </a>
                              )}
                              {project.repoUrl && (
                                <a 
                                  href={project.repoUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="px-8 py-3 border-[1.5px] border-black dark:border-zinc-700 text-black dark:text-zinc-200 font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all text-sm tracking-wide flex items-center gap-2 cursor-hover"
                                >
                                  Code <ArrowUpRight size={14} />
                                </a>
                              )}
                           </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED STATE */
                    <div className="flex items-center justify-between p-6 md:p-8 relative overflow-hidden h-32 md:h-40">
                      <div className="text-xl font-bold z-10 text-zinc-900 dark:text-zinc-100">
                        {listNumber}.
                      </div>
                      <div className="text-2xl md:text-4xl font-bold uppercase tracking-tighter text-right transition-all duration-500 transform group-hover:-translate-x-4 z-10 text-zinc-900 dark:text-zinc-100">
                        {project.title}
                      </div>
                      
                      {/* Hover Arrow Effect */}
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 text-black dark:text-white">
                        <ArrowUpRight size={32} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;