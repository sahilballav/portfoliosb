
import React from 'react';
import { HERO_DATA } from '../constants';
import { Reveal } from './Reveal';

const TECH_STACK = [
  { name: 'Flutter & Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Keras', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg' },
  { name: 'Computer Vision', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
  { name: 'NLP', logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="relative">
           <div className="aspect-[3/4] overflow-hidden rounded-sm bg-zinc-200 dark:bg-zinc-800">
             <img 
               src={HERO_DATA.avatarUrl} 
               alt={HERO_DATA.name} 
               className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
             />
           </div>
           <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border border-zinc-200 dark:border-zinc-800 rounded-sm transition-colors duration-500"></div>
        </div>

        <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed transition-colors duration-500">
          <Reveal>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">About Me</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              Hello! I'm <span className="font-bold text-black dark:text-white">{HERO_DATA.name}</span>. I am a B.Tech student specializing in Information Technology with a deep focus on AI, Machine Learning, and Mobile Development.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              I bridge the gap between complex algorithms and seamless mobile user experiences. Currently studying at KIIT (Class of 2027), I enjoy turning raw data into intelligent decisions through code.
            </p>
          </Reveal>
          
          <div className="pt-8">
            <Reveal delay={0.3}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Core Tech</h3>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono text-zinc-600 dark:text-zinc-400">
              {TECH_STACK.map((tech, index) => (
                <Reveal key={tech.name} delay={0.4 + (index * 0.1)}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-lg p-1.5 border border-zinc-200 dark:border-zinc-700 shadow-sm shrink-0 transition-colors duration-500">
                      <img src={tech.logo} alt={tech.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-medium">{tech.name}</span>
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

export default About;
