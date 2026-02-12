"use client";

import React from "react";
import { siteData } from "@/lib/data";
import Button from "../ui/Button";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-surface/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">{siteData.contact.title}</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            {siteData.contact.subtitle}
          </p>
        </div>

        {/* Contact CTA Card */}
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border">
            <div className="bg-surface rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Contact Info */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        📧
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Email</div>
                        <a 
                          href={`mailto:${siteData.contact.email}`}
                          className="text-foreground-secondary hover:text-primary transition-colors"
                        >
                          {siteData.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        📞
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Phone</div>
                        <a 
                          href={`tel:${siteData.contact.phone}`}
                          className="text-foreground-secondary hover:text-primary transition-colors"
                        >
                          {siteData.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        📍
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Headquarters</div>
                        <div className="text-foreground-secondary">
                          {siteData.contact.address}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Locations */}
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Global Presence
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {siteData.contact.officeLocations.map((location, index) => (
                      <div
                        key={index}
                        className="p-4 bg-surface-light rounded-xl border border-border hover:border-primary transition-colors duration-300"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                          🌍
                        </div>
                        <div className="text-sm text-foreground font-medium">
                          {location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => window.open(`mailto:${siteData.contact.email}`)}>
                    {siteData.contact.cta}
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => window.open(`tel:${siteData.contact.phone}`)}>
                    Schedule a Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Ready to start your project?
            </h3>
            <p className="text-foreground-secondary mb-8">
              Our team is excited to learn about your vision and discuss how we can help bring it to life. 
              Whether you have a detailed specification or just an idea, we&apos;re here to help.
            </p>
            
            {/* Response Time Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl glass">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-medium text-foreground mb-1">Quick Response</div>
                <div className="text-sm text-foreground-secondary">Get a reply within 24 hours</div>
              </div>
              <div className="p-6 rounded-xl glass">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-medium text-foreground mb-1">Free Consultation</div>
                <div className="text-sm text-foreground-secondary">No-obligation project assessment</div>
              </div>
              <div className="p-6 rounded-xl glass">
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-medium text-foreground mb-1">Fast Start</div>
                <div className="text-sm text-foreground-secondary">Project kickoff within 1 week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;