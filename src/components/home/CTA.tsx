'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import TextReveal from '@/components/ui/TextReveal';
import ModernButton from '@/components/ui/ModernButton';
import Typewriter from '@/components/ui/Typewriter';

export default function CTA() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <section
      ref={containerRef}
      className="py-40 relative overflow-hidden bg-white"
    >
      {/* High-End Modern Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-30" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] bg-primary/10 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-[#FF4D00]/5 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
        <motion.div
          style={{ scale, opacity, y }}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 rounded-full border border-primary/20 text-primary font-black text-xs uppercase tracking-[0.4em] mb-12 bg-white/50 backdrop-blur-md relative z-20"
          >
            Start Your Future Now
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-dark leading-[1.1] tracking-tighter mb-16 relative z-10">
            <span className="block mb-4">Ready to Begin Your</span>
            <span className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap">
              <span className="text-primary italic font-accent">Global</span>
              <span>Journey?</span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-500 font-bold mb-16 max-w-3xl mx-auto leading-relaxed relative z-10"
          >
            <Typewriter 
              text="Join 500+ successful students who unlocked their potential with India's premium educational consultancy. Your dream university is waiting."
              delay={0.8}
              speed={0.03}
            />
          </motion.p>

          <div className="flex flex-wrap justify-center gap-8 items-center">
            <MagneticButton>
              <ModernButton onClick={() => window.location.href = '/contact'} className="!px-16 !py-8 !text-2xl">
                Book Consultation
              </ModernButton>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="tel:+918096832850"
                className="group flex items-center gap-6 text-2xl font-black text-dark hover:text-primary transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest text-left">Quick Call</p>
                  <p>+91 80968 32850</p>
                </div>
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-10 pointer-events-none hidden xl:block">
          <svg className="w-64 h-64 fill-primary" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.1" fill="none" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-0 translate-x-1/2 opacity-10 pointer-events-none hidden xl:block">
          <div className="w-96 h-96 border border-dark rounded-full animate-spin-slow" />
        </div>
      </div>
    </section>
  );
}
