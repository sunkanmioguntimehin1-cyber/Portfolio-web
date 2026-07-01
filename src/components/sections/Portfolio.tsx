"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteData } from "@/lib/data";
import { cn } from "@/lib/utils";
import americanAirlines from "../../assets/images/american_airlines.jpeg";
import generalMotors from "../../assets/images/general-motors-2021--1.svg";

const CLIENT_LOGO_MAP: Record<string, typeof generalMotors | null> = {
  "General Motors": generalMotors,
  "General Motors / OnStar": generalMotors,
  "American Airlines": americanAirlines,
};

const portfolioProjects = siteData.portfolio.map((p) => ({
  ...p,
  clientLogo: CLIENT_LOGO_MAP[p.client] || null,
}));

const CATEGORY_META: Record<string, { color: string }> = {
  Automotive: { color: "#2DD4BF" },
  "Safety & IoT": { color: "#F59E0B" },
  Enterprise: { color: "#0EA5E9" },
  Healthcare: { color: "#14B8A6" },
  Aviation: { color: "#6366F1" },
  Government: { color: "#8B5CF6" },
  Telecom: { color: "#06B6D4" },
  Education: { color: "#F97316" },
};

const ALL_CATEGORIES = ["All", ...Object.keys(CATEGORY_META)];

const PlatformBadge: React.FC<{ platform: string }> = ({ platform }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] font-sans text-[9px] text-foreground-muted">
    {platform}
  </span>
);

