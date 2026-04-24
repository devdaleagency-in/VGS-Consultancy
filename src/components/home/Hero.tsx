'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import MagneticButton from '@/components/ui/MagneticButton';
import TextReveal from '@/components/ui/TextReveal';
import Typewriter from '@/components/ui/Typewriter';

const Globe = dynamic(() => import('./Globe'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-blue-500/10 animate-pulse rounded-full" />
});

const logos = [
  "UNIVERSITY OF OXFORD", "HARVARD", "UCLA", "TORONTO", "CAMBRIDGE", "MIT", "STANFORD", "YALE"
];

export default function Hero() {
  return (
    <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-40 grid-bg overflow-x-hidden">
      {/* Background Gradient Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[60px] md:blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-100/30 blur-[60px] md:blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Center Header */}
        <div className="text-center max-w-5xl mx-auto mb-20">
          
          {/* Professional Logo Integration */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-10"
          >
            <div className="relative group cursor-default">
              {/* Pulsing Ambient Glow */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-16 bg-primary/20 rounded-full blur-[60px]"
              />
              
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-32 h-32 md:w-52 md:h-52 flex items-center justify-center transition-all duration-700 group-hover:scale-110"
              >
                <div className="relative overflow-hidden rounded-full p-2">
                  <Image 
                    src="/logo3.png" 
                    alt="VGS Logo" 
                    width={300} 
                    height={300} 
                    quality={100}
                    className="object-contain drop-shadow-[0_15px_35px_rgba(0,51,102,0.25)]"
                    priority
                  />
                  {/* Subtle Shine Animation */}
                  <motion.div 
                    animate={{ x: ['-250%', '250%'] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] pointer-events-none z-10"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-dark leading-[1.1] tracking-tighter mb-8"
          >
            Beyond Boundaries <br />
            <span className="text-primary italic font-accent lowercase tracking-tight">Beyond Limits.</span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-sm mx-auto mb-10"
          >
            <p className="text-[7px] md:text-[8px] text-gray-400 font-black uppercase tracking-[0.4em] leading-relaxed opacity-50">
              <Typewriter 
                text="Empowering students with personalized guidance and smart admission strategies for the world's most prestigious universities."
                delay={1.5}
                speed={0.02}
              />
            </p>
          </motion.div>

          {/* Modern Visa Type Navigator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { 
                name: 'Study Visa', 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                ),
                color: 'group-hover:text-blue-600'
              },
              { 
                name: 'Work Visa', 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'group-hover:text-emerald-600'
              },
              { 
                name: 'Visit Visa', 
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'group-hover:text-orange-600'
              }
            ].map((visa, i) => (
              <Link key={visa.name} href={`/${visa.name.toLowerCase().split(' ')[0]}?type=${visa.name.split(' ')[0]}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative cursor-pointer"
                >
                  {/* Glow Background */}
                  <div className="absolute -inset-2 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative px-8 py-5 bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-black/[0.03] flex items-center gap-5 hover:border-primary/30 transition-all duration-500 overflow-hidden">
                    {/* Subtle Background Icon */}
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-150 transition-all duration-700 text-dark">
                      {visa.icon}
                    </div>

                    <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary/10 transition-all duration-500 ${visa.color}`}>
                      {visa.icon}
                    </div>

                    <div className="flex flex-col items-start">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-dark/30 group-hover:text-primary transition-colors duration-500">Apply For</span>
                      <span className="text-sm md:text-base font-black text-dark group-hover:translate-x-1 transition-transform duration-500">{visa.name}</span>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="ml-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px] transition-all duration-500">
                      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Feature Cards from Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 md:mb-24">
          
          {/* Card 1: Destinations (Blue Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="modern-card-green rounded-[3rem] p-10 h-[500px] flex flex-col relative overflow-hidden group shadow-modern border border-black/5"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-black/5">
                <span className="text-xs font-black uppercase tracking-widest text-dark">Top Destination</span>
                <span className="text-sm">🇬🇧</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center text-lg">
                🔔
              </div>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-3xl font-heading font-black text-dark leading-tight mb-4">
                Explore Best <br /> Universities!
              </h3>
              <p className="text-sm font-semibold text-dark/70 mb-8 max-w-[200px]">
                Global mentors dedicated to nurturing your academic potential.
              </p>
            </div>

            {/* Curvy Line Illustration */}
            <svg className="absolute top-1/2 left-0 w-full opacity-30 pointer-events-none" viewBox="0 0 400 200" fill="none">
              <path d="M0 100 Q 100 50 200 100 T 400 100" stroke="white" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Card 2: Visa Success (Gold Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="modern-card-peach rounded-[3rem] p-10 h-[500px] flex flex-col relative overflow-hidden shadow-modern border border-black/5 group"
          >
            <div className="flex justify-between items-center mb-6">
               <span className="px-4 py-2 bg-white/30 rounded-full text-[10px] font-black uppercase">98% Success</span>
               <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-xl">🛂</div>
            </div>

            <h3 className="text-3xl font-heading font-black text-dark leading-tight mb-4">
              Expert Visa <br /> Assistance
            </h3>
            
            <div className="mt-6 rounded-[2rem] bg-white/20 p-6 flex-grow relative group-hover:bg-white/30 transition-all">
                <div className="space-y-4">
                   <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: "98%" }} className="h-full bg-dark" />
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase text-dark/60">
                      <span>Approval Rate</span>
                      <span>High Success</span>
                   </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 rounded-2xl shadow-sm text-center">
                   <p className="text-xs font-black text-dark italic">"Seamless Documentation"</p>
                </div>
            </div>
          </motion.div>

          {/* Card 3: Academy/Scholarship (Silver Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="modern-card-purple rounded-[3rem] p-10 h-[500px] flex flex-col relative overflow-hidden shadow-modern border border-black/5 group"
          >
            <div className="flex justify-between items-center mb-10">
               <button className="w-12 h-12 rounded-full bg-accent-gold text-dark text-xl font-bold transition-transform group-hover:rotate-90">+</button>
               <button className="px-6 py-3 bg-white/50 backdrop-blur-md rounded-full text-xs font-black uppercase border border-black/5">Scholarship Aid</button>
            </div>

            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 mt-auto group-hover:bg-white/60 transition-all duration-500">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-black text-dark">Smart Admission</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs">💎</div>
               </div>
               <div className="grid grid-cols-2 gap-2">
                  {["Scholarships", "Grants", "Funding", "Bursaries"].map((word, i) => (
                    <div key={i} className="px-4 py-2 bg-white/80 rounded-xl text-[10px] font-black text-dark uppercase flex items-center justify-center -rotate-2 group-hover:rotate-0 transition-transform">
                      {word}
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>

        {/* Global Clients Marquee */}
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-10">
            Trusted by 500+ Students Worldwide
          </p>
          <div className="logo-marquee opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="logo-marquee-content">
              {logos.map((logo, i) => (
                <div key={i} className="text-2xl font-heading font-black whitespace-nowrap px-8">
                  {logo}
                </div>
              ))}
            </div>
            <div className="logo-marquee-content" aria-hidden="true">
              {logos.map((logo, i) => (
                <div key={i} className="text-2xl font-heading font-black whitespace-nowrap px-8">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
