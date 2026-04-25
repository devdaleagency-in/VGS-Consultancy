'use client';

import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="pt-32 min-h-screen bg-white">
      <section className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-extrabold text-dark mb-12"
        >
          Privacy <span className="text-primary italic font-accent">Policy</span>
        </motion.h1>
        
        <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
            <p>
              Welcome to VGS Global Educational Experts. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at info@vgs.ind.in.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website or otherwise when you contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">3. How We Use Your Information</h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">4. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
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
