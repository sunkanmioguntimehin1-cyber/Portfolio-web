"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface LeadFormProps {
  onSuccess?: () => void;
  className?: string;
}

const REGIONS = [
  { value: "", label: "Select Region" },
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "mena", label: "Middle East & North Africa" },
  { value: "ksa", label: "Kingdom of Saudi Arabia" },
  { value: "anz", label: "Australia & New Zealand" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "restofworld", label: "Rest of World" },
];

const SERVICES = [
  { value: "", label: "Select Service" },
  { value: "remote-it", label: "Remote IT Resources" },
  { value: "custom-software", label: "Custom Software Development" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "ar-vr", label: "AR/VR" },
  { value: "gaming", label: "Gaming" },
  { value: "cyber-security", label: "Cyber Security" },
  { value: "other", label: "Other IT Services" },
];

const inputClass = "w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-foreground font-sans text-sm outline-none transition-all duration-200 focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(59,111,255,0.1)] placeholder:text-foreground-muted/40";
const labelClass = "block font-sans text-xs font-semibold text-foreground-secondary mb-2 tracking-wide";
const selectClass = `${inputClass} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-10`;

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess, className }) => {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", companyName: "",
    companyUrl: "", region: "", service: "", projectDetails: "", lookingForJob: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName, email: formData.email, phone: formData.phone,
          company: formData.companyName, companyUrl: formData.companyUrl,
          region: formData.region, service: formData.service,
          projectDetails: formData.projectDetails, lookingForJob: formData.lookingForJob,
        }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ fullName: "", email: "", phone: "", companyName: "", companyUrl: "", region: "", service: "", projectDetails: "", lookingForJob: "" });
        setTimeout(() => {
          setSubmitStatus("idle");
          onSuccess?.();
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00D4AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">Thank you!</h3>
        <p className="font-sans text-sm text-foreground-muted">Your message has been received. We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5", className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Acme Inc." className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Company URL</label>
        <input type="url" name="companyUrl" value={formData.companyUrl} onChange={handleChange} placeholder="https://acme.com" className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Region</label>
          <select name="region" value={formData.region} onChange={handleChange} className={selectClass}>
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value} className="bg-surface">{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Service you&apos;re looking for</label>
          <select name="service" value={formData.service} onChange={handleChange} className={selectClass}>
            {SERVICES.map((s) => (
              <option key={s.value} value={s.value} className="bg-surface">{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Project Details</label>
        <textarea
          name="projectDetails"
          value={formData.projectDetails}
          onChange={handleChange}
          placeholder="Tell us about your project requirements..."
          rows={4}
          className={`${inputClass} resize-y min-h-[100px]`}
        />
      </div>

      <div>
        <label className={labelClass}>I am looking for a job at SuperSoft</label>
        <select name="lookingForJob" value={formData.lookingForJob} onChange={handleChange} className={selectClass}>
          <option value="" className="bg-surface">Please Select</option>
          <option value="yes" className="bg-surface">Yes</option>
          <option value="no" className="bg-surface">No</option>
        </select>
      </div>

      {submitStatus === "error" && (
        <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-[10px] font-sans text-xs text-red-500">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full py-4 px-6 rounded-xl border-none cursor-pointer font-sans text-sm font-semibold text-white tracking-wide transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          isSubmitting
            ? "bg-primary/50 cursor-not-allowed"
            : "bg-gradient-to-r from-primary to-purple-600 shadow-[0_8px_24px_rgba(59,111,255,0.35)] hover:shadow-[0_12px_32px_rgba(59,111,255,0.5)] hover:-translate-y-0.5"
        )}
      >
        {isSubmitting ? (
          <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="animate-spin"><circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 0 1 10 10" /></svg> Sending...</>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
};

export default LeadForm;
