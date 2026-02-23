"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";

const ANIMATED_TEXTS = [
  "Web Development",
  "Mobile Apps",
  "AI Solutions",
  "Cloud Architecture",
];

const TrustedLogos = [
  "Google",
  "Microsoft",
  "Amazon",
  "Salesforce",
  "Meta",
  "Netflix",
  "Stripe",
  "Shopify",
  "Slack",
  "Figma",
];

const Hero: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = ANIMATED_TEXTS[currentTextIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((i) => (i + 1) % ANIMATED_TEXTS.length);
        }
      }
    };
    const timeout = setTimeout(handleTyping, isDeleting ? 45 : 90);
    return () => clearTimeout(timeout);
  }, [charIndex, currentTextIndex, isDeleting]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPortfolio = () => {
    document
      .querySelector("#portfolio")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          paddingTop: 80,
          paddingBottom: 0,
        }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
          }}
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5, 8, 15, 0.5)",
          }}
        />

        {/* Subtle gradient for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59, 111, 255, 0.1) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-1"
          style={{
            position: "absolute",
            top: "5%",
            left: "10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 111, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-2"
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />
        <div
          className="orb-3"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "30%",
            width: 500,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0, 212, 170, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px 6px 8px",
              borderRadius: 100,
              background: "rgba(59, 111, 255, 0.1)",
              border: "1px solid rgba(59, 111, 255, 0.2)",
              marginBottom: 32,
              animation: "fadeInUp 0.6s ease-out both",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "rgba(59, 111, 255, 0.2)",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#3B6FFF",
                  display: "block",
                  animation: "pulse 2s infinite",
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: "#5B8AFF",
                letterSpacing: "0.02em",
              }}
            >
              Welcome to SuperSoft Engineering
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(42px, 7vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#F8FAFC",
              marginBottom: 20,
              animation: "fadeInUp 0.7s ease-out 0.1s both",
            }}
          >
            {siteData.hero.title}
          </h1>

          {/* Animated typewriter line */}
          <div
            style={{
              height: "clamp(40px, 5vw, 60px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              animation: "fadeInUp 0.7s ease-out 0.2s both",
            }}
          >
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(24px, 4vw, 44px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayedText}
              <span
                style={{
                  WebkitTextFillColor: "#3B6FFF",
                  opacity: 1,
                  animation: "blink 1s step-end infinite",
                }}
              >
                |
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              color: "#94A3B8",
              lineHeight: 1.7,
              maxWidth: 580,
              margin: "0 auto 48px",
              animation: "fadeInUp 0.7s ease-out 0.3s both",
            }}
          >
            {siteData.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginBottom: 72,
              animation: "fadeInUp 0.7s ease-out 0.4s both",
            }}
          >
            <button
              onClick={scrollToContact}
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "white",
                letterSpacing: "0.01em",
                transition: "all 0.25s ease",
                boxShadow: "0 8px 32px rgba(59, 111, 255, 0.35)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 40px rgba(59, 111, 255, 0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 8px 32px rgba(59, 111, 255, 0.35)";
              }}
            >
              Start Your Project →
            </button>
            <button
              onClick={scrollToPortfolio}
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#F8FAFC",
                letterSpacing: "0.01em",
                transition: "all 0.25s ease",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255, 255, 255, 0.1)";
                el.style.borderColor = "rgba(255, 255, 255, 0.2)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255, 255, 255, 0.06)";
                el.style.borderColor = "rgba(255, 255, 255, 0.1)";
                el.style.transform = "translateY(0)";
              }}
            >
              View Our Work
            </button>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              maxWidth: 720,
              margin: "0 auto 80px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
              animation: "fadeInUp 0.7s ease-out 0.5s both",
            }}
          >
            {siteData.stats.slice(0, 4).map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "24px 16px",
                  textAlign: "center",
                  borderRight:
                    i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  background: "rgba(13, 17, 32, 0.6)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    background:
                      "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 4,
                  }}
                >
                  {stat.number}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#64748B",
                    letterSpacing: "0.03em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeIn 1s ease-out 1s both",
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#64748B",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 24,
              height: 38,
              border: "1.5px solid rgba(255,255,255,0.15)",
              borderRadius: 12,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "5px 0",
            }}
          >
            <div
              style={{
                width: 4,
                height: 8,
                background: "linear-gradient(180deg, #3B6FFF, transparent)",
                borderRadius: 2,
                animation: "scrollDot 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        <style>{`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          @keyframes scrollDot {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(14px); opacity: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Animated gradient orbs */
          .orb-1 {
            animation: floatOrb1 12s ease-in-out infinite;
          }
          .orb-2 {
            animation: floatOrb2 10s ease-in-out infinite;
          }
          .orb-3 {
            animation: floatOrb3 14s ease-in-out infinite;
          }

          @keyframes floatOrb1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(30px, -40px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.95); }
            75% { transform: translate(40px, 30px) scale(1.05); }
          }

          @keyframes floatOrb2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(-30px, 20px) scale(1.1); }
            50% { transform: translate(20px, -30px) scale(0.9); }
            75% { transform: translate(-20px, -20px) scale(1.05); }
          }

          @keyframes floatOrb3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, 30px) scale(1.15); }
            50% { transform: translate(-30px, -20px) scale(0.95); }
            75% { transform: translate(10px, -40px) scale(1.1); }
          }
        `}</style>
      </section>

      {/* Trusted By Section */}
      <div
        style={{
          background: "#0D1120",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "40px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#4A5568",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Trusted by leading companies worldwide
          </p>

          {/* Marquee */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            <div
              style={{
                display: "flex",
                width: "max-content",
                animation: "marquee 25s linear infinite",
                gap: 0,
              }}
            >
              {[...TrustedLogos, ...TrustedLogos].map((name, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 140,
                    padding: "0 24px",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#334155",
                      letterSpacing: "-0.01em",
                      transition: "color 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </>
  );
};

export default Hero;
