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
      {/* Decorative SVG elements - white outline style */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Palm tree left */}
        <svg className="absolute -left-10 top-10 w-64 h-80 opacity-20" viewBox="0 0 200 300" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <path d="M100 280 L100 120" />
          <path d="M100 120 Q60 40 10 60" />
          <path d="M100 120 Q80 30 30 10" />
          <path d="M100 120 Q120 30 170 10" />
          <path d="M100 120 Q140 40 190 60" />
          <path d="M100 160 Q50 100 10 120" />
          <path d="M100 160 Q150 100 190 120" />
        </svg>

        {/* Palm tree right */}
        <svg className="absolute -right-10 top-20 w-64 h-80 opacity-20" viewBox="0 0 200 300" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <path d="M100 280 L100 120" />
          <path d="M100 120 Q60 40 10 60" />
          <path d="M100 120 Q80 30 30 10" />
          <path d="M100 120 Q120 30 170 10" />
          <path d="M100 120 Q140 40 190 60" />
          <path d="M100 160 Q50 100 10 120" />
          <path d="M100 160 Q150 100 190 120" />
        </svg>

        {/* Birds */}
        <svg className="absolute right-1/4 top-40 w-8 h-4 opacity-30" viewBox="0 0 20 10" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <path d="M0 5 Q5 0 10 5 Q15 0 20 5" />
        </svg>
        <svg className="absolute right-1/3 top-48 w-6 h-3 opacity-25" viewBox="0 0 20 10" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
          <path d="M0 5 Q5 0 10 5 Q15 0 20 5" />
        </svg>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b-2 border-[#FFFFFF]/20 bg-[#0B5D3B]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <span className="font-display text-3xl tracking-wide text-[#F5C518]">HH GOA '26</span>
          <nav className="hidden items-center gap-7 label-mono md:flex">
            <a href="#generator" className="hover:text-[#F5C518] transition-colors">Pass Studio</a>
            <a href="#faq" className="hover:text-[#F5C518] transition-colors">FAQs</a>
          </nav>
          <a
            href={APPLY}
            target="_blank"
            rel="noreferrer"
            className="btn btn-yellow"
          >
            Apply
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="generator" className="relative overflow-hidden border-b-2 border-[#FFFFFF]/20">
        {/* Sunset/glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#F5C518]/10 blur-3xl" />
        </div>

        {/* Beach illustration elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Waves at bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1920 120" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <path d="M0 80 Q240 40 480 80 Q720 120 960 80 Q1200 40 1440 80 Q1680 120 1920 80" />
            <path d="M0 95 Q240 55 480 95 Q720 135 960 95 Q1200 55 1440 95 Q1680 135 1920 95" />
          </svg>

          {/* Beach chair left */}
          <svg className="absolute bottom-8 left-[15%] w-24 h-24 opacity-30" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <path d="M20 80 L40 30 L60 30 L80 80" />
            <path d="M40 30 L40 50 L80 50 L80 30" />
            <path d="M30 80 L70 80" />
          </svg>

          {/* Beach chair right */}
          <svg className="absolute bottom-8 left-[25%] w-24 h-24 opacity-30" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <path d="M20 80 L40 30 L60 30 L80 80" />
            <path d="M40 30 L40 50 L80 50 L80 30" />
            <path d="M30 80 L70 80" />
          </svg>

          {/* Umbrella */}
          <svg className="absolute bottom-12 left-[18%] w-32 h-32 opacity-30" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <path d="M50 90 L50 40" />
            <path d="M10 40 Q30 10 50 40 Q70 10 90 40" />
            <path d="M20 40 Q35 20 50 40 Q65 20 80 40" />
          </svg>

          {/* Scooter */}
          <svg className="absolute bottom-4 right-[15%] w-28 h-28 opacity-30" viewBox="0 0 100 100" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <circle cx="25" cy="75" r="12" />
            <circle cx="75" cy="75" r="12" />
            <path d="M25 75 L35 45 L55 40 L75 75" />
            <path d="M35 45 L30 35 L40 30 L55 40" />
            <path d="M55 40 L65 35 L70 40" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <div className="text-center">
            <h1 className="font-display text-[clamp(4rem,14vw,10rem)] leading-[0.82] text-[#F5C518] drop-shadow-[0_4px_20px_rgba(245,197,24,0.3)]">
              HACKER HOUSE
            </h1>

            {/* Goa badge */}
            <div className="mt-4 inline-flex items-center">
              <span className="bg-[#E91E8C] text-[#FFFFFF] px-5 py-2 rounded-full font-display text-xl tracking-wide border-2 border-[#FFFFFF]">
                गोवा
              </span>
            </div>

            <p className="mt-4 label-mono text-[#B8D4C8] font-medium">
              GOA, INDIA · 28–31 OCT 2026
            </p>

            <p className="mt-6 max-w-xl mx-auto text-sm text-[#B8D4C8] leading-relaxed">
              Less noise. More signal. A residency for builders who ship.
            </p>
          </div>
        </div>
      </section>

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

      {/* Stats Signpost Section */}
      <section className="border-y-2 border-[#FFFFFF]/20 py-16 px-5">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-6">
            {/* Signpost pole */}
            <div className="w-3 bg-[#FFFFFF] rounded-sm self-center" style={{ height: '400px' }} />

            {/* Stats arrows */}
            <div className="flex flex-col gap-4 w-full max-w-3xl">
              {/* 6800+ registrations */}
              <div className="flex items-center gap-4">
                <div className="signpost signpost-yellow signpost-arrow px-6 py-3 flex items-center gap-3 min-w-[280px]">
                  <span className="font-display text-3xl text-[#0B5D3B]">6800+</span>
                  <span className="label-mono text-[#0B5D3B]">REGISTRATIONS<br/>2024</span>
                </div>
              </div>

              {/* 390+ hackers */}
              <div className="flex items-center gap-4 justify-end">
                <div className="signpost signpost-magenta signpost-arrow-reverse px-6 py-3 flex items-center gap-3 min-w-[280px]">
                  <span className="font-display text-3xl text-[#FFFFFF]">390+</span>
                  <span className="label-mono text-[#FFFFFF]">HACKERS</span>
                </div>
              </div>

              {/* 100 projects */}
              <div className="flex items-center gap-4">
                <div className="signpost signpost-yellow signpost-arrow px-6 py-3 flex items-center gap-3 min-w-[280px]">
                  <span className="font-display text-3xl text-[#0B5D3B]">100</span>
                  <span className="label-mono text-[#0B5D3B]">PROJECTS</span>
                </div>
              </div>

              {/* $50K+ bounties */}
              <div className="flex items-center gap-4 justify-end">
                <div className="signpost signpost-magenta signpost-arrow-reverse px-6 py-3 flex items-center gap-3 min-w-[280px]">
                  <span className="font-display text-3xl text-[#FFFFFF]">$50K+</span>
                  <span className="label-mono text-[#FFFFFF]">BOUNTIES<br/>2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      <footer className="border-t-2 border-[#FFFFFF]/20 relative overflow-hidden">
        {/* Sunset glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[400px] h-[400px] rounded-full bg-[#F5C518]/5 blur-3xl translate-y-1/2" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
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