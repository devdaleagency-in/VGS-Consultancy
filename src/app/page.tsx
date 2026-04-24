'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import { motion, useScroll, useSpring } from 'framer-motion';

// Lazy load heavy sections
const Destinations = dynamic(() => import('@/components/home/Destinations'), { ssr: true });
const Stats = dynamic(() => import('@/components/home/Stats'), { ssr: true });
const ProcessTimeline = dynamic(() => import('@/components/home/ProcessTimeline'), { ssr: true });
const CTA = dynamic(() => import('@/components/home/CTA'), { ssr: true });

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      <Hero />
      <Services />
      <Destinations />
      <Stats />
      <ProcessTimeline />

      <CTA />
    </>
  );
}
