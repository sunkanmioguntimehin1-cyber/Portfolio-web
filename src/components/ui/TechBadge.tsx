"use client";

import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode
  size?: "sm" | "md"
  color?: string
  className?: string
}

const TechBadge: React.FC<TechBadgeProps> = ({
  children,
  size = "sm",
  color,
  className,
}) => {
  const sizeClasses = size === "sm" ? "px-[10px] py-[3px] text-xs" : "px-3 py-1.5 text-sm";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium tracking-wide",
        "bg-white/5 border border-white/10 text-foreground-muted",
        sizeClasses,
        className
      )}
      style={color ? { borderColor: `${color}30`, color } : undefined}
    >
      {children}
    </span>
  );
};

export default TechBadge;
