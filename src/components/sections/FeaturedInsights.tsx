"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  "Case Study": "#2DD4BF",
  Blog: "#F59E0B",
};

const FeaturedInsights: React.FC = () => {
  const insights = siteData.insights;

  return (
    <section
      id="insights"
      className="relative py-[100px] bg-background overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">
        <SectionHeader
          label="Featured Insights"
          title="Stories of Our Transformations"
          gradientWord="Transformations"
          description="From concept to completion — explore our latest case studies and articles."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {insights.map((insight) => (
            <motion.a
              key={insight.id}
              href={insight.href}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              className="group block rounded-xl border border-white/[0.07] overflow-hidden transition-all duration-300 bg-surface hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(45,212,191,0.15)]"
            >
              {/* Image area */}
              <div
                className="h-44 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${TYPE_COLORS[insight.type] || "#2DD4BF"}20 0%, rgba(14,165,233,0.1) 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:24px_24px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl opacity-30 group-hover:scale-110 group-hover:opacity-50 transition-all duration-500">
                    {insight.type === "Case Study" ? "\uD83D\uDCCB" : "\uD83D\uDCDD"}
                  </span>
                </div>
                {/* Type badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border"
                    style={{
                      background: `${TYPE_COLORS[insight.type] || "#2DD4BF"}18`,
                      borderColor: `${TYPE_COLORS[insight.type] || "#2DD4BF"}30`,
                      color: TYPE_COLORS[insight.type] || "#2DD4BF",
                    }}
                  >
                    {insight.type === "Case Study" ? "\uD83D\uDCCB" : "\uD83D\uDCDD"} {insight.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted/60">
                  {insight.category}
                </span>
                <h3 className="font-display text-sm font-bold text-foreground leading-snug mt-1.5 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {insight.title}
                </h3>
                <p className="font-sans text-xs text-foreground-muted leading-relaxed line-clamp-2">
                  {insight.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore More
                  <span className="text-sm">&rarr;</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] border border-primary/40 font-sans text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/10 hover:border-primary/60"
          >
            Explore More Insights &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInsights;
