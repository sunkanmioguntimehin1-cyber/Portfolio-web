"use client";

import React from "react";
import { siteData } from "@/lib/data";
import Button from "../ui/Button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold text-foreground">
                {siteData.company.name}
              </span>
            </div>
            <p className="text-foreground-secondary mb-6 max-w-md">
              {siteData.company.description}
            </p>
            <div className="flex space-x-4">
              {siteData.footer.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transform transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {siteData.footer.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {siteData.footer.services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {siteData.footer.industries.map((industry) => (
                <li key={industry.name}>
                  <a
                    href={industry.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-200"
                  >
                    {industry.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 rounded-2xl gradient-border">
          <div className="bg-surface rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              {siteData.contact.title}
            </h3>
            <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
              {siteData.contact.subtitle}
            </p>
            <Button 
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {siteData.contact.cta}
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground-secondary text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} {siteData.company.name}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-foreground-secondary hover:text-foreground transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground-secondary hover:text-foreground transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-foreground-secondary hover:text-foreground transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;