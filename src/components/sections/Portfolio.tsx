"use client";

import React, { useState } from "react";
import { siteData } from "@/lib/data";

const categoryEmoji: Record<string, string> = {
  Healthcare: "🏥",
  FinTech: "💳",
  "E-commerce": "🛍️",
  Education: "🎓",
  Travel: "✈️",
  Startup: "🚀",
};

const categoryColor: Record<string, string> = {
  Healthcare: "#10B981",
  FinTech: "#F59E0B",
  "E-commerce": "#EF4444",
  Education: "#8B5CF6",
  Travel: "#3B82F6",
  Startup: "#06B6D4",
};

const Portfolio: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const featuredProjects = siteData.portfolio.filter((p) => p.featured);
  const allProjects = siteData.portfolio;

  return (
    <section
      id="portfolio"
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
              Case Studies
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
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Portfolio
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
            Explore how we&apos;ve helped businesses transform their digital
            presence with innovative solutions.
          </p>
        </div>

        {/* Featured - 2 col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
            gap: 16,
            marginBottom: 16,
          }}
        >
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: 20,
                border: `1px solid ${hoveredId === project.id ? "rgba(59, 111, 255, 0.3)" : "rgba(255,255,255,0.06)"}`,
                overflow: "hidden",
                transition: "all 0.3s ease",
                background: "#0D1120",
                transform:
                  hoveredId === project.id ? "translateY(-4px)" : "none",
                boxShadow:
                  hoveredId === project.id
                    ? "0 20px 60px rgba(0,0,0,0.4)"
                    : "none",
              }}
            >
              {/* Project visual */}
              <div
                style={{
                  height: 200,
                  background: `linear-gradient(135deg, ${categoryColor[project.category] || "#3B6FFF"}18 0%, rgba(124, 58, 237, 0.1) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                {categoryEmoji[project.category] || "🚀"}
              </div>

              {/* Content */}
              <div style={{ padding: "24px 28px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: 100,
                      background: `${categoryColor[project.category] || "#3B6FFF"}18`,
                      border: `1px solid ${categoryColor[project.category] || "#3B6FFF"}30`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      color: categoryColor[project.category] || "#3B6FFF",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>
                  <a
                    href={project.href}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#5B8AFF",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    View Case Study →
                  </a>
                </div>
                <h3
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "#F8FAFC",
                    marginBottom: 8,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#64748B",
                    lineHeight: 1.65,
                    marginBottom: 16,
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: "#64748B",
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

        {/* All projects - 3 col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {allProjects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => setHoveredId(project.id + 100)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: 16,
                border: `1px solid ${hoveredId === project.id + 100 ? "rgba(59, 111, 255, 0.25)" : "rgba(255,255,255,0.06)"}`,
                overflow: "hidden",
                transition: "all 0.25s ease",
                background: "rgba(255,255,255,0.02)",
                transform:
                  hoveredId === project.id + 100 ? "translateY(-3px)" : "none",
              }}
            >
              <div
                style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${categoryColor[project.category] || "#3B6FFF"}15 0%, rgba(124, 58, 237, 0.08) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                {categoryEmoji[project.category] || "🚀"}
              </div>
              <div style={{ padding: "18px 20px" }}>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 100,
                    background: `${categoryColor[project.category] || "#3B6FFF"}18`,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 600,
                    color: categoryColor[project.category] || "#3B6FFF",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </span>
                <h4
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#E2E8F0",
                    marginTop: 10,
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "#64748B",
                    lineHeight: 1.6,
                    marginBottom: 12,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        padding: "2px 8px",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        color: "#64748B",
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
        <div style={{ marginTop: 56, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: "#64748B",
              marginBottom: 20,
            }}
          >
            Have a project in mind?
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "14px 32px",
              borderRadius: 12,
              background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "white",
              boxShadow: "0 8px 32px rgba(59, 111, 255, 0.3)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(59, 111, 255, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(59, 111, 255, 0.3)";
            }}
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
