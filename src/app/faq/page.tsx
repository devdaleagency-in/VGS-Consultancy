'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqCategories = [
  { id: 'study', name: 'Study Visa', icon: '🎓' },
  { id: 'work', name: 'Work Visa', icon: '💼' },
  { id: 'visit', name: 'Visit Visa', icon: '✈️' },
  { id: 'general', name: 'General', icon: '❓' }
];

const faqs = [
  // Study Visa
  {
    category: 'study',
    question: "What is the minimum IELTS score required for Canadian universities?",
    answer: "Generally, for undergraduate programs, a minimum overall score of 6.0 with no band less than 6.0 is required. For postgraduate programs, most universities require an overall 6.5 with no band less than 6.0. However, top-tier universities may have higher requirements."
  },
  {
    category: 'study',
    question: "Can I work while studying in the UK?",
    answer: "Yes, most international students on a Student Visa are allowed to work up to 20 hours per week during term time and full-time during vacations. However, this depends on the level of your course and the type of institution."
  },
  {
    category: 'study',
    question: "How much bank balance is required for a US F1 Visa?",
    answer: "You must show proof of funds that cover at least one year of tuition and living expenses as mentioned on your I-20 form. We recommend showing a slightly higher amount to demonstrate financial stability."
  },
  // Work Visa
  {
    category: 'work',
    question: "What is an LMIA in Canada and why is it needed?",
    answer: "A Labour Market Impact Assessment (LMIA) is a document that an employer in Canada may need to get before hiring a foreign worker. It shows that there is a need for a foreign worker to fill the job and that no Canadian worker is available to do it."
  },
  {
    category: 'work',
    question: "Does Germany require a job offer for the Opportunity Card?",
    answer: "No, the new 'Opportunity Card' (Chancenkarte) allows skilled workers to enter Germany for up to one year to find a job, provided they meet the points-based criteria such as qualifications, experience, and language skills."
  },
  {
    category: 'work',
    question: "How long is the processing time for a UK Skilled Worker Visa?",
    answer: "Standard processing usually takes around 3 weeks if you are outside the UK. Priority services are available for faster decisions within 5 working days or even 24 hours in some cases."
  },
  // Visit Visa
  {
    category: 'visit',
    question: "How long can I stay in Europe on a Schengen Visa?",
    answer: "A standard short-stay Schengen visa allows you to stay for up to 90 days within any 180-day period. This applies to both tourism and business visits across all 29 member countries."
  },
  {
    category: 'visit',
    question: "Is an interview mandatory for a US B1/B2 Visit Visa?",
    answer: "Yes, most first-time applicants between the ages of 14 and 79 are required to attend an in-person interview at a US Embassy or Consulate. Renewal applicants may sometimes be eligible for an interview waiver."
  },
  {
    category: 'visit',
    question: "Is health insurance mandatory for a Dubai tourist visa?",
    answer: "Yes, the UAE government requires all visitors to have valid travel insurance that covers healthcare expenses for the duration of their stay."
  },
  // General
  {
    category: 'general',
    question: "What makes VGS Global different from other educational experts?",
    answer: "We offer personalized, data-driven guidance with a stellar 98% success rate. Our direct partnerships with 500+ institutions and a dedicated documentation team ensure your application is perfect from day one."
  },
  {
    category: 'general',
    question: "Does VGS help with education loans?",
    answer: "Absolutely. We have tied up with leading national and international banks to provide our students with competitive interest rates and fast-track loan processing."
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('study');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-white font-montserrat">
      {/* Immersive Header */}
      <section className="relative py-32 bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-blue/10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-2 rounded-full bg-white/5 text-primary-light font-black text-xs tracking-[0.3em] uppercase mb-8 border border-white/10"
          >
            Help Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-heading font-black text-white mb-8 tracking-tighter uppercase"
          >
            Frequently Asked <span className="text-primary italic font-accent lowercase first-letter:uppercase">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/50 max-w-2xl mx-auto font-medium italic"
          >
            Clear answers to your most pressing questions about global education and migration.
          </motion.p>
        </div>
      </section>

      {/* FAQ Explorer */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 border ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white border-primary shadow-2xl scale-110'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-primary/20 hover:text-primary hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div 
                      key={index}
                      className={`rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                        isOpen 
                          ? 'bg-white border-primary/20 shadow-[0_30px_60px_rgba(0,0,0,0.05)]' 
                          : 'bg-gray-50/50 border-gray-100 hover:bg-white hover:border-primary/10'
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-8 md:p-10 text-left group"
                      >
                        <span className={`text-xl md:text-2xl font-heading font-black transition-colors duration-500 ${
                          isOpen ? 'text-primary' : 'text-dark group-hover:text-primary/70'
                        }`}>
                          {faq.question}
                        </span>
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isOpen ? 'bg-primary border-primary text-white rotate-180' : 'border-gray-200 text-gray-300'
                        }`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                          >
                            <div className="px-8 md:px-10 pb-10">
                              <div className="h-[2px] w-12 bg-primary/20 mb-8" />
                              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed italic">
                                "{faq.answer}"
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-black text-dark mb-10 tracking-tighter">
            Still Have <span className="text-primary italic font-accent">Unanswered</span> Questions?
          </h2>
          <p className="text-xl text-gray-400 font-medium mb-12 italic">
            Don't leave your future to chance. Get professional guidance from our expert counselors.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/contact"
              className="px-10 py-5 bg-dark text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl"
            >
              Get Expert Advice →
            </Link>
            <a 
              href="https://wa.me/918096832850"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
