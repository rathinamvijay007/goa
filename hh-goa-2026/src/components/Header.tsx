'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#faf9f7]/95 backdrop-blur-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">HH</span>
              </div>
              <span className="hidden md:block text-sm font-medium uppercase tracking-wider">
                Goa 2026
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest hover:underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {/* Location/Date - Desktop only */}
              <div className="hidden xl:block text-xs uppercase tracking-wider text-gray-500">
                Goa · Oct 15-18
              </div>
              
              {/* CTA Button */}
              <a
                href="#apply"
                className="hidden md:inline-flex items-center px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Apply
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-black/5 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#faf9f7]"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black flex items-center justify-center">
                    <span className="text-white font-bold text-lg">HH</span>
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Goa 2026
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-black/5 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-6 mt-auto mb-8">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl font-light tracking-tight hover:pl-4 transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <a
                href="#apply"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-4 bg-black text-white text-center text-sm uppercase tracking-widest"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
