"use client";

import React from "react";
import { siteData } from "@/lib/data";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";

const Portfolio: React.FC = () => {
  const featuredProjects = siteData.portfolio.filter(project => project.featured);
  const allProjects = siteData.portfolio;

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-surface/50 to-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            Explore our latest projects and see how we&apos;ve helped businesses transform their digital presence.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                hover
                className="overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-violet-600/20 rounded-t-2xl flex items-center justify-center">
                  <div className="text-6xl opacity-50">
                    {project.category === "Healthcare" ? "🏥" : 
                     project.category === "FinTech" ? "💰" : 
                     project.category === "E-commerce" ? "🛒" : 
                     project.category === "Education" ? "🎓" : 
                     project.category === "Travel" ? "✈️" : "🚀"}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {project.category}
                    </span>
                    <a 
                      href={project.href} 
                      className="text-accent hover:text-primary transition-colors"
                    >
                      View Case Study →
                    </a>
                  </div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-surface-light text-xs text-foreground-secondary rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Projects */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">All Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <Card
                key={project.id}
                hover
                glass
                className="overflow-hidden group"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-violet-600/10 rounded-t-2xl flex items-center justify-center mb-4">
                  <div className="text-4xl opacity-50">
                    {project.category === "Healthcare" ? "🏥" : 
                     project.category === "FinTech" ? "💰" : 
                     project.category === "E-commerce" ? "🛒" : 
                     project.category === "Education" ? "🎓" : 
                     project.category === "Travel" ? "✈️" : "🚀"}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm text-foreground-secondary mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-surface-light text-xs text-foreground-secondary rounded border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Have a project in mind?
          </h3>
          <p className="text-foreground-secondary mb-8 max-w-2xl mx-auto">
            Let&apos;s collaborate to bring your vision to life with our expertise and innovative approach.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-violet-600 text-white font-medium rounded-xl hover:shadow-glow hover:scale-105 transform transition-all duration-300"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;