'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'vgs-admin-2024') {
      localStorage.setItem('vgs_admin_pass', password);
      router.push('/admin/dashboard');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6 selection:bg-primary selection:text-white">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/5 select-none">
            ADMIN
         </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl">
            🔒
          </div>
          <h1 className="text-3xl font-heading font-black text-white mb-2 uppercase tracking-tighter">VGS Access</h1>
          <p className="text-white/40 font-medium text-sm">Enterprise Management Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3 ml-1">Secure Passkey</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold focus:outline-none focus:border-primary transition-all placeholder:text-white/10"
              required
            />
          </div>

          {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-widest text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-dark transition-all shadow-xl shadow-primary/20"
          >
            Authenticate →
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
           <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">© 2024 VGS Global Academy. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
}
