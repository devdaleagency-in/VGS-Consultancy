'use client';

import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: "🎯",
    title: "Course Selection",
    description: "Expert guidance on selecting the perfect program matching your profile, interests, and career goals.",
    link: "/services/course-selection"
  },
  {
    icon: "🏛️",
    title: "University Shortlisting",
    description: "Data-driven recommendations to help you target prestigious universities where you have the highest success chance.",
    link: "/services/university-shortlisting"
  },
  {
    icon: "📝",
    title: "Application Support",
    description: "End-to-end assistance with admissions, including SOP review, document preparation, and form submission.",
    link: "/services/application-support"
  },
  {
    icon: "💰",
    title: "Scholarship Guidance",
    description: "Personalized search for funding opportunities and bursaries to maximize your financial support.",
    link: "/services/scholarship-guidance"
  },
  {
    icon: "🛂",
    title: "Visa Assistance",
    description: "Expert visa counseling and document verification with a stellar 98% success rate across all countries.",
    link: "/services/visa-assistance"
  },
  {
    icon: "🏠",
    title: "Post-Arrival Support",
    description: "Assistance with accommodation, airport pickups, and local orientation to ensure a smooth transition.",
    link: "/services/post-arrival-support"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#7FA847" strokeWidth="40" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Our Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold text-dark mb-6"
          >
            Comprehensive Support for Your <br />
            <span className="text-primary italic font-accent">Educational Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500"
          >
            We provide end-to-end guidance from the moment you decide to study abroad until you're settled in your new university home.
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
