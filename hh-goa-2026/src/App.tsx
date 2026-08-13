import { useState } from "react";
import BuilderCardGenerator from "./components/BuilderCardGenerator";
import TeamCardGenerator from "./components/TeamCardGenerator";
import { User, Users } from "lucide-react";

const APPLY = "https://hacker-house-goa-2026.devfolio.co/";

const faqs = [
  {
    q: "Who can participate in Hacker House Goa?",
    a: "Anyone with a passion for building — developers, designers, product people. Teams of 1–3 are encouraged, solo builders welcome.",
  },
  {
    q: "How does the selection process work?",
    a: "Attend the shortlisting tasks, top teams get waitlisted, and the best of the waitlist are selected to attend in person.",
  },
  {
    q: "What should I bring?",
    a: "Laptop, charger, any hardware for your project. We provide workspace, power, WiFi, meals and caffeine.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. Participation is free — accommodation, meals and amenities included. You just get yourself to Goa.",
  },
  {
    q: "Can I start building before the event?",
    a: "Brainstorm and plan all you want, but all code must be written during the residency.",
  },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cardMode, setCardMode] = useState<'individual' | 'team'>('individual');

  return (
    <main className="min-h-screen bg-[#0B5D3B] text-[#FFFFFF] overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#0B5D3B] px-6 md:px-12 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* 2:47 PM Studio Logo */}
          <a href="/" className="flex-shrink-0">
            <img src="/2-47.svg" alt="2:47 PM Studio" className="h-12 md:h-14 w-auto" />
          </a>
          <div className="flex items-center gap-6 md:gap-10">
            <a href="#check-hype" className="label-mono text-[#FFFFFF] hover:text-[#F5C518] transition-colors tracking-[0.2em] text-xs font-semibold">
              CHECK HYPE
            </a>
            <a
              href={APPLY}
              target="_blank"
              rel="noreferrer"
              className="apply-btn"
            >
              APPLY
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B5D3B] flex flex-col justify-between pt-10 md:pt-16 pb-8">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-between flex-1">
          {/* Main Title Container: Hacker House Image + Goa Hindi overlay */}
          <div className="relative w-full max-w-[94vw] md:max-w-[88vw] lg:max-w-[82vw] mx-auto my-auto py-8 md:py-12">
            <h1 className="sr-only">Hacker House Goa</h1>
            <img
              src="/hacker-house.png"
              alt="HACKER HOUSE"
              className="w-full h-auto select-none block"
              draggable={false}
            />
            {/* Goa Hindi SVG overlaid exactly in the middle between HACKER and HOUSE */}
            <img
              src="/goa_hindi.svg"
              alt="गोवा"
              className="absolute select-none goa-hindi-overlay pointer-events-none"
              style={{
                width: '11%',
                top: '44%',
                left: '48.5%',
                transform: 'translate(-50%, -50%)',
              }}
              draggable={false}
            />
          </div>

          {/* Bottom Info Metadata Row */}
          <div className="w-full max-w-[94vw] md:max-w-[88vw] lg:max-w-[82vw] mx-auto flex items-center justify-between mt-8 md:mt-12 mb-8">
            <div>
              <p className="label-mono text-[#F5C518] font-semibold text-xs md:text-sm tracking-[0.2em]">
                GOA, INDIA  ·  28 – 31 OCT 2026
              </p>
            </div>
            <div>
              <p className="label-mono text-[#F5C518] font-semibold text-xs md:text-sm tracking-[0.2em]">
                2:47 PM STUDIO
              </p>
            </div>
          </div>

          {/* Bottom Center Yellow Vertical Line Divider */}
          <div className="flex justify-center mt-2">
            <div className="w-[2px] h-12 md:h-16 bg-[#F5C518]" />
          </div>
        </div>
      </section>

      {/* Full-width Sunset Beach Background Illustration (sun-rise.png) */}
      <div className="w-full relative overflow-hidden bg-[#0B5D3B]">
        {/* Soft, seamless gradient transition overlay removing the harsh horizontal color break */}
        <div className="absolute top-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-b from-[#0B5D3B] via-[#0B5D3B]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-[#084A2E] to-transparent z-10 pointer-events-none" />
        <img
          src="/sun-rise.png"
          alt="Sunrise over Goa Beach"
          className="w-full h-auto block select-none"
          draggable={false}
        />
      </div>

      {/* Ticker */}
      <div className="overflow-hidden border-y-2 border-[#FFFFFF]/20 bg-[#084A2E] py-3">
        <div className="animate-ticker whitespace-nowrap label-mono text-[#6B9A85] font-medium">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="px-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse-glow" />
              247 builders · 4 days · one rhythm · less noise, more signal ·
            </span>
          ))}
        </div>
      </div>

      {/* Builder Pass & PFP Generator Studio */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-6">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-[#F5C518]">ID Card Generator</h2>
          <p className="mt-2 label-mono text-[#B8D4C8]">Less Noise. More Signal. · GOA, INDIA · 28–31 OCT 2026</p>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-3 mb-8" role="tablist">
          <button
            role="tab"
            aria-selected={cardMode === 'individual'}
            onClick={() => setCardMode('individual')}
            className={`tab ${cardMode === 'individual' ? 'active' : ''}`}
          >
            <User className="w-4 h-4 inline-block mr-1.5" />
            Individual
          </button>
          <button
            role="tab"
            aria-selected={cardMode === 'team'}
            onClick={() => setCardMode('team')}
            className={`tab ${cardMode === 'team' ? 'active' : ''}`}
          >
            <Users className="w-4 h-4 inline-block mr-1.5" />
            Team
          </button>
        </div>

        {/* Conditional rendering */}
        {cardMode === 'individual' ? <BuilderCardGenerator /> : <TeamCardGenerator />}
      </section>


      {/* Manifesto Section */}
      <section className="border-y-2 border-[#FFFFFF]/20 bg-[#084A2E]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2">
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.85] text-[#F5C518]">
            Less Noise.<br />More Signal.
          </h2>
          <div className="space-y-5">
            <p className="text-base text-[#B8D4C8] leading-relaxed">
              Most hackathons are hype with no substance. From October 28–31 we take over Goa for
              the country's biggest build station.
            </p>
            <p className="text-sm text-[#6B9A85]">
              This is for the developers who live in their terminals and ship things that matter. No
              fluff, no useless networking — just elite builders, high-speed fiber, and the ocean at
              your doorstep.
            </p>
            <a
              href={APPLY}
              target="_blank"
              rel="noreferrer"
              className="btn btn-magenta"
            >
              Go to Devfolio
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] text-[#F5C518]">FAQs</h2>
        <div className="mt-8 border-t-2 border-[#FFFFFF]/20">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b-2 border-[#FFFFFF]/20">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg text-[#FFFFFF]"
              >
                <span>{f.q}</span>
                <span className="text-3xl text-[#E91E8C]">{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p className="pb-5 text-sm text-[#B8D4C8] leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t-2 border-[#FFFFFF]/20 relative overflow-hidden bg-[#084A2E]">
        {/* Footer Trees Background Element (footer-trees.png) */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <img
            src="/footer-trees.png"
            alt="Footer Palm Trees"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Sunset glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[400px] h-[400px] rounded-full bg-[#F5C518]/5 blur-3xl translate-y-1/2" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-[#F5C518]">HH GOA '26</p>
            <p className="label-mono text-[#6B9A85]">Goa, India · 28–31 Oct 2026</p>
          </div>
          <div className="flex flex-wrap gap-5 label-mono">
            <a href="https://x.com/247pmstudio" target="_blank" rel="noreferrer" className="hover:text-[#F5C518] transition-colors">@247pmstudio</a>
            <a href="https://t.me/twofourtysevenpm" target="_blank" rel="noreferrer" className="hover:text-[#F5C518] transition-colors">Telegram</a>
            <a href="mailto:satapathyprayasu@gmail.com" className="hover:text-[#F5C518] transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}