const FeaturedCard: React.FC<{
  project: (typeof portfolioProjects)[0];
  hovered: boolean;
  onHover: (id: number | null) => void;
}> = ({ project, hovered, onHover }) => {
  const meta = CATEGORY_META[project.category] || { color: "#2DD4BF" };
  return (
    <div
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300 bg-surface cursor-pointer",
        hovered
          ? "translate-y-[-4px] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          : "shadow-none"
      )}
      style={{
        border: `1px solid ${hovered ? `${meta.color}50` : "rgba(255,255,255,0.07)"}`,
        boxShadow: hovered ? `0 0 0 1px ${meta.color}20` : "none",
      }}
    >
      {/* Hero band */}
      <div
        className="h-[180px] flex items-center justify-between px-8 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${meta.color}18 0%, rgba(14,165,233,0.1) 100%)` }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px]" />
        <span className="text-5xl relative">{project.category === "Automotive" ? "🚗" : project.category === "Aviation" ? "✈️" : "📦"}</span>
        <div className="text-right relative">
          <div className="font-sans text-[10px] font-semibold text-foreground-muted uppercase tracking-wider mb-1">
            Client
          </div>
          {project.clientLogo ? (
            <Image
              src={project.clientLogo}
              alt={project.client}
              width={80}
              height={40}
              className="object-contain brightness-0 invert opacity-90 ml-auto"
            />
          ) : (
            <div className="w-20 h-10 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-500 flex items-center justify-center font-display font-bold text-lg text-white">
              S
            </div>
          )}
        </div>
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] transition-transform duration-400 origin-left"
          style={{
            background: `linear-gradient(90deg, ${meta.color}, transparent)`,
            transform: hovered ? "scaleX(1)" : "scaleX(0.3)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-7">
        <div className="flex justify-between items-center mb-3">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border"
            style={{
              background: `${meta.color}18`,
              borderColor: `${meta.color}30`,
              color: meta.color,
            }}
          >
            {project.category}
          </span>
          <div className="flex gap-1">
            {project.platforms.slice(0, 3).map((p) => (
              <PlatformBadge key={p} platform={p} />
            ))}
          </div>
        </div>

        <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground mb-1">
          {project.title}
        </h3>
        <p className="font-sans text-xs font-semibold mb-3" style={{ color: meta.color }}>
          {project.subtitle}
        </p>
        <p className="font-sans text-xs text-foreground-secondary leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-col gap-1.5 mb-5">
          {project.highlights.map((h, i) => (
            <li key={i} className="font-sans text-[11px] text-foreground-secondary flex items-center gap-2">
              <span className="text-xs flex-shrink-0" style={{ color: meta.color }}>&check;</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] font-sans text-[10px] text-foreground-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CompactCard: React.FC<{
  project: (typeof portfolioProjects)[0];
  hovered: boolean;
  onHover: (id: number | null) => void;
}> = ({ project, hovered, onHover }) => {
  const meta = CATEGORY_META[project.category] || { color: "#2DD4BF" };
  return (
    <div
      onMouseEnter={() => onHover(project.id + 100)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-250 cursor-pointer",
        hovered
          ? "bg-surface/85 backdrop-blur-md translate-y-[-3px]"
          : "bg-surface/60"
      )}
      style={{
        border: `1px solid ${hovered ? `${meta.color}40` : "rgba(255,255,255,0.06)"}`,
      }}
    >
      <div
        className="h-[100px] flex items-center justify-between px-5 relative"
        style={{ background: `linear-gradient(135deg, ${meta.color}15 0%, rgba(14,165,233,0.08) 100%)` }}
      >
        <span className="text-3xl">{project.category === "Automotive" ? "🚗" : "📦"}</span>
        <div className="flex gap-1 items-center">
          {project.clientLogo && (
            <Image
              src={project.clientLogo}
              alt={project.client}
              width={48}
              height={24}
              className="object-contain brightness-0 invert opacity-70"
            />
          )}
          {project.platforms.slice(0, 2).map((p) => (
            <PlatformBadge key={p} platform={p} />
          ))}
        </div>
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-250"
          style={{
            background: `linear-gradient(90deg, ${meta.color}, transparent)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
      <div className="p-4 md:p-5">
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider"
          style={{ background: `${meta.color}15`, color: meta.color }}
        >
          {project.category}
        </span>
        <h4 className="font-display text-sm font-bold text-foreground/90 mt-2.5 mb-0.5 tracking-tight">
          {project.title}
        </h4>
        <p className="font-sans text-[10px] font-semibold mb-2" style={{ color: meta.color }}>
          {project.subtitle}
        </p>
        <p className="font-sans text-[11px] text-foreground-secondary leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] font-sans text-[9px] text-foreground-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

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
      className="relative overflow-hidden bg-background py-[100px]"
    >
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-primary">
              Real-World Projects
            </span>
            <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 to-teal-400" />
          </div>
          <h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-tighter leading-tight text-foreground mb-4">
            Our{" "}
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="font-sans text-sm text-foreground-muted leading-relaxed max-w-[560px] mx-auto mb-2">
            10 shipped products across automotive, aviation, healthcare, government, and more &mdash; for clients like General Motors, American Airlines, and Public Storage.
          </p>
          <p className="font-sans text-[11px] text-foreground-muted/50">
            {portfolioProjects.length} projects &middot; {Object.keys(CATEGORY_META).length} industries
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
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
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer border",
                  isActive
                    ? meta
                      ? `bg-[${meta.color}20] border-[${meta.color}50]`
                      : "bg-primary/15 border-primary/50 text-primary"
                    : "bg-white/[0.03] border-white/[0.08] text-foreground-muted hover:bg-white/[0.06] hover:text-foreground-secondary"
                )}
                style={isActive && meta ? {
                  background: `${meta.color}20`,
                  borderColor: `${meta.color}50`,
                  color: meta.color,
                } : {}}
              >
                {cat}
                <span
                  className="inline-flex items-center justify-center min-w-[16px] h-4 rounded-full text-[9px] font-bold ml-1.5 px-1"
                  style={isActive && meta ? {
                    background: `${meta.color}30`,
                    color: meta.color,
                  } : {
                    background: "rgba(255,255,255,0.08)",
                    color: "#4A5568",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Grid */}
        {featured.length > 0 && (
          <div
            className={cn(
              "grid gap-4 mb-4",
              featured.length === 1 ? "grid-cols-1" : "grid-cols-[repeat(auto-fit,minmax(480px,1fr))]"
            )}
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
        )}

        {/* Rest of Projects Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
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

        {/* Empty state */}
        {featured.length === 0 && rest.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-sm text-foreground-muted">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="font-sans text-sm text-foreground-muted mb-5">
            Have a project in mind?
          </p>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-9 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 border-none cursor-pointer font-sans text-sm font-semibold text-white shadow-[0_8px_32px_rgba(45,212,191,0.3)] transition-all duration-250 hover:shadow-[0_12px_40px_rgba(45,212,191,0.45)] hover:-translate-y-0.5"
          >
            Start Your Project &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
