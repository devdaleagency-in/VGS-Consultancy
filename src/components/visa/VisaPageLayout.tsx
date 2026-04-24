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
}

export default function VisaPageLayout({ title, fullName, banner, description, stats, features, process }: VisaPageProps) {
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
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden pb-24 font-montserrat">
      
      {/* Hero Section - Matching USA Page */}
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

      {/* Stats Section - Matching USA Page */}
      <section className="stats-section relative z-20 -mt-24 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card bg-white p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center text-center group hover:bg-primary transition-all duration-700"
            >
              <span className="text-4xl font-heading font-black text-primary group-hover:text-white transition-colors mb-3">
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60 transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Split - Matching USA Page */}
      <section className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Why VGS & Features */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-heading font-black text-dark mb-10 tracking-tight">Why Choose VGS for your {title}?</h2>
              <div className="space-y-5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-gray-50/50 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                       ✓
                    </div>
                    <span className="font-bold text-dark text-lg">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Application Mini CTA */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="p-12 bg-dark rounded-[4rem] text-white relative overflow-hidden group shadow-2xl"
            >
               <div className="relative z-10">
                 <h3 className="text-3xl font-heading font-black mb-4 italic">Ready to Apply?</h3>
                 <p className="text-white/50 mb-10 font-medium text-lg leading-relaxed">Our specialized {title} consultants are standing by to guide you.</p>
                 <button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-5 bg-primary px-10 py-5 rounded-2xl font-black hover:bg-white hover:text-dark transition-all shadow-xl"
                 >
                    Apply Now →
                 </button>
               </div>
               <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -mr-40 -mt-40 group-hover:bg-primary/20 transition-all" />
            </motion.div>
          </div>

          {/* Process Timeline */}
          <div className="space-y-10" id="contact-form">
            <h2 className="text-5xl font-heading font-black text-dark mb-12 tracking-tight">The Journey.</h2>
            <div className="grid grid-cols-1 gap-6">
              {process.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all group"
                >
                  <div className="flex gap-8 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl font-black text-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-dark mb-2">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-16">
              <VisaContactForm visaType={title} />
            </div>
          </div>

        </div>
      </section>

      {/* Sticky Quick Action - Matching USA Page */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      >
        <button 
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="pointer-events-auto flex items-center gap-4 bg-dark text-white px-10 py-6 rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-white/10 hover:bg-primary transition-all group"
        >
          <span className="font-heading font-black text-[10px] tracking-[0.4em] uppercase">Start Your {title} Application</span>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all">
            <span className="text-2xl">→</span>
          </div>
        </button>
      </motion.div>
    </div>
  );
}
