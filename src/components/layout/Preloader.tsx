'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const loadingPhrases = [
  "Beyond Boundaries",
  "Global Success",
  "Future Beginnings",
  "Academic Excellence",
  "VGS Global"
];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Only show preloader once per session
    const hasLoaded = sessionStorage.getItem('vgs_loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('vgs_loaded', 'true');
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 40);

    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Staggered Curtain Panels */}
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                exit={{ 
                  y: "-100%",
                  transition: { 
                    duration: 1, 
                    ease: [0.76, 0, 0.24, 1],
                    delay: i * 0.1 
                  }
                }}
                className="flex-1 bg-dark h-full border-r border-white/5 last:border-r-0 pointer-events-auto"
              />
            ))}
          </div>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* Logo Reveal */}
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ 
                y: -40, 
                opacity: 0,
                transition: { duration: 0.5, ease: "easeIn" }
              }}
              className="relative mb-12"
            >
               <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center p-3 shadow-glow-primary overflow-hidden">
                  <Image 
                    src="/logo3.png" 
                    alt="VGS Logo" 
                    width={100} 
                    height={100} 
                    className="object-contain scale-110"
                    priority
                  />
               </div>
               {/* Orbital Ring */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className="absolute -inset-4 border border-dashed border-primary/20 rounded-full"
               />
            </motion.div>

            {/* Progress Container */}
            <div className="relative h-24 md:h-32 overflow-hidden flex flex-col items-center">
              <motion.div
                initial={{ y: 0 }}
                exit={{ y: -100, opacity: 0 }}
                className="flex items-baseline gap-2"
              >
                <span className="text-7xl md:text-9xl font-heading font-black text-white tabular-nums tracking-tighter">
                  {progress}
                </span>
                <span className="text-2xl md:text-3xl font-black text-primary uppercase tracking-widest">%</span>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-white font-black uppercase tracking-[0.6em] text-[10px] md:text-xs text-center"
                >
                  {loadingPhrases[phraseIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Bottom Sleek Line */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-white/10 overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-primary"
               />
            </div>
          </div>
          
          {/* Subtle Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
