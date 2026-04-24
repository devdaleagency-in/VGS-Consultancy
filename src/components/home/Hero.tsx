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



export default function Hero() {
  return (
    <section className="relative w-full pt-20 pb-12 md:pt-24 md:pb-20 bg-white overflow-x-hidden">
      {/* Decorative Atmospheric Layers based on Reference - 50% Melt */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Main Reference Gradient - 50% Height */}
        <div 
          className="absolute top-0 left-0 right-0 h-[40%]" 
          style={{ background: 'linear-gradient(to bottom, #82b1dfff 0%, #89abd5ae 60%, #ffffff 100%)' }} 
        />
        
        {/* Subtle Top Shine */}
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-white/10 blur-[100px]" />

        {/* Dynamic floating blurs for subtle depth */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, 30, 10, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-white/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, -20, 30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] left-[-10%] w-[40%] h-[45%] bg-white/5 blur-[110px] rounded-full"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Center Header */}
        <div className="text-center max-w-5xl mx-auto mb-4">
          
          {/* Professional Logo Integration */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-0"
          >
            <div className="relative w-full max-w-sm h-48 md:max-w-2xl md:h-64 flex items-center justify-center">
              <Image 
                src="/vgs new logo.png" 
                alt="VGS Logo" 
                width={1800} 
                height={1800} 
                quality={100}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-dark leading-[1.1] tracking-tighter mb-8"
          >
            Beyond Boundaries <br />
            <span className="text-primary italic font-accent tracking-tight">Beyond Limits.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-sm mx-auto mb-10"
          >
            <p className="text-[9px] md:text-[8px] text-gray-900 font-black uppercase tracking-[0.4em] leading-relaxed opacity-50">
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
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-24 md:mb-32"
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
                color: 'group-hover:text-blue-700',
                bgColor: 'bg-blue-100/80',
                hoverBg: 'group-hover:bg-blue-200/90',
                accent: 'bg-blue-600'
              },
              {
                name: 'Work Visa',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                color: 'group-hover:text-emerald-700',
                bgColor: 'bg-emerald-100/80',
                hoverBg: 'group-hover:bg-emerald-200/90',
                accent: 'bg-emerald-600'
              },
              {
                name: 'Visit Visa',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: 'group-hover:text-orange-700',
                bgColor: 'bg-orange-100/80',
                hoverBg: 'group-hover:bg-orange-200/90',
                accent: 'bg-orange-600'
              }
            ].map((visa, i) => (
              <Link key={visa.name} href={`/${visa.name.toLowerCase().split(' ')[0]}?type=${visa.name.split(' ')[0]}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative cursor-pointer"
                >
                  <div className={`relative px-8 py-6 ${visa.bgColor} ${visa.hoverBg} rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5 flex items-center gap-6 hover:border-primary/20 transition-all duration-700 overflow-hidden`}>
                    {/* Left Accent Bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-2 ${visa.accent} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />

                    <div className="absolute -right-6 -bottom-6 opacity-[0.04] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-700 text-dark group-hover:rotate-12">
                      {visa.icon}
                    </div>

                    <div className={`w-14 h-14 rounded-[1.25rem] bg-white flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 ${visa.color}`}>
                      {visa.icon}
                    </div>

                    <div className="flex flex-col items-start relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-dark/30 group-hover:text-dark/50 transition-colors duration-500 mb-1">Apply For</span>
                      <span className="text-base md:text-lg font-black text-dark group-hover:translate-x-1 transition-transform duration-500">{visa.name}</span>
                    </div>

                    <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-[-10px] transition-all duration-500 relative z-10">
                      <div className={`w-10 h-10 rounded-full ${visa.accent} flex items-center justify-center text-white shadow-lg`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
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
            className="modern-card-blue rounded-[3rem] p-10 h-[500px] flex flex-col relative overflow-hidden group shadow-modern"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-primary/10">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Top Destination</span>
                <div className="w-6 h-6 rounded-full bg-[#0F172A] flex items-center justify-center p-1 shadow-sm border border-white/10 overflow-hidden">
                  <img src="https://flagcdn.com/w160/gb.png" alt="UK" className="w-full h-full object-contain rounded-sm" />
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-lg border border-primary/5">
                🔔
              </div>
            </div>

            <div className="mt-auto relative z-10">
              <h3 className="text-3xl font-heading font-black text-dark leading-tight mb-4 group-hover:text-primary transition-colors">
                Explore Best <br /> Universities!
              </h3>
              <p className="text-sm font-semibold text-dark/70 mb-8 max-w-[200px]">
                Global mentors dedicated to nurturing your academic potential.
              </p>
            </div>

            {/* Curvy Line Illustration */}
            <svg className="absolute top-1/2 left-0 w-full opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity" viewBox="0 0 400 200" fill="none">
              <path d="M0 100 Q 100 50 200 100 T 400 100" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Card 2: Visa Success (Gold Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="modern-card-gold rounded-[3rem] p-10 h-[500px] flex flex-col relative overflow-hidden shadow-modern group"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="px-4 py-2 bg-white/60 backdrop-blur-md border border-accent-gold/20 rounded-full text-[10px] font-black uppercase text-accent-gold">97% Success</span>
              <div className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-xl border border-accent-gold/10">🛂</div>
            </div>

            <h3 className="text-3xl font-heading font-black text-dark leading-tight mb-4 group-hover:text-accent-gold transition-colors">
              Expert Visa <br /> Assistance
            </h3>

            <div className="mt-6 rounded-[2rem] bg-white/60 backdrop-blur-md p-6 flex-grow relative group-hover:bg-white/80 transition-all border border-accent-gold/10">
              <div className="space-y-4">
                <div className="h-2 w-full bg-accent-gold/20 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "97%" }} className="h-full bg-accent-gold" />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase text-dark/80">
                  <span>Approval Rate</span>
                  <span className="text-accent-gold font-black">High Success</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 rounded-2xl shadow-sm text-center border border-accent-gold/5">
                <p className="text-xs font-black text-dark italic">"Seamless Documentation"</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Success Blueprint (Silver Theme) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="modern-card-silver rounded-[3rem] p-8 md:p-10 h-[500px] flex flex-col relative overflow-hidden shadow-modern group cursor-default"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            {/* Header Area */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg border-2 border-white/50"
              >
                ✓
              </motion.div>
              <div className="flex flex-col items-end">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-[8px] font-black uppercase text-primary tracking-widest mb-1">Elite Success</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1 h-1 rounded-full bg-primary/30" />)}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-grow flex flex-col justify-center relative z-10">
              <h3 className="text-3xl font-heading font-black text-dark leading-tight mb-6">
                Architecting <br /> <span className="text-primary italic font-accent tracking-normal">Your</span> Future.
              </h3>

              <div className="space-y-3">
                {[
                  { label: "Profile Evaluation", value: 94, icon: "📊" },
                  { label: "Visa Success Rate", value: 98, icon: "🛡️" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/50 shadow-sm transition-all duration-500">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-dark/70">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-black text-primary">{item.value}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1.2, delay: 0.6 + (i * 0.2) }}
                        className="h-full bg-primary relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Area */}
            <div className="mt-6 bg-dark rounded-2xl p-5 flex items-center justify-between group-hover:shadow-xl transition-all duration-500 relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-white/40 tracking-widest mb-1">Global Partnership</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">500+ Institutes</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs">
                →
              </div>
            </div>

            {/* Subtle Decorative Seal */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/5 rounded-full border border-primary/10 flex items-center justify-center -rotate-12 pointer-events-none">
              <span className="text-[7px] font-black text-primary/10 uppercase tracking-[0.4em]">Certified</span>
            </div>
          </motion.div>
        </div>



      </div>
    </section>
  );
}
