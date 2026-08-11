import { useState } from "react";
import BuilderCardGenerator from "./components/BuilderCardGenerator";
import heroSun from "./assets/hero-sun.jpg";
import footerTrees from "./assets/footer-trees.jpg";

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

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b-2 border-ink bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <span className="font-display text-3xl tracking-wide text-ink">HH GOA ’26</span>
          <nav className="hidden items-center gap-7 label-mono md:flex">
            <a href="#generator" className="hover:text-sun transition-colors">Pass Studio</a>
            <a href="#faq" className="hover:text-sun transition-colors">FAQs</a>
          </nav>
          <a
            href={APPLY}
            target="_blank"
            rel="noreferrer"
            className="border-2 border-ink bg-sun px-4 py-2 label-mono text-ink font-bold shadow-[3px_3px_0_0_var(--ink)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Apply
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <img
          src={heroSun}
          alt="Sun setting behind palm trees over the ocean in Goa"
          width={1536}
          height={900}
          className="h-[52vh] w-full object-cover md:h-[62vh]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-5">
          <div className="text-center">
            <h1 className="font-display text-[16vw] leading-[0.82] text-ink md:text-[10rem] drop-shadow-md">
              HACKER HOUSE
            </h1>
            <p className="mt-3 label-mono text-ink font-bold bg-background/80 inline-block px-4 py-1.5 border border-ink">
              Goa, India · 28–31 Oct 2026
            </p>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-3.5">
        <div className="animate-ticker whitespace-nowrap label-mono text-ink-foreground font-semibold">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="px-6">
              247 builders · 4 days · one rhythm · less noise, more signal ·
            </span>
          ))}
        </div>
      </div>

      {/* Builder Pass & PFP Generator Studio */}
      <BuilderCardGenerator />

      {/* Manifesto Section */}
      <section className="border-y-2 border-ink bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2">
          <h2 className="text-6xl md:text-8xl font-display text-ink-foreground">Less Noise.<br />More Signal.</h2>
          <div className="space-y-5">
            <p className="text-lg">
              Most hackathons are hype with no substance. From October 28–31 we take over Goa for the
              country’s biggest build station.
            </p>
            <p className="text-sm opacity-80">
              This is for the developers who live in their terminals and ship things that matter. No
              fluff, no useless networking — just elite builders, high-speed fiber, and the ocean at
              your doorstep.
            </p>
            <a
              href={APPLY}
              target="_blank"
              rel="noreferrer"
              className="inline-block border-2 border-sun bg-sun px-6 py-3 label-mono text-ink font-bold shadow-[3px_3px_0_0_var(--sun)] hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
            >
              Go to Devfolio
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-5xl md:text-6xl text-ink">FAQs</h2>
        <div className="mt-8 border-t-2 border-ink">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b-2 border-ink">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold"
              >
                <span className="text-lg text-ink">{f.q}</span>
                <span className="font-display text-4xl text-sun">{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && <p className="pb-5 text-sm text-muted-foreground">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t-2 border-ink">
        <img
          src={footerTrees}
          alt="Palm tree silhouettes"
          width={1536}
          height={560}
          loading="lazy"
          className="h-40 w-full object-cover md:h-56"
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t-2 border-ink px-5 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-3xl text-ink">HH GOA ’26</p>
            <p className="label-mono text-muted-foreground">Goa, India · 28–31 Oct 2026</p>
          </div>
          <div className="flex flex-wrap gap-5 label-mono">
            <a href="https://x.com/247pmstudio" target="_blank" rel="noreferrer" className="hover:text-sun transition-colors">@247pmstudio</a>
            <a href="https://t.me/twofourtysevenpm" target="_blank" rel="noreferrer" className="hover:text-sun transition-colors">Telegram</a>
            <a href="mailto:satapathyprayasu@gmail.com" className="hover:text-sun transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
