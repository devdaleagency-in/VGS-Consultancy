'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
  image?: string;
}

export default function ServiceCard({ icon, title, description, link, index, image }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-performance springs for the magnetic feel
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHovered || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate magnetic pull and shine position
    const xPct = (x / width - 0.5) * 15;
    const yPct = (y / height - 0.5) * -15;
    
    mouseX.set(xPct);
    mouseY.set(yPct);

    // Update custom properties for reactive shine
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <Link href={link} className="block h-full group/service">
      <div 
        className="relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          viewport={{ once: true }}
          style={{
            rotateY: isHovered ? springX : 0,
            rotateX: isHovered ? springY : 0,
            perspective: isHovered ? 1000 : 'none',
            transformStyle: isHovered ? 'preserve-3d' : 'flat',
          }}
          className="relative h-full bg-linear-to-b from-white to-blue-50 rounded-[3.5rem] p-10 border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden flex flex-col transform-gpu will-change-transform backface-hidden isolation-auto group-hover/service:border-primary/40"
        >
        {/* Decorative Inner Glow */}
        <div className="absolute inset-0 z-0 bg-radial-[circle_at_50%_0%] from-primary/5 via-transparent to-transparent opacity-100 pointer-events-none" />
        
        {/* Subtle Idle Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: `radial-gradient(var(--color-primary) 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
        />

        {/* Reactive Border Glow */}
        <div 
          className="absolute inset-0 z-0 opacity-0 group-hover/service:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(37,99,235,0.08), transparent 80%)`
          }}
        />

        {/* Magnetic Shine Sweep */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={isHovered ? {
              x: ['-100%', '200%'],
              y: ['-100%', '200%'],
            } : { x: '-100%', y: '-100%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -rotate-45"
          />
        </div>

        {/* Background Image on Hover with Parallax (Glitch-Free) */}
        {image && (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 1.2 }}
              animate={isHovered ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.7 }}
              style={{ 
                x: springX, 
                y: springY,
                backgroundImage: `url(${image})`
              }}
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0 z-0 bg-dark/70 backdrop-blur-[2px] pointer-events-none" 
            />
          </>
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Simplified Icon Container */}
          <div className="relative mb-8 w-16 h-16">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover/service:opacity-100 transition-all duration-700" />
            <motion.div 
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-2xl bg-white flex items-center justify-center border border-gray-100 shadow-sm group-hover/service:bg-primary group-hover/service:border-primary transition-all duration-500 group-hover/service:shadow-primary/20"
            >
              <div className="text-primary group-hover/service:text-white transition-colors duration-500 scale-110">
                {icon}
              </div>
            </motion.div>
            
            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-dark text-white text-[10px] font-black flex items-center justify-center shadow-lg opacity-0 group-hover/service:opacity-100 transition-all duration-500 translate-y-2 group-hover/service:translate-y-0">
               {index + 1}
            </div>
          </div>

          {/* Typography with Content Lift */}
          <motion.div 
            animate={isHovered ? { y: -10 } : { y: 0 }}
            className="flex-grow space-y-4"
          >
            <h3 className={`text-2xl md:text-3xl font-heading font-black transition-colors duration-500 leading-tight tracking-tight ${isHovered ? 'text-white' : 'text-dark'}`}>
              {title}
            </h3>
            <p className={`font-medium leading-relaxed transition-colors duration-500 ${isHovered ? 'text-white/80' : 'text-gray-600'}`}>
              {description}
            </p>
          </motion.div>

          {/* Action Footer */}
          <motion.div 
            animate={isHovered ? { y: -5 } : { y: 0 }}
            className={`mt-10 pt-8 border-t flex items-center justify-between transition-colors duration-500 ${isHovered ? 'border-white/10' : 'border-gray-200/50'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${isHovered ? 'text-white/40' : 'text-dark/30'}`}>Expert Guidance</span>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${isHovered ? 'bg-primary text-white scale-110 shadow-primary/30' : 'bg-dark text-white'}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`w-1 h-1 rounded-full transition-all duration-500 ${isHovered ? 'bg-primary' : 'bg-primary/10'}`} style={{ transitionDelay: `${i * 100}ms` }} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </Link>
  );
}
