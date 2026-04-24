'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select a country"),
  course: z.string().min(1, "Please select a course area"),
  visaType: z.string().min(1, "Please select a visa type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

import { CustomToast } from '@/components/ui/CustomToast';

type FormData = z.infer<typeof formSchema>;

function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const countryParam = searchParams.get('country');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visaType: typeParam || '',
      country: countryParam || '',
    }
  });

  // Update values if params change
  useEffect(() => {
    if (typeParam) setValue('visaType', typeParam);
    if (countryParam) setValue('country', countryParam);
  }, [typeParam, countryParam, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const startTimestamp = Date.now();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Safely check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text();
        console.error("Server returned non-JSON response:", errorText);
        throw new Error("The server encountered a critical error and returned HTML instead of JSON. Check the server logs.");
      }

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Something went wrong');

      const elapsed = Date.now() - startTimestamp;
      if (elapsed < 2000) await new Promise(r => setTimeout(r, 2000 - elapsed));

      setIsSuccess(true);
      
      toast.custom((t) => (
        <CustomToast 
          message="Enquiry Sent Successfully!" 
          email={data.email} 
          type="success" 
        />
      ), { duration: 5000 });

      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.custom(() => (
        <CustomToast 
          message={error.message || "Failed to send enquiry"} 
          type="error" 
        />
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-extrabold text-dark mb-6"
          >
            Get in <span className="text-primary italic font-accent">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Have questions about studying abroad? Book a free consultation with our experts today.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-heading font-bold text-dark mb-8">Contact Information</h2>
                <div className="space-y-8">
                  {[
                    {
                      icon: "📍",
                      label: "Visit Our Office",
                      value: "H.No 1-7-142/A/2, S.R. Mansion, Musheerabad, Hyderabad, Telangana 500020",
                      action: "Get Directions",
                      link: "https://maps.google.com"
                    },
                    {
                      icon: "📞",
                      label: "Call or WhatsApp",
                      value: "+91 80968 32850",
                      action: "Call Now",
                      link: "tel:+918096832850"
                    },
                    {
                      icon: "✉️",
                      label: "Email Us",
                      value: "info@vgs.ind.in",
                      action: "Send Email",
                      link: "mailto:info@vgs.ind.in"
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary-light mb-1">{item.label}</p>
                        <p className="text-lg font-bold text-dark mb-2">{item.value}</p>
                        <a href={item.link} className="text-sm font-bold text-primary group-hover:gap-2 flex items-center gap-1 transition-all">
                          {item.action} <span>→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-xl font-heading font-bold text-dark mb-6">Follow Our Updates</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <div key={social} className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center cursor-pointer hover:bg-primary/10 hover:border-primary/20 transition-all">
                      <span className="text-sm font-bold text-dark">{social[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full h-64 bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-100">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium italic">
                  Interactive Map Integration
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-elevated border border-gray-100"
            >
              <h2 className="text-3xl font-heading font-bold text-dark mb-4">Book Free Consultation</h2>
              <p className="text-gray-500 mb-10">Fill out the form and our expert counselor will contact you within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-dark">Full Name</label>
                    <input 
                      {...register("name")}
                      placeholder="Enter your name" 
                      className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.name ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all`}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-dark">Email Address</label>
                    <input 
                      {...register("email")}
                      placeholder="Enter your email" 
                      className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all`}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-dark">Phone Number</label>
                    <input 
                      {...register("phone")}
                      placeholder="+91" 
                      className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-medium mt-1">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-dark">Target Country</label>
                    <select 
                      {...register("country")}
                      className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.country ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none`}
                    >
                      <option value="">Select Country</option>
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Europe">Europe</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.country && <p className="text-xs text-red-500 font-medium mt-1">{errors.country.message}</p>}
                  </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-bold text-dark">Course Interest</label>
                      <select 
                        {...register("course")}
                        className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.course ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none`}
                      >
                        <option value="">Select Category</option>
                        <option value="CS">Computer Science & IT</option>
                        <option value="Biz">Business & Management</option>
                        <option value="Eng">Engineering</option>
                        <option value="Med">Medical & Healthcare</option>
                        <option value="Arts">Arts & Humanities</option>
                        <option value="None">Not Applicable</option>
                      </select>
                      {errors.course && <p className="text-xs text-red-500 font-medium mt-1">{errors.course.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-bold text-dark">Visa Type</label>
                      <select 
                        {...register("visaType")}
                        className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.visaType ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none`}
                      >
                        <option value="">Select Visa Type</option>
                        <option value="Student">Student Visa</option>
                        <option value="Work">Work Visa</option>
                        <option value="Visit">Visit Visa</option>
                        <option value="PR">Permanent Residency</option>
                      </select>
                      {errors.visaType && <p className="text-xs text-red-500 font-medium mt-1">{errors.visaType.message}</p>}
                    </div>
                  </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-dark">Your Message</label>
                  <textarea 
                    {...register("message")}
                    rows={4} 
                    placeholder="Tell us about your background and goals..." 
                    className={`w-full px-5 py-4 bg-gray-50 rounded-2xl border ${errors.message ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all resize-none`}
                  />
                  {errors.message && <p className="text-xs text-red-500 font-medium mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 text-white rounded-2xl font-bold text-lg shadow-glow transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
                    isSubmitting ? 'bg-primary-600' : isSuccess ? 'bg-green-500' : 'bg-primary'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div 
                        key="submitting"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3 z-10"
                      >
                        <div className="flex gap-1">
                          <motion.span
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.span
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </div>
                        <span>Processing Inquiry...</span>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div 
                        key="success"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 z-10"
                      >
                        Sent Successfully! ✅
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="z-10"
                      >
                        Send Inquiry Now
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Interactive loading background */}
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-primary-400/30"
                      initial={{ x: '-100%' }}
                      animate={{ x: '0%' }}
                      transition={{ duration: 2, ease: "linear" }}
                    />
                  )}

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="pt-24 min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
