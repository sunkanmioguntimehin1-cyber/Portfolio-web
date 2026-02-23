"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: isScrolled ? "rgba(5, 8, 15, 0.92)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "white",
              flexShrink: 0,
            }}
          >
            S
          </div>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 18,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
            }}
          >
            {siteData.company.name}
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            gap: 4,
          }}
          className="desktop-nav"
        >
          {siteData.navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#94A3B8",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#F8FAFC";
                (e.target as HTMLElement).style.background =
                  "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#94A3B8";
                (e.target as HTMLElement).style.background = "none";
              }}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => handleNavClick("#contact")}
            style={{
              display: "none",
              padding: "10px 20px",
              borderRadius: 10,
              background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.01em",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(59, 111, 255, 0.3)",
            }}
            className="cta-btn"
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-1px)";
              (e.target as HTMLElement).style.boxShadow =
                "0 8px 24px rgba(59, 111, 255, 0.45)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow =
                "0 4px 16px rgba(59, 111, 255, 0.3)";
            }}
          >
            Let&apos;s Talk
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              width: 40,
              height: 40,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: 10,
            }}
            className="hamburger-btn"
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#F8FAFC",
                borderRadius: 1,
                transition: "all 0.3s",
                transform: isMobileMenuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#F8FAFC",
                borderRadius: 1,
                transition: "all 0.3s",
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 18,
                height: 1.5,
                background: "#F8FAFC",
                borderRadius: 1,
                transition: "all 0.3s",
                transform: isMobileMenuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isMobileMenuOpen ? "400px" : "0",
          transition: "max-height 0.4s ease",
          background: "rgba(5, 8, 15, 0.97)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
        className="mobile-menu"
      >
        <div style={{ padding: "12px 24px 24px" }}>
          {siteData.navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "12px 16px",
                borderRadius: 8,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: "#94A3B8",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#F8FAFC";
                (e.target as HTMLElement).style.background =
                  "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#94A3B8";
                (e.target as HTMLElement).style.background = "none";
              }}
            >
              {item.name}
            </button>
          ))}
          <div
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <button
              onClick={() => handleNavClick("#contact")}
              style={{
                width: "100%",
                padding: "12px 20px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: "white",
              }}
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .cta-btn { display: block !important; }
          .hamburger-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
