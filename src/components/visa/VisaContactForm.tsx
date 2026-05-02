'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import { CustomToast } from '@/components/ui/CustomToast';
import OTPVerification from '@/components/forms/OTPVerification';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone required"),
  country: z.string().min(1, "Please select a country"),
  course: z.string().min(1, "Please select a course area"),
  visaType: z.string().min(1, "Please select a visa type"),
  message: z.string().min(10, "Please tell us more about your requirements"),
});

export default function VisaContactForm({ visaType: initialVisaType }: { visaType: string }) {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visaType: initialVisaType.includes('Study') ? 'Student' : 
                initialVisaType.includes('Work') ? 'Work' : 
                initialVisaType.includes('Visit') ? 'Visit' : 'Student'
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Submission failed');

      toast.custom((t) => (
        <CustomToast message="Application Received!" email={data.email} type="success" />
      ));
      reset();
    } catch (err) {
      toast.custom((t) => (
        <CustomToast message="Submission Failed" type="error" />
      ));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 md:p-12 premium-form-gradient rounded-[1.5rem] md:rounded-[3rem] shadow-elevated border border-gray-100 relative overflow-hidden group">
      <div className="mb-10 text-center relative z-10">
        <h3 className="text-3xl font-black text-dark mb-2 uppercase tracking-tighter">Secure Your {initialVisaType}</h3>
        <p className="text-dark/40 font-black text-[10px] uppercase tracking-[0.2em]">Start your professional journey with VGS Global</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Full Name</label>
            <input 
              {...register("name")}
              placeholder="Full Name"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm placeholder:text-dark/40"
            />
            {errors.name && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.name.message}</p>}
          </div>
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Email Address</label>
            <div className="relative">
              <input 
                {...register("email")}
                placeholder="Email Address"
                disabled={isEmailVerified}
                className={`w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm placeholder:text-dark/40 ${isEmailVerified ? 'opacity-50' : ''}`}
              />
              <OTPVerification 
                email={watch('email')} 
                onVerified={(val) => setIsEmailVerified(val)} 
              />
            </div>
            {errors.email && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Phone Number</label>
            <input 
              {...register("phone")}
              placeholder="Phone Number"
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm placeholder:text-dark/40"
            />
            {errors.phone && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Target Country</label>
            <div className="relative">
              <select 
                {...register("country")}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm appearance-none"
              >
                <option value="">Select Country</option>
                <option value="UK">United Kingdom</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
                <option value="Ireland">Ireland</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/20 font-bold">↓</div>
            </div>
            {errors.country && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.country.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Visa Category</label>
            <div className="relative">
              <select 
                {...register("visaType")}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm appearance-none"
              >
                <option value="Student">Student Visa</option>
                <option value="Work">Work Visa</option>
                <option value="Visit">Visit Visa</option>
                <option value="PR">Permanent Residency</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/20 font-bold">↓</div>
            </div>
          </div>
          <div className="space-y-1 md:space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Field of Interest</label>
            <div className="relative">
              <select 
                {...register("course")}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none text-sm appearance-none"
              >
                <option value="">Select Field</option>
                <option value="CS">Computer Science</option>
                <option value="Biz">Business</option>
                <option value="Eng">Engineering</option>
                <option value="Med">Healthcare</option>
                <option value="Arts">Humanities</option>
                <option value="Other">Other</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-dark/20 font-bold">↓</div>
            </div>
            {errors.course && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.course.message}</p>}
          </div>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-dark/40 ml-4">Message / Requirements</label>
          <textarea 
            {...register("message")}
            placeholder="Tell us about your background..."
            rows={3}
            className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-dark outline-none resize-none text-sm placeholder:text-dark/40"
          />
          {errors.message && <p className="text-red-500 text-[10px] ml-4 uppercase font-black">{errors.message.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: isEmailVerified ? 1.02 : 1 }}
          whileTap={{ scale: isEmailVerified ? 0.98 : 1 }}
          disabled={isSubmitting || !isEmailVerified}
          className="w-full py-5 bg-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-dark/10 hover:bg-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs relative overflow-hidden"
        >
          <div className="relative z-10">
            {isSubmitting ? "Processing..." : isEmailVerified ? "Submit Application" : "Verify Email to Continue"}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shimmer-fast pointer-events-none" />
        </motion.button>
      </form>
    </div>
  );
}
