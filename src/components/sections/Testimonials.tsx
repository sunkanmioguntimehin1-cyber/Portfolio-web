"use client";

import React, { useState, useEffect } from "react";
import { siteData } from "@/lib/data";

const avatarColors = [
  "linear-gradient(135deg, #3B6FFF, #7C3AED)",
  "linear-gradient(135deg, #10B981, #0891B2)",
  "linear-gradient(135deg, #F59E0B, #EF4444)",
  "linear-gradient(135deg, #8B5CF6, #EC4899)",
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = siteData.testimonials;

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
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

      {/* Background blob */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "20%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
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
              Client Voices
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
            What Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Clients Say
            </span>
          </h2>
        </div>

        {/* Main testimonial */}
        <div
          style={{
            maxWidth: 840,
            margin: "0 auto 40px",
            padding: "48px 52px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}
        >
          {/* Quotation mark */}
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 48,
              fontFamily: "Georgia, serif",
              fontSize: 96,
              lineHeight: 1,
              color: "rgba(59, 111, 255, 0.12)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>

          {/* Stars */}
          <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
            {Array.from({ length: testimonials[current].rating }).map(
              (_, i) => (
                <span key={i} style={{ color: "#F59E0B", fontSize: 18 }}>
                  ★
                </span>
              ),
            )}
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 400,
              color: "#CBD5E1",
              lineHeight: 1.75,
              marginBottom: 36,
              fontStyle: "italic",
              position: "relative",
              zIndex: 1,
            }}
          >
            {testimonials[current].content}
          </blockquote>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: avatarColors[current % avatarColors.length],
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
              {testimonials[current].name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#F8FAFC",
                  letterSpacing: "-0.01em",
                }}
              >
                {testimonials[current].name}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#64748B",
                }}
              >
                {testimonials[current].position} at{" "}
                <span style={{ color: "#5B8AFF" }}>
                  {testimonials[current].company}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots + arrows */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={() =>
              setCurrent(
                (p) => (p - 1 + testimonials.length) % testimonials.length,
              )
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 111, 255, 0.15)";
              e.currentTarget.style.color = "#5B8AFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            ←
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: current === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background:
                    current === i ? "#3B6FFF" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 111, 255, 0.15)";
              e.currentTarget.style.color = "#5B8AFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "#94A3B8";
            }}
          >
            →
          </button>
        </div>

        {/* Thumbnail chips */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: 32,
            flexWrap: "wrap",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 16px 8px 8px",
                borderRadius: 100,
                background:
                  current === i
                    ? "rgba(59, 111, 255, 0.15)"
                    : "rgba(255,255,255,0.03)",
                border: `1px solid ${current === i ? "rgba(59, 111, 255, 0.4)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: avatarColors[i % avatarColors.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 700,
                  fontSize: 10,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: current === i ? "#CBD5E1" : "#64748B",
                  whiteSpace: "nowrap",
                }}
              >
                {t.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
