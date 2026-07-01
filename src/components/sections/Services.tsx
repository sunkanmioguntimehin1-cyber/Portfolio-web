"use client";

import React, { useState } from "react";
import { siteData } from "@/lib/data";
import { cn } from "@/lib/utils";

const Services: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative py-[100px] bg-background overflow-hidden"
    >
      {/* Hairline top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
            <span className="font-sans text-xs font-semibold tracking-widest uppercase text-primary">
              What We Do
            </span>
          </div>

          <div className="flex justify-between items-end flex-wrap gap-6">
            <h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-tighter leading-tight text-foreground max-w-[520px]">
              Our{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="font-sans text-sm text-foreground-muted leading-relaxed max-w-[420px]">
              Comprehensive software engineering solutions to help you build,
              scale, and transform your digital presence.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-px bg-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
          {siteData.services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "p-9 bg-surface transition-all duration-250 cursor-pointer relative overflow-hidden",
                (index + 1) % 3 !== 0 && "border-r border-white/[0.05]",
                index < siteData.services.length - 3 && "border-b border-white/[0.05]",
                hoveredId === service.id && "bg-primary/[0.04]"
              )}
            >
              {/* Hover accent line */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-cyan-500 transition-transform duration-300 origin-left",
                  hoveredId === service.id ? "scale-x-100" : "scale-x-0"
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-250",
                  hoveredId === service.id
                    ? "bg-gradient-to-r from-teal-400 to-cyan-500"
                    : "bg-primary/10"
                )}
              >
                <span className={cn(
                  "transition-colors duration-250",
                  hoveredId === service.id ? "text-white" : "text-primary"
                )}>
                  {service.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className={cn(
                "font-display text-lg font-bold tracking-tight mb-2.5 transition-colors duration-200",
                hoveredId === service.id ? "text-foreground" : "text-foreground/90"
              )}>
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-foreground-muted leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {service.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] font-sans text-[10px] font-medium text-foreground-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 py-3 rounded-[10px] bg-transparent border border-primary/40 cursor-pointer font-sans text-sm font-semibold text-primary tracking-wide transition-all duration-200 hover:bg-primary/10 hover:border-primary/60"
          >
            Discuss a Custom Solution &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
