
import React, { useState } from 'react';
import { SOCIALS } from '../constants';
import { Github, Linkedin, Twitter, Mail, MessageCircle, Send, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { sendContactEmail, ContactFormData } from '../services/contactService';

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  mail: <Mail size={20} />,
  whatsapp: <MessageCircle size={20} />,
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Extract Social Links
  const whatsappLink = SOCIALS.find(s => s.name === 'WhatsApp')?.url || '#';
  const linkedinLink = SOCIALS.find(s => s.name === 'LinkedIn')?.url || '#';
  const emailLink = SOCIALS.find(s => s.name === 'Email')?.url || '#';
  const githubLink = SOCIALS.find(s => s.name === 'GitHub')?.url || '#';
  const twitterLink = SOCIALS.find(s => s.name === 'Twitter')?.url || '#';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    try {
      const response = await sendContactEmail(formData);
      if (response.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Filter out socials that are already displayed as main cards
  const footerSocials = SOCIALS.filter(s => 
    !['WhatsApp', 'LinkedIn', 'Email', 'GitHub', 'Twitter'].includes(s.name)
  );

  return (
    <section id="contact" className="py-24 px-6 md:px-12 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400 tracking-widest uppercase block mb-6">Let's Connect</span>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Info & Socials */}
          <div className="flex flex-col justify-between">
            <div>
              <Reveal delay={0.1}>
                <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase mb-8 leading-[0.9]">
                  Get In <br /> Touch.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 max-w-md">
                  Have a project in mind or want to discuss the latest in AI? I'm always open to new opportunities and interesting conversations.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col gap-4 mb-12">
                   {/* LinkedIn */}
                   <a 
                     href={linkedinLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-blue-600 dark:hover:border-blue-500 transition-colors cursor-hover w-full md:w-80"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md text-blue-600 dark:text-blue-400">
                           <Linkedin size={24} />
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">LinkedIn</span>
                      </div>
                      <ArrowRight size={18} className="text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                   </a>

                   {/* GitHub */}
                   <a 
                     href={githubLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-black dark:hover:border-zinc-100 transition-colors cursor-hover w-full md:w-80"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md text-zinc-900 dark:text-zinc-100">
                           <Github size={24} />
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">GitHub</span>
                      </div>
                      <ArrowRight size={18} className="text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                   </a>

                   {/* X / Twitter */}
                   <a 
                     href={twitterLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-black dark:hover:border-zinc-100 transition-colors cursor-hover w-full md:w-80"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-black dark:bg-zinc-800 rounded-md text-white dark:text-zinc-100">
                           <Twitter size={24} />
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">X / Twitter</span>
                      </div>
                      <ArrowRight size={18} className="text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                   </a>

                   {/* WhatsApp */}
                   <a 
                     href={whatsappLink} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-green-600 dark:hover:border-green-500 transition-colors cursor-hover w-full md:w-80"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-md text-green-600 dark:text-green-400">
                           <MessageCircle size={24} />
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">WhatsApp</span>
                      </div>
                      <ArrowRight size={18} className="text-zinc-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                   </a>

                   {/* Email */}
                   <a 
                     href={emailLink} 
                     className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm hover:border-red-600 dark:hover:border-red-500 transition-colors cursor-hover w-full md:w-80"
                   >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-md text-red-600 dark:text-red-400">
                           <Mail size={24} />
                        </div>
                        <span className="font-bold text-zinc-900 dark:text-white">Email Me</span>
                      </div>
                      <ArrowRight size={18} className="text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                   </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4}>
              {footerSocials.length > 0 && (
                <div className="flex flex-wrap gap-6">
                   {footerSocials.map(social => (
                     <a 
                      key={social.name} 
                      href={social.url} 
                      className="text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full cursor-hover hover:scale-110"
                     >
                       {iconMap[social.icon]}
                     </a>
                   ))}
                </div>
              )}
              <p className="mt-8 text-zinc-400 text-xs font-mono">
                &copy; {new Date().getFullYear()} Sahil Ballav. All rights reserved.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Contact Form */}
          <Reveal delay={0.2} className="relative">
             <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative">
                {isSuccess ? (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-zinc-900 animate-fade-in text-center p-8">
                     <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={32} />
                     </div>
                     <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
                     <p className="text-zinc-500 dark:text-zinc-400">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                     <button 
                       onClick={() => setIsSuccess(false)}
                       className="mt-8 text-sm font-bold underline decoration-2 underline-offset-4 hover:text-black dark:hover:text-white transition-colors cursor-hover"
                     >
                        Send another message
                     </button>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className={`space-y-8 ${isSuccess ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg focus:border-black dark:focus:border-white focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg focus:border-black dark:focus:border-white focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className="w-full bg-transparent border-b border-zinc-300 dark:border-zinc-700 py-3 text-lg focus:border-black dark:focus:border-white focus:outline-none transition-colors placeholder:text-zinc-300 dark:placeholder:text-zinc-700 resize-none text-zinc-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-hover mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
             </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Contact;
