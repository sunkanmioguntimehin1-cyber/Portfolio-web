"use client";

import React from "react";
import { siteData } from "@/lib/data";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";

const Industries: React.FC = () => {
  return (
    <section id="industries" className="py-20 bg-gradient-to-b from-surface/50 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Industries We <span className="gradient-text">Serve</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            We have deep expertise across multiple industries, delivering tailored solutions that drive innovation and growth.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.industries.map((industry, index) => (
            <Card
              key={industry.id}
              hover
              glass
              className="h-full text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-violet-600 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {industry.icon}
                </div>
                <CardTitle>{industry.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="mb-4">
                  {industry.description}
                </CardDescription>
                <div className="text-2xl font-bold gradient-text">
                  {industry.projects}+
                </div>
                <div className="text-sm text-foreground-secondary">
                  Projects Completed
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;