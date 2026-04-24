'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50, suffix: "+", label: "Students Placed", sub: "Globally Recognized" },
  { value: 15, suffix: "+", label: "Countries", sub: "Wide Destination Network" },
  { value: 98, suffix: "%", label: "Visa Success", sub: "Unmatched Accuracy" },
  { value: 5, suffix: "L+", label: "Avg Scholarship", sub: "Financial Empowerment" },
  { value: 50, suffix: "+", label: "Partner Universities", sub: "Direct Institutional Links" },
  { value: 6, suffix: "+", label: "Years Experience", sub: "Legacy of Trust" }
];

function Counter({ value, suffix, duration = 2 }: { value: number, suffix: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeOutExpo * value));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Stats() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-40 bg-[#050505] relative overflow-hidden">
      {/* Blending Shaders */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-white/10 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-white/10 to-transparent z-10 pointer-events-none" />

      {/* Cinematic Background Elements */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </motion.div>

      <motion.div 
        style={{ y: yContent, opacity }}
        className="max-w-[1400px] mx-auto px-6 relative z-10"
      >
        <div className="mb-24 max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block"
          >
            The VGS Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-[0.9]"
          >
            Numbers That <br /> <span className="text-primary italic font-accent capitalize tracking-normal">Define</span> Our Legacy.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[240px]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group rounded-[2.5rem] p-10 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-primary/30 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute -inset-20 bg-primary/0 group-hover:bg-primary/5 rounded-full blur-[80px] transition-all duration-1000" />
              
              <div className="relative z-10">
                <div className="text-5xl md:text-7xl font-heading font-black text-white mb-2 tracking-tighter group-hover:text-primary transition-colors">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="w-12 h-1 bg-primary/20 group-hover:w-full transition-all duration-700" />
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-1">{stat.label}</h3>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.sub}</p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-white/5 rounded-tr-xl group-hover:border-primary/40 group-hover:w-12 group-hover:h-12 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
