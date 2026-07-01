"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";
import GetInTouchModal from "@/components/sections/GetInTouchModal";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [getInTouchOpen, setGetInTouchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isScrolled
          ? "bg-background/92 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-6 h-[72px] flex items-center justify-between gap-8">
        {/* Logo */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-[10px] flex items-center justify-center font-display font-bold text-base text-white flex-shrink-0">
            S
          </div>
          <span className="font-display font-bold text-lg text-foreground tracking-tight">
            {siteData.company.name}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {siteData.navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="px-4 py-2 rounded-lg font-sans text-sm font-medium text-foreground-muted transition-all duration-200 hover:text-foreground hover:bg-white/5"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:block px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-teal-400 to-cyan-500 border-none cursor-pointer font-sans text-sm font-semibold text-white tracking-wide transition-all duration-200 shadow-[0_4px_16px_rgba(45,212,191,0.3)] hover:shadow-[0_8px_24px_rgba(45,212,191,0.45)] hover:-translate-y-[1px]"
          >
            Let&apos;s Talk
          </button>

          <button
            onClick={() => setGetInTouchOpen(true)}
            className="hidden md:block px-5 py-2.5 rounded-[10px] bg-white/[0.06] border border-white/10 cursor-pointer font-sans text-sm font-semibold text-foreground tracking-wide transition-all duration-200 backdrop-blur-md hover:bg-white/10 hover:border-white/20"
          >
            Send us an email
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] cursor-pointer flex flex-col items-center justify-center gap-[5px] p-2.5"
            aria-label="Toggle menu"
          >
            <span className={cn(
              "block w-[18px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300",
              isMobileMenuOpen && "translate-y-[6.5px] rotate-45"
            )} />
            <span className={cn(
              "block w-[18px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300",
              isMobileMenuOpen && "opacity-0"
            )} />
            <span className={cn(
              "block w-[18px] h-[1.5px] bg-foreground rounded-sm transition-all duration-300",
              isMobileMenuOpen && "-translate-y-[6.5px] -rotate-45"
            )} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-400 bg-background/97 border-t border-white/[0.06]",
          isMobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        )}
      >
        <div className="p-3 px-6 pb-6">
          {siteData.navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left bg-none border-none cursor-pointer px-4 py-3 rounded-lg font-sans text-sm font-medium text-foreground-muted transition-all duration-200 hover:text-foreground hover:bg-white/[0.04]"
            >
              {item.name}
            </button>
          ))}
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            <button
              onClick={() => handleNavClick("#contact")}
              className="w-full py-3 px-5 rounded-[10px] bg-gradient-to-r from-teal-400 to-cyan-500 border-none cursor-pointer font-sans text-sm font-semibold text-white"
            >
              Let&apos;s Talk
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setGetInTouchOpen(true);
              }}
              className="w-full mt-2 py-3 px-5 rounded-[10px] bg-white/[0.06] border border-white/10 cursor-pointer font-sans text-sm font-semibold text-foreground"
            >
              Send us an email
            </button>
          </div>
        </div>
      </div>

      <GetInTouchModal
        isOpen={getInTouchOpen}
        onClose={() => setGetInTouchOpen(false)}
      />
    </header>
  );
};

export default Header;
