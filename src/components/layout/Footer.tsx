"use client";

import React from "react";
import { Twitter, Linkedin, Github, Instagram } from "lucide-react";
import { siteData } from "@/lib/data";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 py-16 border-b border-white/[0.05]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-[10px] flex items-center justify-center font-display font-bold text-base text-white">
                S
              </div>
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                {siteData.company.name}
              </span>
            </div>
            <p className="font-sans text-sm text-foreground-muted leading-relaxed max-w-[300px] mb-6">
              {siteData.company.description}
            </p>
            {/* Social links */}
            <div className="flex gap-2">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Github, label: "GitHub" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-foreground-muted no-underline transition-all duration-200 hover:bg-teal-400/15 hover:border-teal-400/30 hover:text-teal-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          {[
            { title: "Quick Links", items: siteData.footer.quickLinks },
            { title: "Services", items: siteData.footer.services },
            { title: "Industries", items: siteData.footer.industries },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 className="font-display text-xs font-bold text-foreground tracking-wide mb-5 uppercase">
                {title}
              </h4>
              <ul className="list-none flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="font-sans text-sm text-foreground-muted no-underline transition-colors duration-200 hover:text-foreground-secondary focus-visible:outline-none focus-visible:text-foreground-secondary"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
          <p className="font-sans text-xs text-slate-700">
            &copy; {year} {siteData.company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="font-sans text-xs text-slate-700 no-underline transition-colors duration-200 hover:text-foreground-muted focus-visible:outline-none focus-visible:text-foreground-muted"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
