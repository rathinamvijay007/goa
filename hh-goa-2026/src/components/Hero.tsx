'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background image composition */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-full md:w-3/5 h-full bg-gray-100">
          <Image
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1600&h=1200&fit=crop&q=80"
            alt="Developers collaborating"
            fill
            className="object-cover grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#faf9f7]/50 to-[#faf9f7]" />
        </div>
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-6 md:px-12 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] mb-6 md:mb-8"
          >
            Goa, India · October 15-18, 2026
          </motion.p>

          {/* Massive headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-giant font-light leading-[0.85] tracking-tighter mb-8 md:mb-12"
          >
            BUILD<br />
            SOMETHING<br />
            THAT<br />
            MATTERS.
          </motion.h1>

          {/* Provocative paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl max-w-xl mb-10 md:mb-12 leading-relaxed"
          >
            A four-day residency for builders, hackers and creators 
            who would rather ship than talk.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-4 md:gap-6"
          >
            <a
              href="#apply"
              className="inline-flex items-center px-8 py-4 md:px-10 md:py-5 bg-black text-white text-xs md:text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors group"
            >
              Apply Now
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="#experience"
              className="inline-flex items-center px-8 py-4 md:px-10 md:py-5 border-2 border-black text-black text-xs md:text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Explore
            </a>
          </motion.div>

          {/* Timestamp/location metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 md:mt-16 flex flex-wrap gap-8 text-xs uppercase tracking-wider text-gray-500"
          >
            <div>
              <span className="block text-black font-medium">Location</span>
              Anjuna, Goa
            </div>
            <div>
              <span className="block text-black font-medium">Duration</span>
              4 Days / 96 Hours
            </div>
            <div>
              <span className="block text-black font-medium">Capacity</span>
              500 Builders
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative grid lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
      <div className="absolute top-0 bottom-0 left-0 w-px bg-black/10 hidden md:block" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-black/10 hidden md:block" />
    </section>
  );
}
