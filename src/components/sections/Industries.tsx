"use client";

import React, { useState } from "react";
import { siteData } from "@/lib/data";

const Industries: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="industries"
      style={{
        padding: "120px 0",
        background: "#0D1120",
        position: "relative",
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

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
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
              Who We Help
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
            Industries We{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Serve
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Deep domain expertise across multiple industries, delivering
            tailored solutions that drive innovation and growth.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {siteData.industries.map((industry) => (
            <div
              key={industry.id}
              onMouseEnter={() => setHoveredId(industry.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "28px",
                borderRadius: 16,
                background:
                  hoveredId === industry.id
                    ? "rgba(59, 111, 255, 0.08)"
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredId === industry.id ? "rgba(59, 111, 255, 0.3)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.25s ease",
                cursor: "pointer",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 16 }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background:
                      hoveredId === industry.id
                        ? "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)"
                        : "rgba(59, 111, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.25s ease",
                  }}
                >
                  <span
                    style={{
                      color: hoveredId === industry.id ? "white" : "#5B8AFF",
                    }}
                  >
                    {industry.icon}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 8,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#E2E8F0",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {industry.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 18,
                        fontWeight: 800,
                        background:
                          "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {industry.projects}+
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#64748B",
                      lineHeight: 1.6,
                    }}
                  >
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
