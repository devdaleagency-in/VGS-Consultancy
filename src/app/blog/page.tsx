'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="pt-32 min-h-screen bg-white">
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-extrabold text-dark mb-6"
          >
            Our <span className="text-primary italic font-accent">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500"
          >
            Insights, updates, and expert advice for your international education journey.
          </motion.p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
          <div className="text-6xl mb-6">✍️</div>
          <h2 className="text-2xl font-bold text-dark mb-4">Coming Soon!</h2>
          <p className="text-gray-500 text-center max-w-md mb-8">
            We're currently preparing high-quality content to help you navigate your study abroad process. Stay tuned for updates!
          </p>
          <Link 
            href="/"
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:shadow-primary/20 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
