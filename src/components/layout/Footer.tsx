'use client';

import Link from 'next/link';
import Image from 'next/image';


const footerLinks = {
  services: [
    { name: 'Course Selection', href: '/services/course-selection' },
    { name: 'University Shortlisting', href: '/services/university-shortlisting' },
    { name: 'Application Support', href: '/services/application-support' },
    { name: 'Scholarship Guidance', href: '/services/scholarship-guidance' },
    { name: 'Visa Assistance', href: '/services/visa-assistance' },
    { name: 'Post-Arrival Support', href: '/services/post-arrival-support' },
  ],
  destinations: [
    { name: 'United Kingdom', href: '/destinations/uk' },
    { name: 'United States', href: '/destinations/usa' },
    { name: 'Canada', href: '/destinations/canada' },
    { name: 'Ireland', href: '/destinations/ireland' },
    { name: 'Germany', href: '/destinations/germany' },
    { name: 'France', href: '/destinations/france' },
    { name: 'New Zealand', href: '/destinations/new-zealand' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-white relative overflow-hidden">
      {/* Gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent-gold" />

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1 shadow-lg overflow-hidden border border-white/10">
                <Image 
                  src="/logo3.png" 
                  alt="VGS Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-heading font-bold text-xl">
                  VGS <span className="text-primary">Global</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Beyond Boundaries, Beyond Limits. Your trusted partner for international education consultancy since 2014.
            </p>
            <div className="space-y-3">
              <a href="tel:+918096832850" className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 80968 32850
              </a>
              <a href="mailto:info@vgs.ind.in" className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@vgs.ind.in
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Hyderabad, India
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01' },
                { label: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4 text-gray-400 hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-700" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Destinations
            </h3>
            <ul className="space-y-3">
              {footerLinks.destinations.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-700" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Newsletter */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary-700" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading font-semibold text-white mb-3 text-sm uppercase tracking-widest">
                Stay Updated
              </h4>
              <p className="text-xs text-gray-500 mb-4">Get study abroad tips and updates</p>
              <form className="flex gap-2" onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as any).email.value;
                if (email) {
                  import('sonner').then(({ toast }) => {
                    import('@/components/ui/CustomToast').then(({ CustomToast }) => {
                      toast.custom((t) => (
                        <CustomToast message="Subscribed Successfully!" email={email} type="success" />
                      ));
                    });
                  });
                  (e.target as any).reset();
                }
              }}>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-black transition-all shadow-lg hover:shadow-primary/20"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} VGS Global Educational Consultancy. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Founded by <span className="text-primary-light">Vineetha Medisetti</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
