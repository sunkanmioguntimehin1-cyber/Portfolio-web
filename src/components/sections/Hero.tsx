"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";
import Button from "../ui/Button";

const Hero: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  const texts = siteData.hero.animatedTexts;

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Move to next text
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, currentTextIndex, isDeleting, texts]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-64 h-64 md:w-96 md:h-96 bg-violet-600/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/2 w-56 h-56 md:w-80 md:h-80 bg-cyan-500/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse-slow"></span>
            <span className="text-sm text-foreground-secondary">
              Welcome to SuperSoft Engineering
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-slide-up leading-tight">
            <span className="text-foreground">{siteData.hero.title}</span>
          </h1>

          {/* Animated text */}
          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 min-h-[3rem] animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <span className="gradient-text">
              {displayedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-foreground-secondary mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {siteData.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            {siteData.hero.ctaButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.primary ? "primary" : "secondary"}
                size="lg"
                href={button.href}
                className="min-w-[200px]"
              >
                {button.text}
              </Button>
            ))}
          </div>

          {/* Stats preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.8s" }}>
            {siteData.stats.slice(0, 4).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-sm text-foreground-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="flex flex-col items-center text-foreground-secondary">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-foreground-secondary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-foreground-secondary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;