import React from 'react';
import { CERTIFICATIONS } from '../constants';
import { Reveal } from './Reveal';
import { ExternalLink, Award } from 'lucide-react';

const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 w-full bg-white dark:bg-zinc-950 transition-colors duration-500 border-t border-zinc-100 dark:border-zinc-900">
      <Reveal className="mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tighter uppercase transition-colors duration-500 flex items-center gap-4">
          Credentials <Award className="w-8 h-8 md:w-12 md:h-12 text-zinc-400" />
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.id} delay={index * 0.1} className="h-full">
            <a 
              href={cert.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="block h-full group p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-black hover:border-black dark:hover:bg-zinc-100 dark:hover:border-white transition-all duration-500 cursor-hover relative overflow-hidden"
            >
              {/* Card Header with Logo */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 p-2 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-100 dark:border-zinc-700 flex items-center justify-center group-hover:bg-zinc-800 dark:group-hover:bg-zinc-200 transition-colors duration-500">
                   <img src={cert.imageUrl} alt={cert.issuer} className="w-full h-full object-contain" />
                </div>
                <ExternalLink size={20} className="text-zinc-400 group-hover:text-white dark:group-hover:text-black transition-colors" />
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold leading-tight mb-2 text-zinc-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                  {cert.title}
                </h3>
                <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-400 dark:group-hover:text-zinc-600 transition-colors duration-500 mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-500 transition-colors">
                  Issued {cert.date}
                </p>
              </div>

              {/* Decorative Background Icon */}
              <Award className="absolute -bottom-6 -right-6 w-32 h-32 text-zinc-100 dark:text-zinc-800 group-hover:text-zinc-800 dark:group-hover:text-zinc-300 opacity-0 group-hover:opacity-20 transition-all duration-500 rotate-12" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Certifications;