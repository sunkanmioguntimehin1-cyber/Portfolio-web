"use client";

import React, { useState } from "react";
import { siteData } from "@/lib/data";

const Services: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="services"
      style={{
        padding: "120px 0",
        background: "#05080F",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background detail */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(59,111,255,0.3), transparent)",
        }}
      />

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
          opacity: 0.3,
        }}
      >
        <source src="/videos/services.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(5, 8, 15, 0.5)",
        }}
      />

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(59, 111, 255, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <div style={{ marginBottom: 64 }}>
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
              What We Do
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#F8FAFC",
                lineHeight: 1.1,
                maxWidth: 520,
              }}
            >
              Our{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Services
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "#64748B",
                lineHeight: 1.7,
                maxWidth: 440,
              }}
            >
              Comprehensive software engineering solutions to help you build,
              scale, and transform your digital presence.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 2,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          {siteData.services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "36px 32px",
                background:
                  hoveredId === service.id
                    ? "rgba(59, 111, 255, 0.06)"
                    : "#0D1120",
                transition: "all 0.25s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                borderRight:
                  (index + 1) % 3 !== 0
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
                borderBottom:
                  index < siteData.services.length - 3
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              {/* Video Background for each card */}
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
                  opacity: 0.35,
                }}
              >
                <source 
                  src={index % 2 === 0 ? "/videos/service1.mp4" : "/videos/service2.mp4"} 
                  type="video/mp4" 
                />
              </video>

              {/* Dark overlay for text readability */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(5, 8, 15, 0.75)",
                }}
              />

              {/* Hover accent line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
                  transform:
                    hoveredId === service.id ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                }}
              />

              {/* Card Content */}
              <div style={{ position: "relative", zIndex: 10 }}>
              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background:
                    hoveredId === service.id
                      ? "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)"
                      : "rgba(59, 111, 255, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  transition: "all 0.25s ease",
                  transform:
                    hoveredId === service.id ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span
                  style={{
                    color: hoveredId === service.id ? "white" : "#5B8AFF",
                  }}
                >
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: hoveredId === service.id ? "#F8FAFC" : "#E2E8F0",
                  marginBottom: 10,
                  transition: "color 0.2s ease",
                }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "#64748B",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {service.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {service.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#64748B",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, textAlign: "center" }}>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "13px 28px",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid rgba(59, 111, 255, 0.4)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#5B8AFF",
              transition: "all 0.2s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(59, 111, 255, 0.1)";
              el.style.borderColor = "rgba(59, 111, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(59, 111, 255, 0.4)";
            }}
          >
            Discuss a Custom Solution →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
