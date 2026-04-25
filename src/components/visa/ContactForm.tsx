'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomToast } from '@/components/ui/CustomToast';
import OTPVerification from '@/components/forms/OTPVerification';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  country: z.string().min(1, "Please select a country"),
  course: z.string().min(1, "Please select a course area"),
  visaType: z.string().min(1, "Please select a visa type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  defaultCountry?: string;
  defaultVisaType?: string;
  isCompact?: boolean;
}

export default function ContactForm({ defaultCountry = '', defaultVisaType = '', isCompact = false }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visaType: defaultVisaType,
      country: defaultCountry,
    }
  });

  useEffect(() => {
    if (defaultCountry) setValue('country', defaultCountry);
    if (defaultVisaType) setValue('visaType', defaultVisaType);
  }, [defaultCountry, defaultVisaType, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const startTimestamp = Date.now();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server error. Please try again later.");
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
    <div className={`bg-white ${isCompact ? 'px-3 py-6 md:p-8' : 'px-4 py-8 md:p-12'} rounded-[1.25rem] md:rounded-[2.5rem] shadow-elevated border border-gray-100`}>
      <h2 className={`${isCompact ? 'text-2xl' : 'text-3xl'} font-heading font-bold text-dark mb-4`}>Book Expert Session</h2>
      <p className="text-gray-500 mb-8 text-sm">Fill out the form and our expert counselor will contact you within 24 hours.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Full Name</label>
            <input 
              {...register("name")}
              placeholder="Your Name" 
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.name ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all text-sm`}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Email</label>
            <input 
              {...register("email")}
              placeholder="email@example.com" 
              disabled={isEmailVerified}
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all text-sm ${isEmailVerified ? 'opacity-50' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-[10px] ml-2 font-bold">{errors.email.message}</p>}
            
            <OTPVerification 
              email={watch('email')} 
              onVerified={(val) => setIsEmailVerified(val)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Phone</label>
            <input 
              {...register("phone")}
              placeholder="+91" 
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all text-sm`}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Target Country</label>
            <select 
              {...register("country")}
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.country ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none text-sm`}
            >
              <option value="">Select Country</option>
              <option value="UK">United Kingdom</option>
              <option value="USA">United States</option>
              <option value="Canada">Canada</option>
              <option value="Europe">Europe</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Interest</label>
            <select 
              {...register("course")}
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.course ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none text-sm`}
            >
              <option value="">Select Category</option>
              <option value="CS">IT & Software</option>
              <option value="Biz">Business</option>
              <option value="Eng">Engineering</option>
              <option value="Med">Healthcare</option>
              <option value="None">Not Applicable</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Visa Type</label>
            <select 
              {...register("visaType")}
              className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.visaType ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all appearance-none text-sm`}
            >
              <option value="">Select Visa Type</option>
              <option value="Student">Student Visa</option>
              <option value="Work">Work Visa</option>
              <option value="Visit">Visit Visa</option>
              <option value="PR">PR Pathway</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark/60 ml-2">Message</label>
          <textarea 
            {...register("message")}
            rows={isCompact ? 2 : 3} 
            placeholder="Tell us your goals..." 
            className={`w-full px-5 py-3 bg-gray-50 rounded-xl border ${errors.message ? 'border-red-400' : 'border-transparent'} focus:border-primary focus:bg-white outline-none transition-all resize-none text-sm`}
          />
        </div>

        <motion.button
          whileHover={{ scale: isEmailVerified ? 1.02 : 1 }}
          whileTap={{ scale: isEmailVerified ? 0.98 : 1 }}
          type="submit"
          disabled={isSubmitting || !isEmailVerified}
          className={`w-full py-4 text-white rounded-xl font-bold text-sm uppercase tracking-widest shadow-glow transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
            isSubmitting ? 'bg-primary-600' : isSuccess ? 'bg-green-500' : isEmailVerified ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span key="submitting">Processing...</motion.span>
            ) : isSuccess ? (
              <motion.span key="success">Sent! ✅</motion.span>
            ) : isEmailVerified ? (
              <motion.span key="idle">Send Inquiry</motion.span>
            ) : (
              <motion.span key="verify">Verify Email to Send</motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>
    </div>
  );
}
