"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const extraStats = [
  { value: "24/7", label: "Support Available" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "48h", label: "Avg. Response Time" },
];

const Stats: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-background py-[100px]">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      {/* Gradient accent */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 relative">
        <SectionHeader
          label="Our Impact"
          title="Numbers That Speak Volumes"
          gradientWord="Speak Volumes"
          description="Milestones that reflect our commitment to excellence and our clients' success."
          align="center"
        />

        {/* Main stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 bg-white/[0.03] border border-white/[0.07] rounded-[20px] overflow-hidden backdrop-blur-sm"
        >
          {siteData.stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "p-12 md:p-14 text-center relative overflow-hidden bg-surface/60",
                index < 3 && "border-r border-white/[0.05]"
              )}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[2px] bg-gradient-to-r from-teal-400 to-cyan-500 rounded-b" />
              <div className="font-mono text-[clamp(32px,4vw,48px)] font-bold tracking-tight bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1">
                {stat.number}{stat.suffix}
              </div>
              <div className="font-sans text-xs font-medium text-foreground-muted tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Extra stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
        >
          {extraStats.map((stat) => (
            <div
              key={stat.label}
              className="p-7 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center flex flex-col items-center gap-2"
            >
              <div className="font-mono text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="font-sans text-xs font-medium text-foreground-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
