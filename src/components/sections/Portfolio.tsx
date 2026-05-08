"use client";

import React, { useState } from "react";
import Image from "next/image";
import americanAirlines from "../../assets/images/american_airlines.jpeg";
import generalMotors from "../../assets/images/general-motors-2021--1.svg";

// ─── REAL PROJECT DATA ────────────────────────────────────────────────────────
const portfolioProjects = [
  // AUTOMOTIVE
  {
    id: 1,
    title: "GM HomeBridge",
    subtitle: "Connected Vehicle Smart Home",
    description:
      "Android Automotive smart home control platform enabling drivers to operate garage doors, locks, lights, and dimmers from their vehicle. Features a custom Python + Quarkus microservices cloud reducing service costs vs third-party providers.",
    category: "Automotive",
    technologies: [
      "Android Automotive",
      "Python",
      "Quarkus",
      "SmartThings",
      "Google Home",
    ],
    platforms: ["Android Automotive"],
    client: "General Motors",
    clientLogo: generalMotors,
    featured: true,
    href: "#",
    highlights: [
      "Garage, lock, light & dimmer integration",
      "SmartThings & Google Home connectivity",
      "Custom cloud to reduce service costs",
    ],
  },
  {
    id: 2,
    title: "GM MyBrand Consumer Apps",
    subtitle: "Chevrolet · GMC · Cadillac · Buick",
    description:
      "React Native mobile apps for four of General Motors' flagship vehicle brands — fleet and personal garage management, real-time vehicle status, remote commands, and service scheduling.",
    category: "Automotive",
    technologies: ["React Native", "iOS", "Android"],
    platforms: ["iOS", "Android"],
    client: "General Motors",
    clientLogo: generalMotors,
    featured: true,
    href: "#",
    highlights: [
      "Fleet and My Garage management",
      "Remote vehicle commands (lock/unlock, start)",
      "Performance-optimized mobile architecture",
    ],
  },
  {
    id: 3,
    title: "Volcon Stag – EV App",
    subtitle: "Connected Electric Vehicle Experience",
    description:
      "Full-featured connected vehicle app for the Volcon Stag electric UTV. Real-time charge status, charging station locator, and Level 1/2 charge planning.",
    category: "Automotive",
    technologies: ["React Native", "iOS", "Android"],
    platforms: ["iOS", "Android"],
    client: "Volcon",
    clientLogo: null,
    featured: false,
    href: "#",
    highlights: [
      "Vehicle controls & real-time telemetry",
      "Charging station locator",
      "Monitor and plan charging sessions",
    ],
  },
  {
    id: 4,
    title: "OnStar Guardian",
    subtitle: "Emergency Automation Platform",
    description:
      "High-reliability SwiftUI safety app for automatic crash detection, emergency SOS dispatch without user interaction, and live family location tracking.",
    category: "Safety & IoT",
    technologies: ["SwiftUI", "iOS", "Android", "OnStar API"],
    platforms: ["iOS", "Android"],
    client: "General Motors / OnStar",
    clientLogo: generalMotors,
    featured: false,
    href: "#",
    highlights: [
      "Crash detection automation",
      "Emergency SOS without user action",
      "Live family tracking & roadside assist",
    ],
  },
  // ENTERPRISE
  {
    id: 5,
    title: "Public Storage App",
    subtitle: "Enterprise Consumer Storage Platform",
    description:
      "End-to-end consumer app for the world's largest self-storage company — BLE gate/door/elevator access, Apple Pay payments, and shared user access management at scale.",
    category: "Enterprise",
    technologies: [
      "React Native",
      "BLE",
      "Apple Pay",
      "iOS",
      "Android",
      "Apple Watch",
    ],
    platforms: ["iOS", "Android"],
    client: "Public Storage",
    clientLogo: null,
    featured: true,
    href: "#",
    highlights: [
      "BLE gate, door & elevator one-tap access",
      "Secure payments & Apple Pay",
      "Shared user access at scale",
    ],
  },
  // HEALTHCARE
  {
    id: 6,
    title: "MyMercy",
    subtitle: "Patient Engagement Platform",
    description:
      "Comprehensive patient engagement mobile app powered by MyChart/Epic EMR integration — lab results with trend graphs, appointment scheduling, secure provider messaging, and care plan management.",
    category: "Healthcare",
    technologies: ["React Native", "Epic / MyChart API", "iOS", "Android"],
    platforms: ["iOS", "Android"],
    client: "Mercy Health",
    clientLogo: null,
    featured: false,
    href: "#",
    highlights: [
      "Lab results with visual trend graphs",
      "Appointment scheduling",
      "Secure provider messaging",
    ],
  },
  // AVIATION
  {
    id: 7,
    title: "American Airlines – Pilot Systems",
    subtitle: "Enterprise Flight Operations & Crew Tech",
    description:
      "Mission-critical web and mobile ecosystem for American Airlines flight operations. Includes WebFOS, Crew Check-In web and desktop apps, Mobile CCI/FOS, and OE Tracker for flight attendants.",
    category: "Aviation",
    technologies: ["Web", "iOS", "Android", "HockeyApp"],
    platforms: ["Web", "iOS", "Android"],
    client: "American Airlines",
    clientLogo: americanAirlines,
    featured: true,
    href: "#",
    highlights: [
      "Real-time scheduling & operational workflows",
      "High-availability mission-critical systems",
      "Web + mobile crew check-in ecosystem",
    ],
  },
  // GOVERNMENT
  {
    id: 8,
    title: "UAE Government Platforms",
    subtitle: "Ministry of Foreign Affairs & Public Services",
    description:
      "Cross-platform government mobile apps (Ionic, Xamarin, PhoneGap) for the UAE Ministry of Foreign Affairs — visa exemption lookups, dynamic CMS surveys, and multilingual support at public-sector scale.",
    category: "Government",
    technologies: ["Ionic", "Xamarin", "PhoneGap", "iOS", "Android"],
    platforms: ["iOS", "Android", "Tablet"],
    client: "UAE Government",
    clientLogo: null,
    featured: false,
    href: "#",
    highlights: [
      "Visa lookup for 100+ countries",
      "Dynamic CMS-driven surveys & forms",
      "Arabic · English · Urdu support",
    ],
  },
  {
    id: 9,
    title: "Etisalat Mobile Services",
    subtitle: "Enterprise Telecom Platform – UAE",
    description:
      "Large-scale enterprise telecom mobile applications for Etisalat (e&), one of the largest carriers in the Middle East — including a UAE Yellow Pages business directory deployed nationwide.",
    category: "Telecom",
    technologies: ["iOS", "Android", "PhoneGap"],
    platforms: ["iOS", "Android"],
    client: "Etisalat / e&",
    clientLogo: null,
    featured: false,
    href: "#",
    highlights: [
      "iOS and Android customer platforms",
      "UAE Yellow Pages directory app",
      "Large-scale nationwide deployment",
    ],
  },
  // EDUCATION
  {
    id: 10,
    title: "SchoolCafe TV & Mobile",
    subtitle: "School Nutrition & Payments Ecosystem",
    description:
      "Multi-platform school nutrition and payments ecosystem — FireTV digital signage, ChromeBit kiosk displays, and iOS/Android apps for real-time cafeteria menus, balances, and student engagement across K-12 districts.",
    category: "Education",
    technologies: ["FireTV", "ChromeBit", "React Native", "iOS", "Android"],
    platforms: ["iOS", "Android", "FireTV"],
    client: "SchoolCafe",
    clientLogo: null,
    featured: false,
    href: "https://www.schoolcafe.com/",
    highlights: [
      "FireTV / ChromeBit digital signage",
      "Real-time cafeteria menus & balances",
      "High-scale secure education services",
    ],
  },
];

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────
const CATEGORY_META: Record<string, { color: string; emoji: string }> = {
  Automotive: { color: "#3B82F6", emoji: "🚗" },
  "Safety & IoT": { color: "#EF4444", emoji: "🛡️" },
  Enterprise: { color: "#F59E0B", emoji: "🏢" },
  Healthcare: { color: "#10B981", emoji: "🏥" },
  Aviation: { color: "#6366F1", emoji: "✈️" },
  Government: { color: "#8B5CF6", emoji: "🏛️" },
  Telecom: { color: "#06B6D4", emoji: "📡" },
  Education: { color: "#F97316", emoji: "🎓" },
};

