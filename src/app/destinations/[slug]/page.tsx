'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import ContactForm from '@/components/visa/ContactForm';

export default function DestinationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [allData, setAllData] = useState<any>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/data?type=destinations');
        const json = await res.json();
        setAllData(json);
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    };
    fetchData();
  }, []);

  const data = allData?.[slug] || allData?.uk;

  return (
    <main ref={containerRef} className="min-h-screen bg-white overflow-hidden pb-24 font-montserrat">
      {!allData ? (
        <div className="h-[70vh] flex items-center justify-center font-black text-xs uppercase tracking-widest text-primary animate-pulse">
          Loading {slug?.toUpperCase()} Data...
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ y }}
              className="absolute inset-0 z-0"
            >
              <img
                src={data.banner}
                alt={data.name}
                loading="lazy"
                className="w-full h-full object-cover grayscale opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/70 to-white" />
            </motion.div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block px-5 py-2 rounded-full border border-primary/30 text-primary font-black text-[10px] md:text-sm tracking-[0.4em] uppercase mb-6 md:mb-8 backdrop-blur-md"
              >
                Global Destination
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-5xl md:text-[10vw] font-heading font-black text-dark leading-none tracking-tighter uppercase"
              >
                {data.name.split(' ')[0]}<span className="text-primary italic font-accent">{data.name.split(' ')[1] || ''}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto mt-6 md:mt-8 font-medium leading-relaxed px-4"
              >
                {data.description}
              </motion.p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative z-20 -mt-20 md:-mt-24 px-6">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {data.stats.map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-elevated border border-gray-50 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500"
                >
                  <span className="text-3xl md:text-4xl font-heading font-black text-primary group-hover:text-white transition-colors mb-1 md:mb-2">{stat.value}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/70 transition-colors">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Content Section */}
          <section className="py-20 md:py-32 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">

              {/* Features */}
              <div className="space-y-10 md:space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-dark mb-6 md:mb-8">Why Choose {data.name}?</h2>
                  <div className="space-y-4">
                    {data.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center gap-4 p-4 md:p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">✓</div>
                        <span className="font-bold text-dark text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Ready to Apply Section - Two Column with Form */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-5 md:p-12 lg:p-16 bg-dark rounded-[2rem] md:rounded-[4rem] text-white relative overflow-hidden group shadow-2xl mt-16"
                  id="apply-form"
                >
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-24 items-center">
                    <div className="text-center md:text-left">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-light font-black text-[10px] tracking-[0.3em] uppercase mb-6"
                      >
                        Application Hub
                      </motion.div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-8 italic leading-tight">
                        Ready to <br /> <span className="text-primary tracking-normal not-italic uppercase">Apply?</span>
                      </h3>
                      <p className="text-white/60 mb-10 font-medium text-lg md:text-xl leading-relaxed max-w-md">
                        Get personalized advice from our country experts. Fill out the form and we'll help you navigate every step of your {data.name} journey.
                      </p>
                      
                      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl">⚡</div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Quick Response</p>
                            <p className="font-bold text-sm">Under 24 Hours</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl">🛡️</div>
                          <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Success Rate</p>
                            <p className="font-bold text-sm">98% Verified</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full" />
                      <ContactForm defaultCountry={data.name} isCompact={true} />
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />
                </motion.div>
              </div>

              {/* Programs */}
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl font-heading font-black text-dark mb-8 md:mb-10">Popular Programs</h2>
                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  {data.programs.map((prog: any, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg md:text-xl font-black text-dark group-hover:text-primary transition-colors">{prog.title}</h4>
                          <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-widest">{prog.level}</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shrink-0">
                          →
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 text-center md:text-left">
                  <Link href="/destinations" className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-all">
                    ← Back to Destinations
                  </Link>
                </div>
              </div>

            </div>
          </section>

          {/* Sticky Quick Action */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 left-6 right-6 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 pointer-events-none"
          >
            <div
              onClick={() => {
                const el = document.getElementById('apply-form');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="pointer-events-auto flex items-center justify-between md:justify-center gap-4 bg-dark text-white pl-8 pr-4 py-4 md:px-10 md:py-6 rounded-full shadow-2xl border border-white/10 hover:bg-primary transition-all group w-full md:w-auto cursor-pointer"
            >
              <span className="font-heading font-black text-[10px] md:text-xs tracking-widest uppercase">Start Your {data.name} Journey</span>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all shrink-0">
                <span className="text-xl md:text-2xl">→</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </main>
  );
}
