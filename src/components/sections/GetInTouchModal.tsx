"use client";

import React, { useEffect } from "react";
import LeadForm from "@/components/ui/LeadForm";

interface GetInTouchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetInTouchModal: React.FC<GetInTouchModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/78 backdrop-blur-md z-[999] animate-[git-fadeIn_0.2s_ease]"
      />

      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-[min(520px,95vw)] max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-primary/20 shadow-[0_40px_120px_rgba(0,0,0,0.8)] animate-[git-slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <h2 className="font-display text-xl font-bold text-foreground m-0">
            Get In Touch
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-[10px] bg-white/[0.05] border-none cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <LeadForm onSuccess={onClose} />
        </div>
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
      `}</style>
    </>
  );
};

export default GetInTouchModal;