const ALL_CATEGORIES = ["All", ...Object.keys(CATEGORY_META)];

// ─── PLATFORM BADGE ───────────────────────────────────────────────────────────
const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => {
  const icons: Record<string, string> = {
    iOS: "🍎",
    Android: "🤖",
    Web: "🌐",
    "Android Automotive": "🚗",
    FireTV: "📺",
    Tablet: "📱",
    "Apple Watch": "⌚",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 6,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 10,
        color: "#94A3B8",
      }}
    >
      {icons[platform] || "📦"} {platform}
    </span>
  );
};

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
const FeaturedCard: React.FC<{
  project: (typeof portfolioProjects)[0];
  hovered: boolean;
  onHover: (id: number | null) => void;
}> = ({ project, hovered, onHover }) => {
  const meta = CATEGORY_META[project.category] || {
    color: "#3B6FFF",
    emoji: "🚀",
  };
  return (
    <div
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 20,
        border: `1px solid ${hovered ? `${meta.color}50` : "rgba(255,255,255,0.07)"}`,
        overflow: "hidden",
        transition: "all 0.3s ease",
        background: "#0D1120",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${meta.color}20`
          : "none",
        cursor: "pointer",
      }}
    >
      {/* Hero band */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg, ${meta.color}18 0%, rgba(124,58,237,0.1) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div style={{ fontSize: 64, lineHeight: 1 }}>{meta.emoji}</div>
        <div style={{ textAlign: "right" }}>
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
            Client
          </div>
          {project.clientLogo ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image
                src={project.clientLogo}
                alt={project.client}
                width={80}
                height={40}
                style={{
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                  opacity: 0.9,
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 80,
                height: 40,
                background: "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Sora', sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "white",
              }}
            >
              S
            </div>
          )}
        </div>
        {/* Accent top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${meta.color}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
            transformOrigin: "left",
            transition: "transform 0.4s ease",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "24px 28px 28px" }}>
        {/* Category badge */}
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
              background: `${meta.color}18`,
              border: `1px solid ${meta.color}30`,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: meta.color,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {meta.emoji} {project.category}
          </span>
          <div style={{ display: "flex", gap: 4 }}>
            {project.platforms.slice(0, 3).map((p) => (
              <PlatformBadge key={p} platform={p} />
            ))}
          </div>
        </div>

        <h3
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#F8FAFC",
            marginBottom: 4,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: meta.color,
            marginBottom: 12,
          }}
        >
          {project.subtitle}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#CBD5E1",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          {project.description}
        </p>

        {/* Highlights */}
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 20,
          }}
        >
          {project.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#CBD5E1",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: meta.color, fontSize: 14, flexShrink: 0 }}>
                ✓
              </span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.technologies.slice(0, 5).map((tech, i) => (
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
  );
};

// ─── COMPACT CARD ─────────────────────────────────────────────────────────────
const CompactCard: React.FC<{
  project: (typeof portfolioProjects)[0];
  hovered: boolean;
  onHover: (id: number | null) => void;
}> = ({ project, hovered, onHover }) => {
  const meta = CATEGORY_META[project.category] || {
    color: "#3B6FFF",
    emoji: "🚀",
  };
  return (
    <div
      onMouseEnter={() => onHover(project.id + 100)}
      onMouseLeave={() => onHover(null)}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered ? `${meta.color}40` : "rgba(255,255,255,0.06)"}`,
        overflow: "hidden",
        transition: "all 0.25s ease",
        background: hovered ? "rgba(13, 17, 32, 0.85)" : "rgba(13, 17, 32, 0.6)",
        transform: hovered ? "translateY(-3px)" : "none",
        cursor: "pointer",
        backdropFilter: hovered ? "blur(12px)" : "none",
        WebkitBackdropFilter: hovered ? "blur(12px)" : "none",
      }}
    >
      <div
        style={{
          height: 100,
          background: `linear-gradient(135deg, ${meta.color}15 0%, rgba(124,58,237,0.08) 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 36 }}>{meta.emoji}</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {project.clientLogo && (
            <Image
              src={project.clientLogo}
              alt={project.client}
              width={48}
              height={24}
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
                opacity: 0.7,
              }}
            />
          )}
          {project.platforms.slice(0, 2).map((p) => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, ${meta.color}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
          }}
        />
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 100,
            background: `${meta.color}15`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            color: meta.color,
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
            marginBottom: 2,
            letterSpacing: "-0.01em",
          }}
        >
          {project.title}
        </h4>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: meta.color,
            marginBottom: 8,
          }}
        >
          {project.subtitle}
        </p>
        <p
          style={
            {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#CBD5E1",
              lineHeight: 1.6,
              marginBottom: 12,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as React.CSSProperties
          }
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
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section
      id="portfolio"
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
            "radial-gradient(ellipse at 50% 0%, rgba(59, 111, 255, 0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating orbs */}
      <div
        className="portfolio-orb-1"
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
        className="portfolio-orb-2"
        style={{
          position: "absolute",
          top: "30%",
          right: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="portfolio-orb-3"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "30%",
          width: 350,
          height: 200,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0, 212, 170, 0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

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
        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
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
                background: "linear-gradient(135deg,#3B6FFF,#7C3AED)",
                borderRadius: 1,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#5B8AFF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Real-World Projects
            </span>
            <div
              style={{
                width: 24,
                height: 2,
                background: "linear-gradient(135deg,#7C3AED,#3B6FFF)",
                borderRadius: 1,
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Sora',sans-serif",
              fontSize: "clamp(32px,4vw,52px)",
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
                background: "linear-gradient(135deg,#3B6FFF,#7C3AED)",
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
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 16,
              color: "#64748B",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 8px",
            }}
          >
            10 shipped products across automotive, aviation, healthcare,
            government, and more — for clients like General Motors, American
            Airlines, and Public Storage.
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 13,
              color: "#334155",
            }}
          >
            {portfolioProjects.length} projects ·{" "}
            {Object.keys(CATEGORY_META).length} industries
          </p>
        </div>

        {/* ── Category Filter Tabs ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const meta = CATEGORY_META[cat];
            const isActive = activeCategory === cat;
            const count =
              cat === "All"
                ? portfolioProjects.length
                : portfolioProjects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "7px 16px",
                  borderRadius: 100,
                  background: isActive
                    ? meta
                      ? `${meta.color}20`
                      : "rgba(59,111,255,0.15)"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? (meta ? `${meta.color}50` : "rgba(59,111,255,0.5)") : "rgba(255,255,255,0.08)"}`,
                  cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? (meta ? meta.color : "#5B8AFF") : "#64748B",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "#CBD5E1";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.color = "#64748B";
                  }
                }}
              >
                {meta && <span>{meta.emoji}</span>}
                {cat}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    background: isActive
                      ? meta
                        ? `${meta.color}30`
                        : "rgba(59,111,255,0.25)"
                      : "rgba(255,255,255,0.08)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: isActive
                      ? meta
                        ? meta.color
                        : "#5B8AFF"
                      : "#4A5568",
                    padding: "0 5px",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Featured Grid (1 or 2 col) ── */}
        {featured.length > 0 && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  featured.length === 1
                    ? "1fr"
                    : "repeat(auto-fit,minmax(480px,1fr))",
                gap: 16,
                marginBottom: rest.length > 0 ? 16 : 0,
              }}
            >
              {featured.map((project) => (
                <FeaturedCard
                  key={project.id}
                  project={project}
                  hovered={hoveredId === project.id}
                  onHover={setHoveredId}
                />
              ))}
            </div>
          </>
        )}

        {/* ── Rest of Projects Grid ── */}
        {rest.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
              gap: 16,
            }}
          >
            {rest.map((project) => (
              <CompactCard
                key={project.id}
                project={project}
                hovered={hoveredId === project.id + 100}
                onHover={setHoveredId}
              />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {featured.length === 0 && rest.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 15,
                color: "#64748B",
              }}
            >
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* ── CTA ── */}
        <div style={{ marginTop: 64, textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
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
              padding: "14px 36px",
              borderRadius: 12,
              background: "linear-gradient(135deg,#3B6FFF,#7C3AED)",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: "white",
              boxShadow: "0 8px 32px rgba(59,111,255,0.3)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(59,111,255,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(59,111,255,0.3)";
            }}
          >
            Start Your Project →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
        
        /* Animated gradient orbs for Portfolio */
        .portfolio-orb-1 {
          animation: portfolioFloatOrb1 12s ease-in-out infinite;
        }
        .portfolio-orb-2 {
          animation: portfolioFloatOrb2 10s ease-in-out infinite;
        }
        .portfolio-orb-3 {
          animation: portfolioFloatOrb3 14s ease-in-out infinite;
        }

        @keyframes portfolioFloatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.95); }
          75% { transform: translate(40px, 30px) scale(1.05); }
        }

        @keyframes portfolioFloatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-30px, 20px) scale(1.1); }
          50% { transform: translate(20px, -30px) scale(0.9); }
          75% { transform: translate(-20px, -20px) scale(1.05); }
        }

        @keyframes portfolioFloatOrb3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, 30px) scale(1.15); }
          50% { transform: translate(-30px, -20px) scale(0.95); }
          75% { transform: translate(10px, -40px) scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;