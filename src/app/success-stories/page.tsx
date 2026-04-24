'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SuccessStoriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch('/api/admin/data?type=success-stories');
        const json = await res.json();
        setContent(json);
      } catch (err) {
        console.error("Failed to load stories:", err);
      }
    };
    fetchContent();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!content) return;
    const ctx = gsap.context(() => {
      gsap.from('.story-card', {
        scrollTrigger: {
          trigger: '.stories-grid',
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!content) return <div className="min-h-screen bg-white flex items-center justify-center font-black text-xs uppercase tracking-widest text-primary animate-pulse">Initializing VGS Stories...</div>;

  const { videoTestimonials, successStories } = content;

  return (
    <div ref={containerRef} className="min-h-screen bg-white grid-bg selection:bg-primary selection:text-white pb-32">
      
      {/* Cinematic Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0 opacity-10">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-primary pointer-events-none select-none">
              REAL
           </div>
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full border border-primary/20 text-primary font-black text-[10px] tracking-[0.5em] uppercase mb-10"
          >
            50+ Success Stories
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl md:text-[8vw] lg:text-[9rem] font-heading font-black text-dark leading-[0.8] tracking-tighter uppercase mb-12">
            Real Stories. <br />
            <span className="text-primary italic font-accent capitalize  tracking-normal">Real success.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-dark/50 font-medium leading-relaxed">
            Don't just take our word for it. Hear directly from the students who have transcended boundaries with VGS Global.
          </p>
        </div>
      </section>

      {/* Video Testimonials Section - Horizontal Carousel */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Video Feedbacks</span>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-dark tracking-tighter leading-none">Experience <br /> Their journey.</h2>
            </div>
          </div>

          <div className="relative group/carousel">
            {/* Navigation Arrows - Left/Right Floating */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 hidden md:block">
              <button 
                onClick={() => scroll('left')}
                className="w-16 h-16 rounded-full bg-white shadow-2xl border border-black/5 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all duration-300 group shadow-primary/20"
                aria-label="Scroll Left"
              >
                <svg className="w-8 h-8 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 hidden md:block">
              <button 
                onClick={() => scroll('right')}
                className="w-16 h-16 rounded-full bg-white shadow-2xl border border-black/5 flex items-center justify-center text-dark hover:bg-primary hover:text-white transition-all duration-300 group shadow-primary/20"
                aria-label="Scroll Right"
              >
                <svg className="w-8 h-8 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory px-4 py-10 no-scrollbar"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {videoTestimonials.map((video: any) => (
                <motion.div 
                  key={video.id}
                  whileHover={{ y: -10 }}
                  className="relative shrink-0 w-[300px] md:w-[400px] group cursor-pointer snap-start"
                  onClick={() => setActiveVideo(video.id)}
                >
                  <div className="relative aspect-[9/16] rounded-[4rem] overflow-hidden shadow-2xl border border-black/[0.03]">
                    <Image 
                      src={video.thumbnail} 
                      alt={video.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-125 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                        <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10">
                      <h4 className="text-3xl font-black text-white mb-2">{video.name}</h4>
                      <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{video.destination}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="stories-grid py-24 px-6 bg-gray-50/50 rounded-[4rem] mx-4 md:mx-10 border border-black/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-7xl font-heading font-black text-dark tracking-tighter leading-none mb-8">Trusted by <br /> Thousands.</h2>
            <div className="w-20 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="story-card bg-white p-8 md:p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-black/[0.01] flex flex-col sm:flex-row gap-8"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md">
                  <Image src={story.image} alt={story.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black text-dark mb-1">{story.name}</h3>
                      <p className="text-primary font-bold text-[10px] uppercase tracking-widest">{story.university}</p>
                    </div>
                    <span className="text-[10px] font-bold text-dark/30 uppercase tracking-widest">{story.date}</span>
                  </div>
                  <div className="mb-4">
                     <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Course: {story.course}</p>
                  </div>
                  <p className="text-dark/60 text-sm font-medium leading-relaxed italic relative">
                    <span className="text-5xl absolute -top-8 -left-4 text-primary/5 font-serif select-none">“</span>
                    {story.message}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-40 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          <div className="text-center">
             <div className="text-5xl md:text-7xl font-heading font-black text-primary mb-4">97%</div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-dark/30">Visa Success Rate</p>
          </div>
          <div className="text-center">
             <div className="text-5xl md:text-7xl font-heading font-black text-accent-gold mb-4">50+</div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-dark/30">Successful Placements</p>
          </div>
          <div className="text-center">
             <div className="text-5xl md:text-7xl font-heading font-black text-dark mb-4">50+</div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-dark/30">Partner Countries</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto bg-primary text-white rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden group shadow-2xl">
           <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter leading-none mb-12 italic">Be Our Next <br /> Success Story.</h2>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-6 bg-white text-primary px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-dark hover:text-white transition-all group shadow-xl"
              >
                Start Your Journey 
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all">
                  →
                </div>
              </Link>
           </div>
           <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48 group-hover:bg-white/10 transition-all duration-700" />
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-gold/10 rounded-full blur-[100px] -ml-40 -mb-40 group-hover:bg-accent-gold/20 transition-all duration-1000" />
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div 
              className="absolute inset-0 bg-dark/95 backdrop-blur-xl" 
              onClick={() => setActiveVideo(null)}
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all"
              >
                ✕
              </button>

              {videoTestimonials.find((v: any) => v.id === activeVideo)?.videoUrl ? (
                <video 
                  src={videoTestimonials.find((v: any) => v.id === activeVideo)?.videoUrl}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl mb-6 animate-pulse">
                    🎬
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">Video is being processed</h3>
                  <p className="text-white/40 font-medium max-w-xs uppercase text-[10px] tracking-[0.2em]">Our team is currently preparing this student journey for display.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
