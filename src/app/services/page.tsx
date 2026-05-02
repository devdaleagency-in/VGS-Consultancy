'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Award, 
  Landmark, 
  ShieldCheck, 
  Home, 
  Briefcase, 
  Plane 
} from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Gradient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,#f0f7ff,#f8fafc,#eef2ff,#ffffff)] bg-[length:400%_400%] animate-gradient-shift z-0" />
      
      {/* Dynamic Atmospheric Glows */}
      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, 80, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -150, 0],
          y: [0, -80, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent-gold/10 rounded-full blur-[140px] pointer-events-none"
      />

      <section className="py-24 md:py-32 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-95" />
        <div className="max-w-[1400px] mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
          >
             <span className="text-white font-black tracking-[0.3em] uppercase text-[10px]">Premium Academic Solutions</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-black text-white mb-8 tracking-tighter"
          >
            Expert <span className="text-white/40 italic font-accent tracking-normal">Global Services</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Strategic end-to-end support tailored for your global success. From initial profiling to university transition.
          </motion.p>
        </div>
      </section>

      <section className="py-24 relative z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-40">
            {services.map((service, i) => (
              <motion.div
                key={i}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:items-center gap-16 md:gap-24 scroll-mt-56 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Visual Section */}
                <div className="w-full lg:w-1/2">
                   <div className="relative aspect-video rounded-[3rem] bg-white shadow-2xl flex items-center justify-center p-16 overflow-hidden group border border-gray-100">
                      {/* Interactive Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-50/50 to-gray-100/30 group-hover:opacity-50 transition-opacity" />
                      
                      <motion.div 
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 5, 0, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="relative z-10"
                      >
                        {service.icon}
                      </motion.div>
                      
                      {/* Step Indicator */}
                      <div className="absolute top-10 left-10">
                         <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-dark/20 font-black text-xl">
                           0{i + 1}
                         </div>
                      </div>
                   </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 space-y-10">
                   <div className="space-y-4">
                     <h2 className="text-4xl md:text-5xl font-heading font-black text-dark tracking-tight leading-none">{service.title}</h2>
                     <div className="w-20 h-1.5 bg-primary rounded-full" />
                   </div>
                   
                   <p className="text-xl text-gray-500 leading-relaxed font-medium">{service.desc}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-4 group/item">
                           <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover/item:bg-primary transition-colors">
                              <svg className="w-5 h-5 text-primary group-hover/item:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                           </div>
                           <span className="text-gray-700 font-bold group-hover/item:text-primary transition-colors">{feature}</span>
                        </div>
                      ))}
                   </div>

                   <div className="pt-8">
                      <Link 
                        href="/contact"
                         className="inline-flex items-center gap-4 px-10 py-5 bg-dark text-white hover:bg-primary rounded-2xl font-black transition-all shadow-2xl hover:shadow-primary/30 group/btn"
                      >
                         Start Your Journey
                         <span className="group-hover/btn:translate-x-2 transition-transform">→</span>
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact CTA */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-dark rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
            
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8 relative z-10 leading-tight">
              Ready to Accelerate Your <br />
              <span className="text-primary italic font-accent tracking-normal">Academic Future?</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
               <Link href="/contact" className="px-12 py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                 Free Consultation
               </Link>
               <Link href="/faq" className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-2xl font-black hover:bg-white/20 transition-all">
                 Read FAQ
               </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const services = [
  {
    id: "course-selection",
    title: "Course Selection",
    desc: "We analyze your academic background and interests to suggest the most suitable courses that align with your career goals.",
    icon: <BookOpen className="w-24 h-24 md:w-32 md:h-32 text-blue-600" />,
    features: ["Personalized Profile Analysis", "Career Outcome Research", "Curriculum Comparison", "Future Industry Trends"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "university-shortlisting",
    title: "University Shortlisting",
    desc: "Using advanced data and latest rankings, we create a balanced list of universities including ambitious, target, and safe options.",
    icon: <GraduationCap className="w-24 h-24 md:w-32 md:h-32 text-emerald-600" />,
    features: ["Global Rankings Analysis", "Tuition Fee Comparison", "Scholarship Probability", "Location & Networking"],
    image: "https://images.unsplash.com/photo-1498243639359-2830cbd75950?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "application-support",
    title: "Application Support",
    desc: "Our expert editors help you draft winning Statements of Purpose (SOP) and organize your Letters of Recommendation (LOR).",
    icon: <FileText className="w-24 h-24 md:w-32 md:h-32 text-orange-600" />,
    features: ["Expert SOP Editing", "LOR Drafting Guidance", "Resume Optimization", "Interview Preparation"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "scholarship-guidance",
    title: "Scholarship Guidance",
    desc: "We help you identify and apply for various merit-based and need-based scholarships, reducing your financial burden.",
    icon: <Award className="w-24 h-24 md:w-32 md:h-32 text-purple-600" />,
    features: ["Global Database Access", "Drafting Essays", "External Funding Sources", "Bursary Applications"],
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "education-loan-support",
    title: "Education Loan Support",
    desc: "We provide specialized assistance in identifying and securing the best education loans with competitive interest rates for your international studies.",
    icon: <Landmark className="w-24 h-24 md:w-32 md:h-32 text-red-600" />,
    features: ["Bank Comparison Analysis", "Documentation Assistance", "Fast-track Processing", "Flexible Repayment Plans"],
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    desc: "Our high success rate is due to our meticulous document verification and comprehensive mock interview sessions.",
    icon: <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-cyan-600" />,
    features: ["Document Verification", "Financial Proof Guidance", "Mock Interviews", "Status Tracking"],
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "post-arrival-support",
    title: "Post-Arrival Support",
    desc: "We don't just stop at the visa. We help you find accommodation, insurance, and airport transfers to start your life abroad smoothly.",
    icon: <Home className="w-24 h-24 md:w-32 md:h-32 text-indigo-600" />,
    features: ["Accommodation Search", "Bank Account Setup", "Local Networking", "Travel Insurance"],
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "work-permit-visa",
    title: "Work Permit Visa",
    desc: "Launch your international career with our specialized work permit assistance. We guide professionals through the complex legalities of securing employment visas in global markets.",
    icon: <Briefcase className="w-24 h-24 md:w-32 md:h-32 text-rose-600" />,
    features: ["Skilled Worker Pathways", "H-1B & L-1 Support (USA)", "LMIA & COS Assistance", "Post-Study Work Transition"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "visit-visa",
    title: "Visit Visa",
    desc: "Explore global destinations for leisure or business with our streamlined visit visa services. We handle the documentation stress so you can focus on your journey.",
    icon: <Plane className="w-24 h-24 md:w-32 md:h-32 text-sky-600" />,
    features: ["Tourist & Business Visas", "Family Visit Support", "Hotel & Flight Bookings", "Personalized Cover Letters"],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1000"
  }
];
