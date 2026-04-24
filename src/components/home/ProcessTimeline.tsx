'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from '@/components/ui/TextReveal';

const steps = [
  {
    title: "Free Consultation",
    desc: "In-depth profile evaluation to understand your goals, aspirations, and academic potential.",
    icon: "🤝",
    color: "from-primary/20 to-transparent"
  },
  {
    title: "Selection Strategy",
    desc: "Creating a bespoke list of universities matching your profile, budget, and career landscape.",
    icon: "🎓",
    color: "from-accent-blue/20 to-transparent"
  },
  {
    title: "Application Support",
    desc: "Elevating your profile through expert SOP editing and meticulous document organization.",
    icon: "📝",
    color: "from-accent-gold/20 to-transparent"
  },
  {
    title: "Admissions",
    desc: "Nurturing your journey to secure elite offers and celebrating your global milestones.",
    icon: "🎉",
    color: "from-primary-light/20 to-transparent"
  },
  {
    title: "Visa Processing",
    desc: "A rigorous 98% success rate approach to documentation and strategic interview coaching.",
    icon: "🛂",
    color: "from-accent-coral/20 to-transparent"
  },
  {
    title: "Final Departure",
    desc: "Essential pre-flight orientations for high-confidence transitions into international life.",
    icon: "✈️",
    color: "from-primary/20 to-transparent"
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-accent-blue rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full border border-primary/20 text-primary font-black text-xs uppercase tracking-[0.3em] mb-6"
          >
            The Success Blueprint
          </motion.div>
          <div className="text-4xl md:text-6xl font-heading font-black text-dark">
            <TextReveal text="Our Comprehensive" className="justify-center" />
            <TextReveal text="Framework" className="justify-center text-primary italic font-accent" delay={0.2} />
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Animated Progress Line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gray-100 overflow-hidden">
            <motion.div 
              style={{ scaleY: scrollProgress }}
              className="w-full h-full bg-gradient-to-b from-primary via-primary-light to-accent-gold origin-top"
            />
          </div>

          <div className="space-y-40">
            {steps.map((step, i) => (
              <TimelineItem key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ step, index }: { step: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="relative"
    >
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Step Card */}
        <div className={`flex-1 w-full pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
          <div className="group p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <span className="text-4xl md:text-5xl mb-6 md:mb-8 inline-block animate-bounce-gentle">
                {step.icon}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading font-black text-dark mb-4 md:mb-6 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
            
            {/* Background Number */}
            <span className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 text-[8rem] md:text-[12rem] font-black text-gray-50 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity select-none pointer-events-none">
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Center Indicator */}
        <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 top-0 md:top-1/2 md:-translate-y-1/2">
          <motion.div 
            whileInView={{ scale: [0, 1.2, 1] }}
            viewport={{ once: true }}
            className="w-10 h-10 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary font-black shadow-lg relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            {index + 1}
          </motion.div>
        </div>

        {/* Empty space for alternating layout */}
        <div className="flex-1 hidden md:block" />
      </div>
    </motion.div>
  );
}
