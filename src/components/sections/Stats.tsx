"use client";

import React from "react";
import { siteData } from "@/lib/data";

const extraStats = [
  { value: "24/7", label: "Support Available" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "48h", label: "Avg. Response Time" },
];

const Stats: React.FC = () => {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "#05080F",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle gradient for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59, 111, 255, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating orbs */}
      <div
        className="orb-1"
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 111, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="orb-2"
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="orb-3"
        style={{
          position: "absolute",
          bottom: "15%",
          right: "25%",
          width: 400,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
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
        {/* Header */}
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
              Our Impact
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
            Numbers That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Speak Volumes
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            Milestones that reflect our commitment to excellence and our
            clients&apos; success.
          </p>
        </div>

        {/* Main stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 16,
            backdropFilter: "blur(10px)",
          }}
        >
          {siteData.stats.map((stat, index) => (
            <div
              key={index}
              style={{
                padding: "48px 32px",
                textAlign: "center",
                borderRight:
                  index < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                position: "relative",
                overflow: "hidden",
                background: "rgba(13, 17, 32, 0.6)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 2,
                  background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
                  borderRadius: "0 0 4px 4px",
                }}
              />
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 4,
                }}
              >
                {stat.number}{stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#64748B",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Extra stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {extraStats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "28px 24px",
                borderRadius: 14,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  background:
                    "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#64748B",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
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
  );
};

export default Stats;
