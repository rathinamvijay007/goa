import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HH Goa 2026 | Builder Residency",
  description: "A four-day residency for builders, hackers and creators who would rather ship than talk. Goa, India · October 2026",
  keywords: ["hackathon", "goa", "builder", "developer", "tech event", "residency"],
  openGraph: {
    title: "HH Goa 2026",
    description: "Build Something That Matters",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
