"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const Industries: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-background py-[100px]"
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="Who We Help"
          title="Industries We Serve"
          gradientWord="Serve"
          description="Deep domain expertise across multiple industries, delivering tailored solutions that drive innovation and growth."
          align="center"
        />

        {/* Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4"
        >
          {siteData.industries.map((industry) => (
            <div
              key={industry.id}
              onMouseEnter={() => setHoveredId(industry.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "p-7 rounded-xl border transition-all duration-250 cursor-pointer",
                hoveredId === industry.id
                  ? "bg-surface/85 border-primary/30 backdrop-blur-md"
                  : "bg-surface/60 border-white/[0.06]"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-250",
                    hoveredId === industry.id
                      ? "bg-gradient-to-r from-teal-400 to-cyan-500"
                      : "bg-primary/10"
                  )}
                >
                  <span className={cn(
                    "transition-colors duration-250",
                    hoveredId === industry.id ? "text-white" : "text-primary"
                  )}>
                    {industry.icon}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-display text-base font-bold text-foreground/90 tracking-tight truncate">
                      {industry.name}
                    </h3>
                    <span className="font-mono text-base font-bold bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent flex-shrink-0">
                      {industry.projects}+
                    </span>
                  </div>
                  <p className="font-sans text-xs text-foreground-secondary leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
