import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { X, Sun, Moon } from 'lucide-react';

const ROLES = ["Web Development", "AI/ML Developer", "Flutter Developer"];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Initial Theme Check
  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <>
      <nav className="fixed w-full z-40 top-0 left-0 py-8 px-6 md:px-12 flex justify-between items-center text-black dark:text-zinc-100 pointer-events-none transition-colors duration-500">
        {/* Pointer events auto for interactive elements */}
        
        {/* Animated Roles */}
        <div className="text-sm font-medium tracking-wide w-64 h-8 relative pointer-events-auto flex items-center gap-4">
           {/* Mobile: Hide roles, show logo or name if needed, or keep roles if space permits. Keeping roles for now. */}
           <div className="relative w-full h-full overflow-hidden">
             {ROLES.map((role, index) => (
                <span
                key={role}
                className={`absolute top-0 left-0 transition-all duration-700 ease-in-out whitespace-nowrap ${
                    index === roleIndex
                    ? 'opacity-100 blur-0 translate-y-0'
                    : 'opacity-0 blur-sm translate-y-4'
                }`}
                >
                {role}
                </span>
            ))}
           </div>
        </div>

        <div className="flex items-center gap-6 pointer-events-auto">
            {/* Theme Toggle Button */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-hover"
                aria-label="Toggle Theme"
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Menu Button */}
            <button 
            onClick={() => setIsOpen(true)}
            className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity text-black dark:text-zinc-100 cursor-hover"
            >
            Menu <span className="ml-1 text-lg leading-none align-middle">+</span>
            </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-zinc-900 z-50 flex flex-col items-center justify-center transition-all duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'opacity-100 pointer-events-auto clip-circle-full' : 'opacity-0 pointer-events-none clip-circle-0'
        }`}
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-6 md:right-12 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium cursor-hover"
        >
          Close <X size={20} />
        </button>

        <div className="flex flex-col gap-6 text-center">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-5xl md:text-7xl font-bold text-zinc-400 hover:text-white transition-all duration-500 tracking-tighter cursor-hover transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .clip-circle-0 {
          clip-path: circle(0% at 100% 0);
        }
        .clip-circle-full {
          clip-path: circle(150% at 100% 0);
        }
      `}</style>
    </>
  );
};

export default Navbar;