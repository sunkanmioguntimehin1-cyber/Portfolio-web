"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";

const Partnerships: React.FC = () => {
  const partnerships = siteData.partnerships;

  return (
    <section className="relative py-16 bg-surface border-y border-white/[0.05] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <p className="text-center font-sans text-[10px] font-semibold tracking-[0.15em] uppercase text-foreground-muted/50 mb-8">
          Our Partners
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {partnerships.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] min-w-[130px] justify-center transition-all duration-200 hover:bg-primary/[0.06] hover:border-primary/30 hover:-translate-y-0.5"
            >
              <span className="text-xl">{partner.icon}</span>
              <span className="font-sans text-sm font-semibold text-foreground-secondary whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partnerships;
