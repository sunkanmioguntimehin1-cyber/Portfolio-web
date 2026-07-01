"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { categories, items } = siteData.techStack;

  const filtered = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section
      id="tech-stack"
      className="relative py-[120px] bg-background overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <SectionHeader
          label="Our Technology"
          title="What's Our Stack?"
          gradientWord="Stack"
          description="We leverage a powerful and versatile tech stack tailored to meet diverse project needs."
          className="mb-16"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border",
                activeCategory === cat.id
                  ? "bg-primary/15 border-primary/50 text-primary-light"
                  : "bg-white/[0.03] border-white/[0.08] text-foreground-muted hover:bg-white/[0.06] hover:text-foreground-secondary"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03 } } }}
        >
          {filtered.map((tech) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
              }}
              className={cn(
                "flex flex-col items-center gap-2 p-5 rounded-xl border transition-all duration-200",
                "bg-white/[0.02] border-white/[0.06] hover:bg-primary/[0.06] hover:border-primary/30 hover:-translate-y-0.5 cursor-default"
              )}
            >
              <span className="text-3xl">{tech.icon}</span>
              <span className="font-sans text-xs font-medium text-foreground-muted text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-sans text-sm text-foreground-muted">
              No technologies in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
