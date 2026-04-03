"use client";

import React, { useState, useEffect } from "react";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
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

const GetInTouchModal: React.FC<GetInTouchModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    companyUrl: "",
    region: "",
    service: "",
    projectDetails: "",
    lookingForJob: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.companyName,
          companyUrl: formData.companyUrl,
          region: formData.region,
          service: formData.service,
          projectDetails: formData.projectDetails,
          lookingForJob: formData.lookingForJob,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          companyUrl: "",
          region: "",
          service: "",
          projectDetails: "",
          lookingForJob: "",
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 10,
    color: "#F8FAFC",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
    transition: "all 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#94A3B8",
    marginBottom: 8,
    letterSpacing: "0.02em",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.78)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 999,
          animation: "git-fadeIn 0.2s ease",
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          width: "min(520px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 16,
          background: "#0D1120",
          border: "1px solid rgba(59, 111, 255, 0.2)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
          animation: "git-slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 20,
              fontWeight: 700,
              color: "#F8FAFC",
              margin: 0,
            }}
          >
            Get In Touch
          </h2>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 24 }}>
          {submitStatus === "success" ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 20px",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(0, 212, 170, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00D4AA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F8FAFC",
                  marginBottom: 8,
                }}
              >
                Thank you!
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "#64748B",
                }}
              >
                Your message has been received. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gap: 20 }}>
                {/* Full Name & Email Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                        (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                        (e.target as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                        (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                        (e.target as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Phone & Company Name Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                        (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                        (e.target as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Inc."
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                        (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                        (e.target as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Company URL */}
                <div>
                  <label style={labelStyle}>Company URL</label>
                  <input
                    type="url"
                    name="companyUrl"
                    value={formData.companyUrl}
                    onChange={handleChange}
                    placeholder="https://acme.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                      (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Region & Services Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Region</label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: 40,
                      }}
                    >
                      {REGIONS.map((region) => (
                        <option key={region.value} value={region.value} style={{ background: "#0D1120" }}>
                          {region.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Services you're looking for</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        cursor: "pointer",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 14px center",
                        paddingRight: 40,
                      }}
                    >
                      {SERVICES.map((service) => (
                        <option key={service.value} value={service.value} style={{ background: "#0D1120" }}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label style={labelStyle}>Project Details</label>
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 100,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "rgba(59, 111, 255, 0.5)";
                      (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(59, 111, 255, 0.1)";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLTextAreaElement).style.borderColor = "rgba(255, 255, 255, 0.08)";
                      (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Looking for job */}
                <div>
                  <label style={labelStyle}>I am looking for a job at SuperSoft</label>
                  <select
                    name="lookingForJob"
                    value={formData.lookingForJob}
                    onChange={handleChange}
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: 40,
                    }}
                  >
                    <option value="" style={{ background: "#0D1120" }}>Please Select</option>
                    <option value="yes" style={{ background: "#0D1120" }}>Yes</option>
                    <option value="no" style={{ background: "#0D1120" }}>No</option>
                  </select>
                </div>
              </div>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 16px",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#EF4444",
                  }}
                >
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  marginTop: 24,
                  padding: "16px 24px",
                  borderRadius: 12,
                  background: isSubmitting
                    ? "rgba(59, 111, 255, 0.5)"
                    : "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
                  border: "none",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "white",
                  letterSpacing: "0.01em",
                  transition: "all 0.25s ease",
                  boxShadow: isSubmitting ? "none" : "0 8px 24px rgba(59, 111, 255, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(59, 111, 255, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(59, 111, 255, 0.35)";
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      style={{ animation: "git-spin 1s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </>
          )}
        </form>
      </div>

      <style>{`
        @keyframes git-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes git-slideUp {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to { opacity: 1; transform: translate(-50%, -50%); }
        }
        @keyframes git-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default GetInTouchModal;
