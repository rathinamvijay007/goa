'use client';

import { motion } from 'framer-motion';

export default function Marquee() {
  const items = ['BUILD', 'SHIP', 'LAUNCH', 'REPEAT'];
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-8 md:py-12 border-y-2 border-black bg-black text-[#faf9f7] overflow-hidden">
      <div className="marquee-container">
        <motion.div
          className="marquee-content inline-block"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          {duplicatedItems.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center mx-4 md:mx-8 text-4xl md:text-6xl font-light tracking-tight"
            >
              {item}
              <span className="mx-4 md:mx-8 text-2xl md:text-4xl">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Secondary ticker */}
      <div className="marquee-container mt-4 md:mt-6">
        <motion.div
          className="marquee-content inline-block text-xs uppercase tracking-widest"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {[
            'GOA · OCTOBER 2026',
            '500+ BUILDERS',
            '$50K+ BOUNTIES',
            '4 DAYS',
            '24/7 BUILD MODE',
            'GOA · OCTOBER 2026',
            '500+ BUILDERS',
            '$50K+ BOUNTIES',
            '4 DAYS',
            '24/7 BUILD MODE',
          ].map((item, index) => (
            <span key={index} className="inline-block mx-8">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
