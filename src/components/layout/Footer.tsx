"use client";

import React from "react";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { siteData } from "@/lib/data";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0D1120",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Main footer content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 40,
            padding: "64px 0 48px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background:
                    "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "white",
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
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#64748B",
                lineHeight: 1.7,
                maxWidth: 300,
                marginBottom: 24,
              }}
            >
              {siteData.company.description}
            </p>
            {/* Social links */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#64748B",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(59, 111, 255, 0.12)";
                    el.style.borderColor = "rgba(59, 111, 255, 0.3)";
                    el.style.color = "#5B8AFF";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.04)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.color = "#64748B";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {[
            { title: "Quick Links", items: siteData.footer.quickLinks },
            { title: "Services", items: siteData.footer.services },
            { title: "Industries", items: siteData.footer.industries },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#F8FAFC",
                  letterSpacing: "0.02em",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                {title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "#64748B",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                        lineHeight: 1.5,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#CBD5E1";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#64748B";
                      }}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 0",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#4A5568",
            }}
          >
            © {year} {siteData.company.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#4A5568",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#94A3B8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#4A5568";
                  }}
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
