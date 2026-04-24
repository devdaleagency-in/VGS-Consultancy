'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
  speed?: number;
}

export default function Typewriter({ text, delay = 0, className = "", speed = 0.05 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      let timeout: NodeJS.Timeout;
      let currentIndex = 0;

      const type = () => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, speed * 1000);
        } else {
          // Pause at the end before restarting
          timeout = setTimeout(() => {
            currentIndex = 0;
            type();
          }, 4000); // 4 seconds pause at end
        }
      };

      const startTimeout = setTimeout(type, delay * 1000);
      return () => {
        clearTimeout(startTimeout);
        clearTimeout(timeout);
      };
    }
  }, [isInView, text, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[0.1em] h-[1em] bg-primary ml-1 align-middle"
      />
    </span>
  );
}
