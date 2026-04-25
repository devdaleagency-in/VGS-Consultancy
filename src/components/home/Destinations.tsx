'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import TextReveal from '@/components/ui/TextReveal';

const destinations = [
  {
    name: "United Kingdom",
    code: "gb",
    stats: "150+ Universities",
    visa: "98% Success",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/uk",
    tag: "High ROI"
  },
  {
    name: "United States",
    code: "us",
    stats: "200+ Universities",
    visa: "95% Success",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/usa",
    tag: "Tech Hub"
  },
  {
    name: "Canada",
    code: "ca",
    stats: "100+ Colleges",
    visa: "94% Success",
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/canada",
    tag: "PR Priority"
  },
  {
    name: "Australia",
    code: "au",
    stats: "40+ Universities",
    visa: "96% Success",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/australia",
    tag: "Student Life"
  },
  {
    name: "Germany",
    code: "de",
    stats: "80+ Universities",
    visa: "97% Success",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/germany",
    tag: "Tuition Free"
  },
  {
    name: "France",
    code: "fr",
    stats: "70+ Institutions",
    visa: "93% Success",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/france",
    tag: "Tech Leader"
  },
  {
    name: "New Zealand",
    code: "nz",
    stats: "8 Universities",
    visa: "95% Success",
    image: "https://images.unsplash.com/photo-1589330273594-fade1ee91647?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/newzealand",
    tag: "Global Safety"
  },
  {
    name: "Ireland",
    code: "ie",
    stats: "30+ Institutions",
    visa: "96% Success",
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800",
    href: "/destinations/ireland",
    tag: "English Hub"
  }
];

export default function Destinations() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="py-32 bg-white overflow-hidden relative">
      {/* Background Parallax Text - Larger and Smoother */}
      <motion.div 
        style={{ x }}
        className="hidden md:block absolute top-10 whitespace-nowrap text-[25rem] font-black text-gray-100/50 select-none pointer-events-none z-0"
      >
        ADMISSIONS GLOBAL SUCCESS VGS
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-black text-xs tracking-[0.3em] uppercase mb-8"
            >
              Academic Destinations
            </motion.div>
            <div className="text-6xl md:text-8xl font-heading font-black text-dark mb-8 tracking-tight">
              <TextReveal text="Where Will Your" />
              <TextReveal text="Journey Begin?" className="text-primary italic font-accent" delay={0.2} />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <p className="text-xl text-gray-400 font-bold max-w-sm leading-relaxed">
              Tailored guidance for the world's most sought-after education systems.
            </p>
            <Link 
              href="/destinations"
              className="inline-flex items-center gap-4 text-dark font-black group text-lg"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dark flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
              Explore All
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {destinations.map((country, i) => (
            <CountryCard key={i} country={country} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CountryCard({ country, index }: { country: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    mouseX.set(x * 20); // 20px max movement
    mouseY.set(y * 20);
  };

  const showContent = isHovered || isMobile;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="group relative h-[500px] md:h-[650px] rounded-[3rem] md:rounded-[4rem] overflow-hidden cursor-pointer shadow-modern hover:shadow-2xl transition-all duration-700 border border-gray-100"
    >
      {/* Parallax Image Content */}
      <motion.div 
        style={{ x: springX, y: springY, scale: 1.15 }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={country.image} 
          alt={country.name}
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-1000 ${showContent ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
        />
      </motion.div>
      
      {/* Luxury Layering & Overlays */}
      <div className={`absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent transition-opacity duration-700 ${showContent ? 'opacity-90' : 'opacity-80 group-hover:opacity-70'}`} />
      
      {/* Animated Border Frame */}
      <motion.div 
        animate={showContent ? { opacity: 0.4, inset: "1.5rem" } : { opacity: 0.15, inset: "2.5rem" }}
        className="absolute border border-white rounded-[2.5rem] md:rounded-[3rem] pointer-events-none transition-all duration-700" 
      />

      {/* Floating Header Info */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10 flex items-center gap-3">
          <motion.div 
            animate={showContent ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0F172A] flex items-center justify-center p-2.5 shadow-2xl border border-white/10 relative z-10 overflow-hidden"
          >
             <img 
               src={`https://flagcdn.com/w160/${country.code}.png`} 
               alt={country.name}
               className="w-full h-full object-contain rounded-sm scale-110" 
             />
          </motion.div>
         <div className="flex flex-col">
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Destination</span>
            <span className="text-white font-black text-xs md:text-sm">{country.tag}</span>
         </div>
      </div>

      {/* Reveal Info Content */}
      <div className="absolute inset-x-6 bottom-8 md:inset-x-10 md:bottom-10">
        <motion.h3 
          animate={showContent ? { y: isMobile ? -130 : -160, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-3xl md:text-5xl font-heading font-black text-white mb-6 md:mb-8 origin-left"
        >
          {country.name}
        </motion.h3>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-4 md:space-y-6"
        >
           <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div className="space-y-1">
                 <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-light">Partnership</p>
                 <p className="text-lg md:text-xl font-black text-white">{country.stats.split(' ')[0]}</p>
              </div>
              <div className="space-y-1 text-right">
                 <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-primary-light">Success</p>
                 <p className="text-lg md:text-xl font-black text-white">{country.visa.split(' ')[0]}</p>
              </div>
           </div>

           <Link 
              href={`${country.href}?type=Student`}
              className="group/btn relative w-full h-14 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center gap-3 overflow-hidden"
           >
              <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-dark font-black group-hover/btn:text-white transition-colors text-sm md:text-base">
                Explore Programs
              </span>
              <span className="relative z-10 text-dark group-hover/btn:text-white transition-colors">→</span>
           </Link>
        </motion.div>
      </div>

      {/* Glossy Reflection Card Reveal */}
      <motion.div 
         animate={showContent ? { x: "100%", opacity: 0.4 } : { x: "-100%", opacity: 0 }}
         transition={{ duration: 1, ease: "easeInOut" }}
         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
      />
    </motion.div>
  );
}
