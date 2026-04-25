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
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed top-8 left-0 right-0 z-50 px-6 font-montserrat">
      <div className="mx-auto max-w-[1000px]">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-16 px-6 flex items-center justify-between shadow-2xl relative overflow-hidden rounded-2xl border border-white/20 nav-liquid-glass"
        >
          {/* Professional Global Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Outer Glow Ring */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent-gold rounded-full blur-sm"
              />

              <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border border-black/5 overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <Image
                  src="/vgs new logo.png"
                  alt="VGS Logo"
                  width={80}
                  height={80}
                  className="object-contain scale-110"
                  priority
                />
                {/* Glass Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-heading font-black text-dark text-xl md:text-2xl tracking-tighter leading-none uppercase flex items-center gap-1">
                  VGS <span className="text-primary tracking-normal font-bold">Global</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Centered Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-500 ${isActive
                      ? 'bg-primary text-white scale-105 shadow-lg shadow-primary/20'
                      : 'text-dark/60 hover:text-dark hover:bg-black/5'
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
              className="text-dark p-1"
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-20 left-16 right-16 nav-liquid-glass p-4 shadow-3xl lg:hidden z-[60] rounded-2xl"
          >
            <div className="flex flex-col gap-4 items-center">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-lg font-black transition-all ${isActive ? 'text-primary scale-110' : 'text-dark/40 hover:text-dark'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="w-full h-[1px] bg-dark/5 my-2" />
              
              <a
                href="https://wa.me/918096832850"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-2.5 bg-primary text-white rounded-xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
