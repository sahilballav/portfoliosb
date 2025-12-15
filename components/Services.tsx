
import React from 'react';
import { Reveal } from './Reveal';

const EXPERTISE = [
  "Creative Development",
  "Interaction Development",
  "Design Engineering"
];

const SERVICES = [
  "Web Development",
  "Web Design",
  "E-Commerce",
  "Web3"
];

const HOBBIES = [
  "Sports",
  "Anime",
  "Parade",
  "Music"
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 w-full transition-colors duration-500">
      <Reveal className="mb-20">
        <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white tracking-tighter uppercase mb-4">
          What I Do
        </h2>
      </Reveal>

      {/* 01 EXPERTISE */}
      <div className="border-t-[3px] border-black dark:border-zinc-800 py-16 md:py-24 transition-colors duration-500">
        <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
                <Reveal>
                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400 tracking-widest uppercase block mb-2">[01] — Expertise</span>
                </Reveal>
            </div>
            <div className="md:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {EXPERTISE.map((item, i) => (
                        <Reveal key={item} delay={i * 0.1}>
                            <h3 className="text-3xl md:text-4xl font-bold uppercase leading-[1.1] tracking-tight max-w-[10ch] text-zinc-900 dark:text-zinc-100">
                                {item.split(' ').map((word, wIndex) => (
                                    <span key={wIndex} className="block">{word}</span>
                                ))}
                            </h3>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* 02 SERVICES */}
      <div className="border-t-[3px] border-black dark:border-zinc-800 py-16 md:py-24 transition-colors duration-500">
        <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
                <Reveal>
                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400 tracking-widest uppercase block mb-2">[02] — Services</span>
                </Reveal>
            </div>
            <div className="md:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                    {SERVICES.map((item, i) => (
                        <Reveal key={item} delay={i * 0.1}>
                            <h3 className="text-lg md:text-xl font-bold uppercase leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                                {item}
                            </h3>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* 03 INTERESTS */}
      <div className="border-t-[3px] border-black dark:border-zinc-800 border-b-[3px] py-16 md:py-24 transition-colors duration-500">
        <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-3">
                <Reveal>
                    <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400 tracking-widest uppercase block mb-2">[03] — Interests & Hobbies</span>
                </Reveal>
            </div>
            <div className="md:col-span-9">
                <div className="flex flex-wrap gap-6">
                    {HOBBIES.map((item, i) => (
                        <Reveal key={item} delay={i * 0.1}>
                            <div className="px-10 py-5 border-[2px] border-black dark:border-zinc-700 text-sm font-bold uppercase tracking-widest text-black dark:text-zinc-200 hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-black transition-all duration-300 cursor-hover hover:-translate-y-1 shadow-none hover:shadow-lg">
                                {item}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
      </div>

    </section>
  );
};

export default Services;
