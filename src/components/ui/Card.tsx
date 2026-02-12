import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  gradient?: boolean;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  gradient = false,
  style,
}) => {
  const baseClasses = "rounded-2xl p-6 transition-all duration-300";
  
  const variants = {
    hover: "hover:scale-105 hover:shadow-glow transform",
    glass: "glass",
    gradient: "gradient-border",
  };
  
  const background = gradient 
    ? "bg-surface" 
    : glass 
    ? "" 
    : "bg-surface";
  
  const classes = cn(
    baseClasses,
    background,
    hover && variants.hover,
    glass && variants.glass,
    gradient && variants.gradient,
    className
  );
  
  if (gradient) {
    return (
      <div className={cn(variants.gradient, className)} style={style}>
        <div className={cn(baseClasses, "bg-surface", hover && variants.hover)}>
          {children}
        </div>
      </div>
    );
  }
  
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <h3 className={cn("text-xl font-bold text-foreground mb-2", className)}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <p className={cn("text-foreground-secondary", className)}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn("text-foreground-secondary", className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn("mt-6 pt-4 border-t border-border", className)}>
    {children}
  </div>
);

export default Card;