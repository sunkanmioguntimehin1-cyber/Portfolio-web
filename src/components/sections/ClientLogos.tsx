"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";

const LOGO_COLORS = [
  "#4285F4", "#00A4EF", "#FF9900", "#00A1E0", "#1877F2",
  "#E50914", "#635BFF", "#5E8E3E", "#4A154B", "#0ACF83",
  "#1DB954", "#FF5A5F", "#000000", "#FF6B6B", "#000000",
];

const ClientLogos: React.FC = () => {
  const logos = siteData.clientLogos;

  return (
    <section className="relative py-12 bg-surface border-y border-white/[0.05] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1280px] mx-auto px-6"
      >
        <p className="text-center font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-muted/50 mb-7">
          Trusted by leading companies worldwide
        </p>

        <div className="overflow-hidden relative">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center min-w-[130px] px-5 border-r border-white/[0.05]"
              >
                <span
                  className="font-display text-sm font-bold tracking-tight whitespace-nowrap transition-colors duration-200"
                  style={{ color: LOGO_COLORS[i % LOGO_COLORS.length] + "50" }}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ClientLogos;
