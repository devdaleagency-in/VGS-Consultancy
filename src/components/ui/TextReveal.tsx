'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.word-inner');
    
    gsap.set(chars, { y: '100%', opacity: 0 });

    gsap.to(chars, {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: 0.05,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.1em] py-[0.15em] pr-[0.15em] pl-[0.05em] -my-[0.15em]">
          <span className="word-inner inline-block transform">
            {word}
          </span>
        </span>
      ))}
    </div>
  );
}
