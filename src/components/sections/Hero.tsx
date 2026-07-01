"use client";

import React from "react";
import { siteData } from "@/lib/data";

const Hero: React.FC = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPortfolio = () => {
    document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080C14]/60" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.12)_0%,transparent_60%)] pointer-events-none" />

        {/* Radar / Scope Signature */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,700px)] aspect-square pointer-events-none motion-reduce:hidden">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Grid rings */}
            <circle cx="100" cy="100" r="90" className="fill-none stroke-teal-400/10" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="60" className="fill-none stroke-teal-400/6" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="30" className="fill-none stroke-teal-400/6" strokeWidth="0.5" />
            {/* Crosshairs */}
            <line x1="10" y1="100" x2="190" y2="100" className="stroke-teal-400/8" strokeWidth="0.3" />
            <line x1="100" y1="10" x2="100" y2="190" className="stroke-teal-400/8" strokeWidth="0.3" />
            {/* Sweeping arc */}
            <path
              d="M100,100 L10,100 A90,90 0 0,1 100,10 Z"
              className="fill-teal-400/[0.04]"
              style={{ transformOrigin: "100px 100px", animation: "radar-sweep 4s linear infinite" }}
            />
            {/* Pulse dots */}
            <circle cx="160" cy="60" r="1.5" className="fill-teal-400" style={{ animation: "radar-ping 2s ease-out infinite" }} />
            <circle cx="50" cy="140" r="1" className="fill-teal-400/60" style={{ animation: "radar-ping 2.5s ease-out infinite 0.5s" }} />
            <circle cx="130" cy="170" r="1.2" className="fill-teal-400/80" style={{ animation: "radar-ping 3s ease-out infinite 1s" }} />
            {/* Center dot */}
            <circle cx="100" cy="100" r="2" className="fill-teal-400/40" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-sans text-xs font-medium text-primary tracking-wide">
              SuperSoft Engineering
            </span>
          </div>

          {/* Bold stat headline */}
          <h1 className="font-display text-[clamp(36px,5vw,64px)] font-extrabold tracking-tighter leading-[1.05] text-foreground mb-4 animate-fade-in-up">
            <span className="block">{siteData.stats[0].number}{siteData.stats[0].suffix} products shipped.</span>
            <span className="block mt-1">
              {siteData.stats[1].number}{siteData.stats[1].suffix} years of engineering.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[clamp(15px,1.8vw,19px)] text-foreground-secondary leading-relaxed max-w-[560px] mx-auto mb-10 animate-fade-in-up">
            {siteData.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-20 animate-fade-in-up">
            <button
              onClick={scrollToContact}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 border-none cursor-pointer font-sans text-sm font-semibold text-white tracking-wide transition-all duration-200 shadow-[0_8px_32px_rgba(45,212,191,0.35)] hover:shadow-[0_12px_40px_rgba(45,212,191,0.5)] hover:-translate-y-0.5"
            >
              Start Your Project &rarr;
            </button>
            <button
              onClick={scrollToPortfolio}
              className="px-8 py-3.5 rounded-xl bg-white/[0.06] border border-white/10 cursor-pointer font-sans text-sm font-semibold text-foreground tracking-wide transition-all duration-200 backdrop-blur-md hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
            >
              View Our Work
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in">
          <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-muted">
            Scroll
          </span>
          <div className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-1.5 bg-gradient-to-b from-teal-400 to-transparent rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative py-10 bg-surface border-y border-white/[0.05] overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-center font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-muted/50 mb-6">
            Trusted by leading companies worldwide
          </p>
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...siteData.clientLogos, ...siteData.clientLogos].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center min-w-[130px] px-5 border-r border-white/[0.05]"
                >
                  <span className="font-display text-sm font-bold tracking-tight whitespace-nowrap text-foreground-muted/40 transition-colors duration-200 hover:text-foreground-muted/70">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
