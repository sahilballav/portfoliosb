
import React from 'react';
import { WifiOff, RefreshCcw, Check } from 'lucide-react';

const OfflinePage: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-white flex flex-col items-center justify-center p-6 text-center animate-fade-in transition-colors duration-500">
      <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-8 animate-pulse border border-zinc-300 dark:border-zinc-800">
        <WifiOff size={36} className="text-zinc-500 dark:text-zinc-500" />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tighter uppercase">No Internet Connection</h2>
      
      <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8 text-base md:text-lg leading-relaxed">
        We can't seem to reach the server. Please check your connection to continue browsing the portfolio.
      </p>

      {/* Troubleshooting Checklist */}
      <div className="text-left bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 mb-10 shadow-sm max-w-sm w-full">
         <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Troubleshooting</h3>
         <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
               <div className="mt-0.5 min-w-[16px]"><Check size={14} className="text-green-500" /></div>
               Check your Wi-Fi or data connection.
            </li>
            <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
               <div className="mt-0.5 min-w-[16px]"><Check size={14} className="text-green-500" /></div>
               Ensure airplane mode is off.
            </li>
            <li className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
               <div className="mt-0.5 min-w-[16px]"><Check size={14} className="text-green-500" /></div>
               Check if your router is powered on.
            </li>
         </ul>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        className="group flex items-center gap-3 px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest rounded-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-hover"
      >
        <RefreshCcw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
        Retry Connection
      </button>
    </div>
  );
};

export default OfflinePage;
