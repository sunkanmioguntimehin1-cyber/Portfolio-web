"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const CALENDLY_URL = "https://calendly.com/sunkanmi";
const GOOGLE_VOICE_NUMBER = "+1 (555) 987-6663";
const GOOGLE_VOICE_TEL = "+15559876663";
// ─────────────────────────────────────────────────────────────────────────────

const CalendlyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const iframeSrc = `${CALENDLY_URL}?embed_domain=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&embed_type=Inline&hide_gdpr_banner=1&background_color=0D1120&text_color=F8FAFC&primary_color=3B6FFF`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.78)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 999,
          animation: "cly-fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "min(920px, 95vw)",
          height: "min(720px, 90vh)",
          borderRadius: 20,
          overflow: "hidden",
          background: "#0D1120",
          border: "1px solid rgba(59, 111, 255, 0.25)",
          boxShadow:
            "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(59,111,255,0.1)",
          display: "flex",
          flexDirection: "column",
          animation: "cly-slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Modal header bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            flexShrink: 0,
            background: "#0D1120",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #0069FF, #004ECC)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}
            >
              📅
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#F8FAFC",
                  letterSpacing: "-0.01em",
                }}
              >
                Schedule a Call
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#64748B",
                }}
              >
                calendly.com/sunkanmi · Pick a time that works for you
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748B",
              fontSize: 16,
              lineHeight: 1,
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
              e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
              e.currentTarget.style.color = "#EF4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#64748B";
            }}
          >
            ✕
          </button>
        </div>

        {/* Iframe + loading overlay */}
        <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
          <div
            id="cly-loader"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              background: "#0D1120",
              zIndex: 2,
              transition: "opacity 0.3s ease",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                border: "3px solid rgba(59, 111, 255, 0.2)",
                borderTopColor: "#3B6FFF",
                borderRadius: "50%",
                animation: "cly-spin 0.75s linear infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#64748B",
              }}
            >
              Loading your calendar…
            </span>
          </div>

          <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a call"
            style={{
              display: "block",
              border: "none",
              height: "100%",
              minHeight: 580,
            }}
            onLoad={() => {
              const loader = document.getElementById("cly-loader");
              if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => {
                  loader.style.display = "none";
                }, 300);
              }
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes cly-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cly-slideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 28px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes cly-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────

