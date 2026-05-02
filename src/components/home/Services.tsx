'use client';

import { motion } from 'framer-motion';
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
import ServiceCard from './ServiceCard';

export default function Services() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-slate-50/30" id="services">
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-slate-50 z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(-45deg,#f1f5f9,#f8fafc,#eff6ff,#ffffff)] bg-[length:200%_200%] animate-gradient-shift opacity-50 z-0" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.1] mix-blend-overlay pointer-events-none grid-bg" />
      
      {/* Static Atmospheric Blobs (Zero Animation for Performance) */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px]">
              Our Professional Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading font-black text-dark mb-8 tracking-tighter"
          >
            Comprehensive Support for Your <br />
            <span className="text-primary italic font-accent tracking-normal">Educational Journey</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Delivering end-to-end, expert-led guidance tailored to your unique academic ambitions and global career goals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              index={index}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: <BookOpen className="w-12 h-12 text-blue-600" />,
    title: "Course Selection",
    description: "Expert guidance on selecting the perfect program matching your profile, interests, and career goals.",
    link: "/services#course-selection",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <GraduationCap className="w-12 h-12 text-emerald-600" />,
    title: "University Shortlisting",
    description: "Data-driven recommendations to help you target prestigious universities where you have the highest success chance.",
    link: "/services#university-shortlisting",
    image: "https://images.unsplash.com/photo-1498243639359-2830cbd75950?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <FileText className="w-12 h-12 text-orange-600" />,
    title: "Application Support",
    description: "End-to-end assistance with admissions, including SOP review, document preparation, and form submission.",
    link: "/services#application-support",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <Award className="w-12 h-12 text-purple-600" />,
    title: "Scholarship Guidance",
    description: "Personalized search for funding opportunities and bursaries to maximize your financial support.",
    link: "/services#scholarship-guidance",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <Landmark className="w-12 h-12 text-red-600" />,
    title: "Education Loan Support",
    description: "Simplified financial planning with expert assistance in securing education loans from leading global and local banks.",
    link: "/services#education-loan-support",
    image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-cyan-600" />,
    title: "Visa Assistance",
    description: "Expert visa counseling and document verification with a stellar 98% success rate across all countries.",
    link: "/services#visa-assistance",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <Home className="w-12 h-12 text-indigo-600" />,
    title: "Post-Arrival Support",
    description: "Assistance with accommodation, airport pickups, and local orientation to ensure a smooth transition.",
    link: "/services#post-arrival-support",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <Briefcase className="w-12 h-12 text-rose-600" />,
    title: "Work Permit Visa",
    description: "Professional guidance for securing employment visas and navigating sponsorship requirements in global markets.",
    link: "/services#work-permit-visa",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=70&w=600"
  },
  {
    icon: <Plane className="w-12 h-12 text-sky-600" />,
    title: "Visit Visa",
    description: "Seamless documentation support for tourist and business travel, ensuring high approval rates for your global trips.",
    link: "/services#visit-visa",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=70&w=600"
  }
];
