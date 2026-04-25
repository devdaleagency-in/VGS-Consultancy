'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import VisaContactForm from './VisaContactForm';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface VisaPageProps {
  title: string;
  fullName: string;
  banner: string;
  description: string;
  stats: { label: string; value: string }[];
  features: string[];
  process: { step: string; title: string; desc: string }[];
  children?: React.ReactNode;
}

export default function VisaPageLayout({ title, fullName, banner, description, stats, features, process, children }: VisaPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden pb-0 font-montserrat">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={banner} 
            alt={title} 
            className="w-full h-full object-cover grayscale opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/70 to-white" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-2 rounded-full border border-primary/30 text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-10 backdrop-blur-md"
          >
            Specialized Visa Service
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[12vw] font-heading font-black text-dark leading-none tracking-tighter uppercase"
          >
            {title.split(' ')[0]}<span className="text-primary italic font-accent">{title.split(' ')[1] || ''}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mt-10 font-medium leading-relaxed"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section relative z-20 -mt-24 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center text-center group hover:bg-primary transition-all duration-700"
            >
              <span className="text-3xl md:text-4xl font-heading font-black text-primary group-hover:text-white transition-colors mb-2 md:mb-3">
                {stat.value}
              </span>
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60 transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Full Width */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto space-y-32">
          
          {/* Why VGS & Features */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-heading font-black text-dark mb-12 tracking-tighter">Why Choose VGS for <br/> your {title}?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-left">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 md:gap-6 p-6 md:p-8 bg-gray-50/50 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 hover:border-primary/30 transition-all group hover:bg-white hover:shadow-2xl">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                       ✓
                    </div>
                    <span className="font-black text-dark text-lg md:text-xl">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {children}
          </div>

        </div>
      </section>

      {/* New Footer Contact Section */}
      <section id="contact-form" className="py-32 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            
            {/* Company Information */}
            <div className="space-y-16">
              <div>
                <img src="/vgs new logo.png" alt="VGS Logo" className="h-24 md:h-32 object-contain mb-10" />
                <h2 className="text-4xl md:text-5xl font-heading font-black text-dark mb-8 leading-tight">
                  Your Global Future <br/> Starts <span className="text-primary italic font-accent">Here.</span>
                </h2>
                <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-lg">
                  VGS Global is dedicated to providing world-class guidance for students and professionals looking to expand their horizons. Our expertise ensures your journey is smooth and successful.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Contact Details</h4>
                  <div className="space-y-4">
                    <p className="text-lg font-bold text-dark">+91 80968 32850</p>
                    <p className="text-lg font-bold text-dark">info@vgsglobal.in</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Location</h4>
                  <p className="text-lg font-bold text-dark">
                    123 Business Avenue, <br/>
                    Suite 456, Global City
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                {['FB', 'IG', 'LI', 'TW'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center font-black text-xs text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
                    {social}
                  </div>
                ))}
              </div>
            </div>

            {/* The Form */}
            <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-gray-100">
              <VisaContactForm visaType={title} />
            </div>

          </div>
        </div>
      </section>

      {/* Sticky Quick Action */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 pointer-events-none"
      >
        <button 
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="pointer-events-auto flex items-center gap-3 md:gap-4 bg-dark text-white px-5 py-3 md:px-8 md:py-5 rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-white/10 hover:bg-primary transition-all group"
        >
          <span className="font-heading font-black text-[8px] md:text-[9px] tracking-[0.4em] uppercase whitespace-nowrap">Apply Now</span>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all">
            <span className="text-lg md:text-xl">→</span>
          </div>
        </button>
      </motion.div>
    </div>
  );
}
