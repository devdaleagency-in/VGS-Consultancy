'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

interface OTPVerificationProps {
  email: string;
  onVerified: (isVerified: boolean) => void;
}

export default function OTPVerification({ email, onVerified }: OTPVerificationProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const sendOTP = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email address first');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setOtpSent(true);
      setCountdown(60); // 60s cooldown
      toast.success('Verification code sent to your email');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Verification failed');

      setIsVerified(true);
      onVerified(true);
      toast.success('Email verified successfully');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 rounded-xl border border-green-100 mt-2">
        <span className="text-lg">✅</span>
        <span className="text-xs font-black uppercase tracking-widest">Email Verified</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2">
      <AnimatePresence mode="wait">
        {!otpSent ? (
          <motion.div
            key="send"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              type="button"
              onClick={sendOTP}
              disabled={loading || countdown > 0}
              className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Verify Email via OTP'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="verify"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
          >
            <div className="flex-1 space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-dark/40 ml-4">6-Digit Code</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-primary/20 transition-all font-black text-center text-base tracking-[0.3em] outline-none h-[50px]"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={verifyOTP}
                disabled={loading || otp.length !== 6}
                className="px-4 py-3 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all disabled:opacity-50 h-[50px] min-w-[100px]"
              >
                {loading ? '...' : 'Verify'}
              </button>
              <button
                type="button"
                onClick={sendOTP}
                disabled={loading || countdown > 0}
                className="px-3 py-3 bg-gray-100 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50 h-[50px]"
              >
                {countdown > 0 ? countdown : '↺'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
