'use client';

import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

export default function ServiceCard({ icon, title, description, link, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-smoothness springs
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const xPct = (x / width - 0.5) * 15;
    const yPct = (y / height - 0.5) * -15;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: springX,
        rotateX: springY,
        perspective: 1000,
      }}
      className="group relative bg-white rounded-[3.5rem] p-12 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      {/* Liquid-style background spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--x) var(--y), rgba(127,168,71,0.06) 0%, transparent 80%)`
        }}
        onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
        }}
      />

      {/* Floating Animated Icon */}
      <motion.div 
        animate={isHovered ? { y: -10, scale: 1.15 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="relative z-10 mb-10 w-24 h-24 flex items-center justify-center rounded-[2rem] bg-gray-50 group-hover:bg-primary transition-all duration-500 shadow-inner group-hover:shadow-glow-lg"
      >
        <span className="text-5xl relative z-10 filter group-hover:drop-shadow-lg transition-all">
          {icon}
        </span>
        
        {/* Animated aura */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.2 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-white rounded-full blur-xl"
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className="relative z-10 flex-grow">
        <h3 className="text-3xl font-heading font-black text-dark mb-6 group-hover:text-primary transition-colors duration-500 leading-tight">
          {title}
        </h3>
        
        <p className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors duration-500 mb-10 leading-relaxed font-semibold">
          {description}
        </p>

        <Link 
          href={link}
          className="mt-auto inline-flex items-center gap-4 text-xl font-black text-primary group/btn"
        >
          <span className="relative">
            Learn More
            <motion.div 
              className="absolute -bottom-1 left-0 h-[3px] bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={isHovered ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.5 }}
            />
          </span>
          <div className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white group-hover/btn:border-primary transition-all duration-500 shadow-sm">
             <motion.span animate={isHovered ? { x: [0, 5, 0] } : {}} transition={{ repeat: Infinity, duration: 1.5 }}>
               →
             </motion.span>
          </div>
        </Link>
      </div>

      {/* Decorative corner elements */}
      <motion.div 
        animate={isHovered ? { opacity: 0.4, scale: 1 } : { opacity: 0.1, scale: 0.8 }}
        className="absolute top-10 right-10 flex gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
        <div className="w-2 h-2 rounded-full bg-primary-light" />
      </motion.div>
    </motion.div>
  );
}
