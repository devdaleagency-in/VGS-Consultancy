'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="pt-32 min-h-screen bg-white">
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-extrabold text-dark mb-12"
        >
          Terms of <span className="text-primary italic font-accent">Service</span>
        </motion.h1>
        
        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website at vgs-consultancy.vercel.app, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on VGS Global Educational Consultancy's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">3. Disclaimer</h2>
            <p>
              The materials on VGS Global Educational Consultancy's website are provided on an 'as is' basis. VGS Global Educational Consultancy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">4. Limitations</h2>
            <p>
              In no event shall VGS Global Educational Consultancy or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VGS Global Educational Consultancy's website.
            </p>
          </section>

          <p className="text-sm text-gray-400 pt-12">
            Last updated: April 2024
          </p>
        </div>
      </section>
    </div>
  );
}
