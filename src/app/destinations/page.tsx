'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const destinations = [
  {
    slug: "uk",
    name: "United Kingdom",
    fullName: "England, Scotland, Wales & NI",
    flag: "🇬🇧",
    accent: "#003366",
    desc: "Home to world-renowned universities like Oxford and Cambridge, offering 1-year Masters and post-study work visas.",
    benefits: ["1 Year Masters", "Post Study Work", "Research Excellence"],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "usa",
    name: "United States",
    fullName: "United States of America",
    flag: "🇺🇸",
    accent: "#B22234",
    desc: "The global hub for innovation and research with the largest number of top-ranked universities in the world.",
    benefits: ["STEM OPT Hub", "Extensive Funding", "Silicon Valley Links"],
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "canada",
    name: "Canada",
    fullName: "The Great White North",
    flag: "🇨🇦",
    accent: "#FF0000",
    desc: "Known for its high quality of life, friendly environment, and excellent post-graduation work opportunities.",
    benefits: ["Easy PR Pathway", "Work while Study", "Co-op Programs"],
    image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "germany",
    name: "Germany",
    fullName: "Engine of Europe",
    flag: "🇩🇪",
    accent: "#000000",
    desc: "Tuition-free education in public universities and a powerhouse for engineering and technology.",
    benefits: ["Public Uni €0", "Industrial Power", "Innovation Leader"],
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "australia",
    name: "Australia",
    fullName: "The Land Down Under",
    flag: "🇦🇺",
    accent: "#00008B",
    desc: "World-class education system with a focus on practical learning and impressive student lifestyles.",
    benefits: ["Regional Points", "Student Life", "PSW Work Rights"],
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800"
  },
  {
    slug: "ireland",
    name: "Ireland",
    fullName: "The Emerald Isle",
    flag: "🇮🇪",
    accent: "#009A44",
    desc: "Europe's tech hub with a welcoming culture and strong emphasis on research and innovation.",
    benefits: ["Tech Hub Base", "Post-Study Stay", "English Speaking"],
    image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80&w=800"
  }
];

export default function DestinationsPage() {
  return (
    <div className="pt-24 min-h-screen bg-white font-montserrat overflow-hidden">
      {/* Immersive Header */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8fafc] -z-10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-accent-blue/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary font-black text-xs tracking-[0.3em] uppercase mb-8"
          >
            Global Opportunities
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-black text-dark mb-8 tracking-tighter"
          >
            Choose Your <span className="text-primary italic font-accent">Destination</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-3xl mx-auto font-medium"
          >
            Explore diverse academic landscapes and find the perfect environment to launch your global career. Every country offers a unique path to excellence.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {destinations.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative h-[550px] rounded-[3.5rem] overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-700"
              >
                {/* Background Image Card */}
                <div className="absolute inset-0">
                  <img src={country.image} alt={country.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end z-10 transition-transform duration-700 group-hover:-translate-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-4xl shadow-xl group-hover:bg-primary transition-all duration-500">
                      {country.flag}
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{country.fullName}</span>
                       <h2 className="text-3xl font-heading font-black text-white">{country.name}</h2>
                    </div>
                  </div>

                  <p className="text-white/70 mb-8 font-medium italic line-clamp-2 transition-all group-hover:text-white">
                    "{country.desc}"
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                    {country.benefits.map((benefit, j) => (
                      <span key={j} className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest uppercase">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <Link 
                     href={`/destinations/${country.slug}`}
                     className="relative w-full h-16 rounded-2xl bg-white flex items-center justify-center gap-3 overflow-hidden group/btn"
                  >
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 text-dark font-black group-hover/btn:text-white transition-colors uppercase text-xs tracking-[0.2em]">
                      Explore Destination
                    </span>
                    <span className="relative z-10 text-dark group-hover/btn:text-white transition-colors">→</span>
                  </Link>
                </div>

                {/* Artistic Layering */}
                <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-white/20 rounded-tr-3xl transition-all duration-500 group-hover:w-20 group-hover:h-20" />
                <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-white/20 rounded-bl-3xl transition-all duration-500 group-hover:w-20 group-hover:h-20" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-3xl md:text-5xl font-accent italic text-gray-300"
            >
              "Your future is not restricted by borders, but by the extent of your vision."
            </motion.div>
        </div>
      </section>
    </div>
  );
}