const Contact: React.FC = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [scheduleHovered, setScheduleHovered] = useState(false);

  return (
    <>
      <CalendlyModal
        isOpen={calendlyOpen}
        onClose={() => setCalendlyOpen(false)}
      />

      <section
        id="contact"
        style={{
          padding: "120px 0",
          background: "#05080F",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59, 111, 255, 0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            position: "relative",
          }}
        >
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#5B8AFF",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Get In Touch
              </span>
              <div
                style={{
                  width: 24,
                  height: 2,
                  background: "linear-gradient(135deg, #7C3AED, #3B6FFF)",
                  borderRadius: 1,
                }}
              />
            </div>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#F8FAFC",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Ready to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build Together?
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                color: "#64748B",
                lineHeight: 1.7,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              {siteData.contact.subtitle}
            </p>
          </div>

          {/* Card */}
          <div
            style={{
              maxWidth: 900,
              margin: "0 auto",
              borderRadius: 24,
              border: "1px solid rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
              className="contact-inner-grid"
            >
              {/* Left – contact info */}
              <div
                style={{
                  padding: "48px 44px",
                  background: "rgba(59, 111, 255, 0.06)",
                  borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#F8FAFC",
                    letterSpacing: "-0.02em",
                    marginBottom: 32,
                  }}
                >
                  Contact Information
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    marginBottom: 40,
                  }}
                >
                  {[
                    {
                      emoji: "📧",
                      label: "Email",
                      value: siteData.contact.email,
                      href: `mailto:${siteData.contact.email}`,
                    },
                    {
                      emoji: "📞",
                      label: "Phone (Google Voice)",
                      value: GOOGLE_VOICE_NUMBER,
                      href: `tel:${GOOGLE_VOICE_TEL}`,
                    },
                    {
                      emoji: "📍",
                      label: "HQ",
                      value: siteData.contact.address,
                      href: undefined,
                    },
                  ].map(({ emoji, label, value, href }) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: "rgba(59, 111, 255, 0.15)",
                          border: "1px solid rgba(59, 111, 255, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {emoji}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#64748B",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 4,
                          }}
                        >
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 14,
                              color: "#94A3B8",
                              textDecoration: "none",
                            }}
                          >
                            {value}
                          </a>
                        ) : (
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 14,
                              color: "#94A3B8",
                            }}
                          >
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Offices */}
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 16,
                    }}
                  >
                    Global Offices
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    {siteData.contact.officeLocations.map((loc) => (
                      <div
                        key={loc}
                        style={{
                          padding: "8px 12px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          color: "#94A3B8",
                        }}
                      >
                        🌍 {loc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right – CTA */}
              <div
                style={{
                  padding: "48px 44px",
                  background: "#0D1120",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 26,
                    fontWeight: 800,
                    color: "#F8FAFC",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    marginBottom: 16,
                  }}
                >
                  Let&apos;s start a conversation
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 1.7,
                    marginBottom: 36,
                  }}
                >
                  Whether you have a detailed spec or just an idea — we&apos;re
                  here to help you shape it into reality.
                </p>

                {/* Promise items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginBottom: 40,
                  }}
                >
                  {[
                    {
                      icon: "⚡",
                      title: "Quick Response",
                      desc: "Reply within 24 hours",
                    },
                    {
                      icon: "🎯",
                      title: "Free Consultation",
                      desc: "No-obligation assessment",
                    },
                    {
                      icon: "🚀",
                      title: "Fast Start",
                      desc: "Kickoff within 1 week",
                    },
                  ].map(({ icon, title, desc }) => (
                    <div
                      key={title}
                      style={{ display: "flex", gap: 12, alignItems: "center" }}
                    >
                      <span style={{ fontSize: 18, flexShrink: 0 }}>
                        {icon}
                      </span>
                      <div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#CBD5E1",
                          }}
                        >
                          {title}{" "}
                        </span>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 13,
                            color: "#64748B",
                          }}
                        >
                          — {desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {/* Email */}
                  <button
                    onClick={() =>
                      window.open(`mailto:${siteData.contact.email}`)
                    }
                    style={{
                      padding: "14px 24px",
                      borderRadius: 12,
                      background:
                        "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "white",
                      transition: "all 0.25s ease",
                      boxShadow: "0 8px 24px rgba(59, 111, 255, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 32px rgba(59, 111, 255, 0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(59, 111, 255, 0.3)";
                    }}
                  >
                    Send Us an Email
                  </button>

                  {/* Calendly CTA */}
                  <button
                    onClick={() => setCalendlyOpen(true)}
                    onMouseEnter={() => setScheduleHovered(true)}
                    onMouseLeave={() => setScheduleHovered(false)}
                    style={{
                      padding: "14px 24px",
                      borderRadius: 12,
                      background: scheduleHovered
                        ? "rgba(59, 111, 255, 0.1)"
                        : "transparent",
                      border: `1px solid ${scheduleHovered ? "rgba(59, 111, 255, 0.5)" : "rgba(255,255,255,0.1)"}`,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: scheduleHovered ? "#5B8AFF" : "#94A3B8",
                      transition: "all 0.25s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: 16 }}>📅</span>
                    Schedule a Call
                  </button>
                </div>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    color: "#334155",
                    marginTop: 12,
                    textAlign: "center",
                    letterSpacing: "0.01em",
                  }}
                >
                  Powered by Calendly · Pick any available time slot
                </p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .contact-inner-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
};

export default Contact;
