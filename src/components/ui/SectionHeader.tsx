"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string
  title: string
  gradientWord?: string
  description?: string
  align?: "center" | "left"
  className?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  gradientWord,
  description,
  align = "center",
  className,
}) => {
  const containerClass = align === "center" ? "text-center" : "";

  const renderTitle = () => {
    if (!gradientWord) return title;
    const parts = title.split(gradientWord);
    if (parts.length < 2) return title;
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">{gradientWord}</span>
        {parts.slice(1).join(gradientWord)}
      </>
    );
  };

  return (
    <motion.div
      className={cn("mb-16", containerClass, className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div className="inline-flex items-center gap-2 mb-4" custom={0} variants={fadeUp}>
        <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-teal-400 to-cyan-500" />
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">
          {label}
        </span>
        {align === "center" && (
          <div className="w-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 to-teal-400" />
        )}
      </motion.div>
      <motion.h2 className="font-display text-[clamp(28px,3.5vw,48px)] font-extrabold tracking-tighter leading-tight text-foreground" custom={1} variants={fadeUp}>
        {renderTitle()}
      </motion.h2>
      {description && (
        <motion.p className="font-sans text-sm text-foreground-muted leading-relaxed max-w-[480px] mt-4 mx-auto" custom={2} variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
