"use client";

import React, { useState } from "react";
import { Linkedin, Twitter } from "lucide-react";
import { siteData } from "@/lib/data";

const avatarGradients = [
  "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #10B981 0%, #0891B2 100%)",
  "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
];

const Team: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="team"
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
              The Team
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
            Meet Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Leadership
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
            Talented engineers, designers, and strategists passionate about
            building exceptional software.
          </p>
        </div>

        {/* Team Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {siteData.team.map((member, index) => (
            <div
              key={member.id}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: "32px 24px",
                borderRadius: 20,
                background:
                  hoveredId === member.id
                    ? "rgba(59, 111, 255, 0.06)"
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${hoveredId === member.id ? "rgba(59, 111, 255, 0.25)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.25s ease",
                textAlign: "center",
                transform:
                  hoveredId === member.id ? "translateY(-4px)" : "none",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 20,
                  background: avatarGradients[index % avatarGradients.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 24,
                  fontWeight: 800,
                  color: "white",
                  transition: "transform 0.25s ease",
                  transform:
                    hoveredId === member.id ? "scale(1.05)" : "scale(1)",
                }}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Name & Title */}
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 17,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#F8FAFC",
                  marginBottom: 4,
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#5B8AFF",
                  marginBottom: 12,
                  letterSpacing: "0.01em",
                }}
              >
                {member.position}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#64748B",
                  lineHeight: 1.65,
                  marginBottom: 20,
                }}
              >
                {member.bio}
              </p>

              {/* Social */}
              <div
                style={{ display: "flex", gap: 8, justifyContent: "center" }}
              >
                {[
                  { href: member.linkedin, Icon: Linkedin, label: "LinkedIn" },
                  { href: member.twitter, Icon: Twitter, label: "Twitter" },
                ].map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748B",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(59, 111, 255, 0.15)";
                      el.style.borderColor = "rgba(59, 111, 255, 0.3)";
                      el.style.color = "#5B8AFF";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.05)";
                      el.style.borderColor = "rgba(255,255,255,0.08)";
                      el.style.color = "#64748B";
                    }}
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div
          style={{
            padding: "48px",
            borderRadius: 24,
            background: "rgba(59, 111, 255, 0.05)",
            border: "1px solid rgba(59, 111, 255, 0.15)",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              color: "#F8FAFC",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}
          >
            Want to Join Our Team?
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "#64748B",
              marginBottom: 28,
              maxWidth: 440,
              margin: "0 auto 28px",
            }}
          >
            We&apos;re always looking for talented individuals passionate about
            technology and innovation.
          </p>
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid rgba(59, 111, 255, 0.4)",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: "#5B8AFF",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59, 111, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View Open Positions →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
