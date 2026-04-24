'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Success Stories', href: '/success-stories' },
  { name: 'Services', href: '/services' },
  { name: 'Support', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 font-montserrat">
      <div className="max-w-[1000px] mx-auto">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="nav-pill px-6 h-16 flex items-center justify-between shadow-2xl"
        >
          {/* Professional Global Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-tr from-[#7FA847] to-[#003366] rounded-full blur-sm"
              />

              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/logo3.png"
                  alt="VGS Logo"
                  width={60}
                  height={60}
                  className="object-contain scale-125"
                  priority
                />
                {/* Glass Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-black text-white text-2xl tracking-tighter leading-none uppercase">
                  VGS
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[1px] w-4 bg-[#7FA847]/50" />
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-[0.3em] leading-none whitespace-nowrap">
                 Consultancy
                </span>
              </div>
            </div>
          </Link>

          {/* Centered Links */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${isActive
                      ? 'bg-primary text-white scale-105 shadow-[0_0_20px_rgba(0,51,102,0.3)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle Only */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 left-6 right-6 bg-dark rounded-[2.5rem] p-8 shadow-2xl border border-white/5 lg:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-xl font-black transition-colors ${isActive ? 'text-primary' : 'text-white hover:text-primary'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
