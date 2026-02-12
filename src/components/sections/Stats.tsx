import React from "react";
import { siteData } from "@/lib/data";
import AnimatedCounter from "../ui/AnimatedCounter";

const Stats: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-surface/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Numbers that speak to our commitment and expertise in delivering exceptional software solutions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {siteData.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl glass hover:scale-105 transform transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AnimatedCounter
                end={stat.number}
                suffix={stat.suffix}
                className="mb-4"
              />
              <div className="text-lg text-foreground-secondary font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border">
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-foreground-secondary">Support Available</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-foreground-secondary">Uptime SLA</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-surface/50 border border-border">
            <div className="text-3xl font-bold gradient-text mb-2">48h</div>
            <div className="text-foreground-secondary">Average Response Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;