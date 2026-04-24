'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface ModernButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
}

export default function ModernButton({ children, className = "", onClick, primary = true }: ModernButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group overflow-hidden px-10 py-5 rounded-2xl font-black text-xl transition-all duration-300 ${
        primary 
          ? 'bg-primary text-white shadow-glow hover:shadow-glow-lg' 
          : 'bg-white text-dark border-2 border-primary/20 hover:border-primary'
      } ${className}`}
    >
      {/* Background fill animation */}
      <motion.div
        className={`absolute inset-0 z-0 ${primary ? 'bg-primary-dark' : 'bg-primary'}`}
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Internal shine effect */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "100%" } : { x: "-100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <span className="relative z-20 flex items-center justify-center gap-3">
        {children}
        <motion.span
          animate={isHovered ? { x: 5, scale: 1.2 } : { x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          →
        </motion.span>
      </span>
      
      {/* Decorative border corners */}
      <motion.div
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/50 z-20"
      />
      <motion.div
        animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/50 z-20"
      />
    </motion.button>
  );
}
