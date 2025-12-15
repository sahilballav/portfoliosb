
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import OfflinePage from './components/OfflinePage';
import ParticlesBackground from './components/ParticlesBackground';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOnlineToast, setShowOnlineToast] = useState(false);

  useEffect(() => {
    // Network Status Listeners
    const handleOnline = () => {
      setIsOnline(true);
      setShowOnlineToast(true);
      setTimeout(() => setShowOnlineToast(false), 4000);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline State Overlay */}
      {!isOnline && <OfflinePage />}

      {/* Back Online Toast Notification */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ease-out pointer-events-none ${showOnlineToast ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}>
         <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Back Online
         </div>
      </div>

      {/* Loading State Overlay */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {/* Custom Cursor - Outside main content to avoid transform conflicts */}
      <CustomCursor />

      {/* Global Animated Particles Background */}
      <ParticlesBackground />

      {/* Main App Content */}
      <div className="min-h-screen text-zinc-900 dark:text-zinc-50 relative transition-colors duration-500 overflow-x-hidden bg-transparent">
        
        {/* Navbar - Fade In Only (To preserve fixed positioning) */}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
           <Navbar />
        </div>
        
        {/* Main Content - Slide Up Animation */}
        <main className={`w-full ${isLoading ? 'opacity-0' : 'animate-slide-up'}`}>
          <Hero />
          <About />
          <Services />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        
        {/* Chat Widget - Fade In Only */}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
           <ChatWidget />
        </div>
        
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </>
  );
};

export default App;
