"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/data";
import SectionHeader from "@/components/ui/SectionHeader";
import LeadForm from "@/components/ui/LeadForm";

const CALENDLY_URL = "https://calendly.com/sunkanmi";
const GOOGLE_VOICE_NUMBER = "+1 (555) 987-6663";
const GOOGLE_VOICE_TEL = "+15559876663";

const CalendlyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const iframeSrc = `${CALENDLY_URL}?embed_domain=${typeof window !== "undefined" ? window.location.hostname : "localhost"}&embed_type=Inline&hide_gdpr_banner=1&background_color=0D1120&text_color=F8FAFC&primary_color=3B6FFF`;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/78 backdrop-blur-md z-[999] animate-fadeIn"
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-[min(920px,95vw)] h-[min(720px,90vh)] rounded-xl overflow-hidden bg-surface border border-primary/25 shadow-[0_40px_120px_rgba(0,0,0,0.8)] flex flex-col animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] flex-shrink-0 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-sm">
              📅
            </div>
            <div>
              <div className="font-display text-sm font-bold text-foreground tracking-tight">Schedule a Call</div>
              <div className="font-sans text-[11px] text-foreground-muted">calendly.com/sunkanmi · Pick a time that works for you</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[34px] h-[34px] rounded-lg bg-white/[0.05] border border-white/[0.08] cursor-pointer flex items-center justify-center text-foreground-muted text-base transition-all duration-200 hover:bg-red-500/15 hover:border-red-500/30 hover:text-red-500 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 relative min-h-0">
          <div
            id="cly-loader"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 bg-surface z-[2] transition-opacity duration-300"
          >
            <div className="w-[38px] h-[38px] border-[3px] border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="font-sans text-xs text-foreground-muted">Loading your calendar…</span>
          </div>
          <iframe
            src={iframeSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule a call"
            className="block border-none min-h-[580px]"
            onLoad={() => {
              const loader = document.getElementById("cly-loader");
              if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => { loader.style.display = "none"; }, 300);
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

const Contact: React.FC = () => {
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  return (
    <>
      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />

      <section
        id="contact"
        className="relative py-[120px] bg-background overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(59,111,255,0.07)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <SectionHeader
            label="Get In Touch"
            title="Let's discuss your project"
            gradientWord="discuss"
            description="Enter your details and someone from our team will reach out to find a time to connect with you."
            className="mb-16"
          />

          {/* Two-column layout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-[1050px] mx-auto rounded-2xl border border-white/[0.07] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr]">
              {/* Left: Contact Info */}
              <div className="p-10 md:p-11 bg-primary/[0.04] border-b md:border-b-0 md:border-r border-white/[0.06]">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight mb-8">
                  Contact Information
                </h3>

                <div className="flex flex-col gap-5 mb-10">
                  {[
                    { icon: "📧", label: "Email", value: siteData.contact.email, href: `mailto:${siteData.contact.email}` },
                    { icon: "📞", label: "Phone", value: GOOGLE_VOICE_NUMBER, href: `tel:${GOOGLE_VOICE_TEL}` },
                    { icon: "📍", label: "Office", value: siteData.contact.address, href: undefined },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-lg flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <div className="font-sans text-[11px] font-semibold text-foreground-muted uppercase tracking-wider mb-1">
                          {label}
                        </div>
                        {href ? (
                          <a href={href} className="font-sans text-sm text-foreground-secondary no-underline hover:text-primary-light transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="font-sans text-sm text-foreground-secondary">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Global Offices */}
                <div>
                  <div className="font-sans text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-4">
                    Global Offices
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {siteData.contact.officeLocations.map((loc) => (
                      <div
                        key={loc}
                        className="px-3.5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] font-sans text-xs text-foreground-secondary"
                      >
                        🌍 {loc}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule a Call alternative */}
                <div className="mt-10 pt-6 border-t border-white/[0.06]">
                  <p className="font-sans text-xs text-foreground-muted mb-4">
                    Prefer to pick a time directly?
                  </p>
                  <button
                    onClick={() => setCalendlyOpen(true)}
                    className="w-full py-3 px-5 rounded-[10px] bg-transparent border border-white/10 cursor-pointer font-sans text-sm font-semibold text-foreground-secondary transition-all duration-200 hover:bg-primary/10 hover:border-primary/40 hover:text-primary-light flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    <span>📅</span> Schedule a Call
                  </button>
                </div>
              </div>

              {/* Right: Inline Form */}
              <div className="p-10 md:p-11 bg-surface">
                <h3 className="font-display text-xl font-bold text-foreground tracking-tight mb-6">
                  Send Us a Message
                </h3>
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;
