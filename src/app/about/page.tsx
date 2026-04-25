'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/data?type=about');
        const json = await res.json();
        setContent(json);
      } catch (err) {
        console.error("Failed to load about data:", err);
      }
    };
    fetchContent();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const { stats, team, accreditations } = content || { stats: [], team: [], accreditations: [] };

  useEffect(() => {
    if (!content) return;
    const ctx = gsap.context(() => {
      // Professional Stagger
      gsap.from('.reveal-item', {
        scrollTrigger: {
          trigger: '.content-wrapper',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden pb-32 selection:bg-primary selection:text-white">
      {!content ? (
        <div className="h-[70vh] flex items-center justify-center font-black text-xs uppercase tracking-widest text-primary animate-pulse">
          Initializing VGS About...
        </div>
      ) : (
        <>
      {/* Professional Hero Section - USA Page Style */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe1?auto=format&fit=crop&q=80&w=2000" 
            alt="VGS Global Academy" 
            fill
            className="object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/10 via-white to-white" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full border border-primary/20 text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-8"
          >
          </motion.div> */}
          
          <h1 className="text-4xl sm:text-6xl md:text-[9vw] font-heading font-black text-dark leading-[0.9] tracking-tighter uppercase">
            Our <span className="text-primary italic font-accent lowercase tracking-normal">Story.</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mt-10 font-medium leading-relaxed">
            Empowering students to transcend boundaries and achieve their global academic aspirations with precision and integrity.
          </p>
        </div>
      </section>

      {/* Legitimacy Stats Section */}
      <section className="relative z-20 -mt-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center text-center group hover:border-primary/30 transition-all duration-500"
            >
              <span className="text-4xl font-heading font-black text-primary mb-2">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Core Mission Section - Logo & Content */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-stretch">
          <div className="flex-1 flex items-center justify-center bg-gray-50/50 rounded-[4rem] border border-black/[0.03] p-20 group">
             <div className="relative w-full aspect-square max-w-[400px] group-hover:scale-105 transition-transform duration-700">
                <Image 
                  src="/logo3.png" 
                  alt="VGS Global Logo" 
                  fill
                  className="object-contain grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
             </div>
          </div>
          <div className="flex-1 flex flex-col justify-center py-10">
             <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Our Commitment</span>
             <h2 className="text-4xl md:text-6xl font-heading font-black text-dark tracking-tighter leading-tight mb-8">Guided by <span className="text-primary italic font-accent tracking-normal">Integrity.</span></h2>
             <p className="text-dark/50 text-lg font-medium leading-relaxed mb-10">
                At VGS Global, we don't just process applications; we architect careers. Our mission is to provide every student with the most transparent and effective pathway to their global academic dreams.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                   <h4 className="font-black text-dark text-sm uppercase mb-2">Transparent Process</h4>
                   <p className="text-xs text-dark/40 font-medium">Full visibility into every step of your application journey.</p>
                </div>
                <div>
                   <h4 className="font-black text-dark text-sm uppercase mb-2">Direct Partnerships</h4>
                   <p className="text-xs text-dark/40 font-medium">Ensuring your profile reaches the right admission officers directly.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Leadership - Real & Modern */}
      <section className="content-wrapper py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h2 className="text-5xl md:text-7xl font-heading font-black text-dark tracking-tighter leading-none mb-8">Meet Our <br /> Leadership.</h2>
              <p className="text-dark/50 font-medium text-lg leading-relaxed">Dedicated professionals committed to standardizing excellence in international education.</p>
            </motion.div>
            <div className="h-[1px] flex-grow bg-black/5 mx-10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group"
                whileHover={{ y: -10 }}
              >
                <div className="relative aspect-[4/5] rounded-[3.5rem] bg-gray-50 border border-black/[0.03] overflow-hidden mb-8 shadow-sm group-hover:shadow-3xl transition-all duration-700">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100 p-16">
                     <Image src={member.image} alt={member.name} width={400} height={500} className="object-contain" />
                  </div>
                  <div className="absolute top-8 right-8">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {member.experience} EXP
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-dark/90 to-transparent translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-white/60 mb-8 font-medium text-sm md:text-lg">Get personalized advice from our global experts.</p>
                    <p className="text-white/60 text-xs font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity">
                      "{member.bio}"
                    </p>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-dark mb-1">{member.name}</h3>
                <p className="text-primary font-bold text-[11px] uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 md:py-32 px-6 bg-dark rounded-[2.5rem] md:rounded-[4rem] mx-4 md:mx-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="text-[20vw] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase italic">Global</div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight mb-6 md:mb-8">Our Global <br /> Network.</h2>
            <p className="text-white/50 text-base md:text-lg font-medium leading-relaxed mb-10 md:mb-12">We maintain direct partnerships with over 50+ top-tier institutions across the most sought-after study destinations.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {["United Kingdom", "United States", "Canada", "Ireland", "Germany", "France", "New Zealand", "Australia"].map((country: string, i: number) => (
                <div key={i} className="flex items-center gap-3 py-1 border-b border-white/5 sm:border-none">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent-gold shrink-0" />
                   <span className="font-bold text-white/70 text-sm md:text-base">{country}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square sm:aspect-video lg:aspect-auto h-[300px] md:h-[400px] bg-white/5 rounded-[2rem] md:rounded-[3rem] border border-white/10 flex flex-col items-center justify-center text-center p-8 md:p-10 group">
             <div className="text-6xl md:text-7xl font-heading font-black text-accent-gold mb-4 group-hover:scale-110 transition-transform">97%</div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/40">Visa Approval Success</p>
             <div className="mt-8 md:mt-12 w-full max-w-xs h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "98%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-accent-gold" 
                />
             </div>
          </div>
        </div>
      </section>

      {/* Final Legit CTA */}
      <section className="py-40 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-heading font-black text-dark tracking-tighter leading-none mb-10">
            Let's build your <br /> <span className="text-primary italic font-accent tracking-normal">Global Future.</span>
          </h2>
          <Link 
            href="/contact?type=Student" 
            className="inline-flex items-center gap-6 bg-primary text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-dark transition-all group shadow-2xl"
          >
            Book Expert Session 🚀
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all">
              →
            </div>
          </Link>
        </div>
      </section>

        </>
      )}
    </div>
  );
}
