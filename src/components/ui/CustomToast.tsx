'use client';

import { motion } from 'framer-motion';

interface CustomToastProps {
  message: string;
  email?: string;
  type: 'success' | 'error';
}

export const CustomToast = ({ message, email, type }: CustomToastProps) => (
  <motion.div
    initial={{ y: 50, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 20, opacity: 0, scale: 0.95 }}
    className={`flex items-center gap-4 px-6 py-4 rounded-[2rem] shadow-2xl border backdrop-blur-md ${
      type === 'success' 
        ? 'bg-white/80 border-green-100 text-green-900' 
        : 'bg-white/80 border-red-100 text-red-900'
    }`}
  >
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
      type === 'success' ? 'bg-green-100' : 'bg-red-100'
    }`}>
      {type === 'success' ? '✨' : '⚠️'}
    </div>
    <div>
      <p className="font-bold text-sm leading-tight">{message}</p>
      {email && <p className="text-xs opacity-60 mt-0.5">Confirmation sent to {email}</p>}
    </div>
  </motion.div>
);
