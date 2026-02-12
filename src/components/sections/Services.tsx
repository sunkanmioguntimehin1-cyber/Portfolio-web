"use client";

import React from "react";
import { siteData } from "@/lib/data";
import Card, { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card";

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-surface/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            We offer comprehensive software engineering services to help you build, scale, and transform your digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.map((service, index) => (
            <Card
              key={service.id}
              hover
              glass
              className="h-full group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-violet-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-surface-light text-xs text-foreground-secondary rounded-full border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-foreground-secondary">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need a custom solution?
          </h3>
          <p className="text-foreground-secondary mb-8 max-w-2xl mx-auto">
            We specialize in tailoring our services to meet your unique business requirements. Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-violet-600 text-white font-medium rounded-xl hover:shadow-glow hover:scale-105 transform transition-all duration-300"
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;