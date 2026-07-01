"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const avatarColors = [
  "from-teal-400 to-cyan-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-blue-500",
  "from-amber-500 to-red-500",
];

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const testimonials = siteData.testimonials;

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-background py-[100px]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background accent */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative">
        <SectionHeader
          label="Client Voices"
          title="What Our Clients Say"
          gradientWord="Clients Say"
          align="center"
        />

        {/* Main testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-[840px] mx-auto mb-10 p-10 md:p-[52px] rounded-2xl bg-white/[0.02] border border-white/[0.08] relative"
        >
          {/* Quotation mark */}
          <div className="absolute top-8 left-10 md:left-12 font-serif text-7xl leading-none text-primary/10 pointer-events-none select-none">
            &ldquo;
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: testimonials[current].rating }).map((_, i) => (
              <span key={i} className="text-amber-400 text-base">&#9733;</span>
            ))}
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="font-sans text-[clamp(15px,1.8vw,19px)] text-foreground-secondary leading-relaxed mb-9 italic relative z-10"
            >
              {testimonials[current].content}
            </motion.blockquote>
          </AnimatePresence>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-13 h-13 rounded-full bg-gradient-to-br flex items-center justify-center font-display font-bold text-base text-white flex-shrink-0",
                avatarColors[current % avatarColors.length]
              )}
            >
              {testimonials[current].name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="font-display text-base font-bold text-foreground tracking-tight">
                {testimonials[current].name}
              </div>
              <div className="font-sans text-xs text-foreground-muted">
                {testimonials[current].position} at{" "}
                <span className="text-primary">{testimonials[current].company}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center gap-4"
        >
          <button
            onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] cursor-pointer text-foreground-muted text-sm flex items-center justify-center transition-all duration-200 hover:bg-primary/15 hover:text-primary"
          >
            &larr;
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "rounded-full border-none cursor-pointer transition-all duration-300 p-0",
                  current === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-white/15"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.08] cursor-pointer text-foreground-muted text-sm flex items-center justify-center transition-all duration-200 hover:bg-primary/15 hover:text-primary"
          >
            &rarr;
          </button>
        </motion.div>

        {/* Thumbnail chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-3 justify-center mt-8 flex-wrap"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              className={cn(
                "flex items-center gap-2.5 py-2 pl-2 pr-4 rounded-full border transition-all duration-200 cursor-pointer",
                current === i
                  ? "bg-primary/15 border-primary/40"
                  : "bg-white/[0.03] border-white/[0.07]"
              )}
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center font-display font-bold text-[10px] text-white flex-shrink-0",
                  avatarColors[i % avatarColors.length]
                )}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <span className={cn(
                "font-sans text-[11px] font-medium whitespace-nowrap",
                current === i ? "text-foreground-secondary" : "text-foreground-muted"
              )}>
                {t.name}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
