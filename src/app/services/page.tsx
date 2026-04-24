'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: "Course Selection",
    desc: "We analyze your academic background and interests to suggest the most suitable courses that align with your career goals.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    features: ["Personalized Profile Analysis", "Career Outcome Research", "Curriculum Comparison", "Future Industry Trends"]
  },
  {
    title: "University Shortlisting",
    desc: "Using advanced data and latest rankings, we create a balanced list of universities including ambitious, target, and safe options.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: ["Global Rankings Analysis", "Tuition Fee Comparison", "Scholarship Probability", "Location & Networking"]
  },
  {
    title: "Application Support",
    desc: "Our expert editors help you draft winning Statements of Purpose (SOP) and organize your Letters of Recommendation (LOR).",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    features: ["Expert SOP Editing", "LOR Drafting Guidance", "Resume Optimization", "Interview Preparation"]
  },
  {
    title: "Scholarship Guidance",
    desc: "We help you identify and apply for various merit-based and need-based scholarships, reducing your financial burden.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["Global Database Access", "Drafting Essays", "External Funding Sources", "Bursary Applications"]
  },
  {
    title: "Education Loan Support",
    desc: "We provide specialized assistance in identifying and securing the best education loans with competitive interest rates for your international studies.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: ["Bank Comparison Analysis", "Documentation Assistance", "Fast-track Processing", "Flexible Repayment Plans"]
  },
  {
    title: "Visa Assistance",
    desc: "Our high success rate is due to our meticulous document verification and comprehensive mock interview sessions.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    features: ["Document Verification", "Financial Proof Guidance", "Mock Interviews", "Status Tracking"]
  },
  {
    title: "Post-Arrival Support",
    desc: "We don't just stop at the visa. We help you find accommodation, insurance, and airport transfers to start your life abroad smoothly.",
    icon: (
      <svg className="w-48 h-48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    features: ["Accommodation Search", "Bank Account Setup", "Local Networking", "Travel Insurance"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light opacity-90" />
        <div className="max-w-[1400px] mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-extrabold text-white mb-6"
          >
            Our Expert <span className="text-dark/30 italic font-accent">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            End-to-end support tailored for your success. From the first spark of interest to your first day on campus.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, i) => (
              <motion.div
                key={i}
                id={service.title.toLowerCase().replace(/\s+/g, '-')}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col lg:items-center gap-12 pt-20 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                   <div className="relative aspect-video rounded-3xl bg-gray-50 flex items-center justify-center p-12 overflow-hidden group">
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-500 text-primary">
                        {service.icon}
                      </div>
                      <div className="absolute bottom-10 right-10 flex gap-2">
                         <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary font-bold">{i + 1}</div>
                      </div>
                   </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                   <h2 className="text-4xl font-heading font-extrabold text-dark">{service.title}</h2>
                   <p className="text-xl text-gray-500 leading-relaxed">{service.desc}</p>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-3">
                           <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                           </div>
                           <span className="text-gray-600 font-medium">{feature}</span>
                        </div>
                      ))}
                   </div>

                   <div className="pt-6">
                      <Link 
                        href="/contact"
                         className="inline-flex items-center gap-3 px-8 py-4 bg-dark text-white hover:bg-primary rounded-2xl font-bold transition-all shadow-lg hover:shadow-primary/20"
                      >
                         Interested in this Service?
                         <span>→</span>
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global FAQ Mini Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-extrabold text-dark mb-12">Still Have Questions?</h2>
          <div className="flex flex-wrap justify-center gap-4">
             <Link href="/contact" className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg">Talk to Counselor</Link>
             <Link href="/faq" className="px-8 py-4 bg-white border border-gray-200 rounded-xl font-bold flex items-center gap-2">
                Visit FAQ 📖
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
