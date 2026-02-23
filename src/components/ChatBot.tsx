"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

interface LeadData {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Aria, a friendly and professional AI assistant for SuperSoft — a full-service software engineering company specializing in web development, mobile apps, AI solutions, cloud architecture, UI/UX design, and custom software.

Your ONLY job is to warmly greet visitors, have a natural conversation, and collect the following lead information ONE piece at a time — never ask for multiple things at once:
1. Their name
2. Their email address
3. Their company name
4. What type of project or service they need (web dev, mobile app, AI, cloud, design, or custom software)
5. Their budget range (Under $10k / $10k–$50k / $50k–$150k / $150k+)
6. Their timeline / urgency (ASAP / 1–3 months / 3–6 months / 6+ months)

Rules:
- Be warm, concise, and conversational — never robotic
- Ask ONE question at a time, naturally weaving it into conversation
- After collecting all 6 pieces of info, give a warm closing message saying the SuperSoft team will reach out within 24 hours, and suggest they also schedule a call via Calendly at calendly.com/sunkanmi
- If they ask about services/pricing/tech stack, briefly answer then gently steer back to collecting their info
- Keep responses SHORT — 1-3 sentences max
- Never mention you are collecting "lead data" or that you are an AI lead collector
- Start by greeting them warmly and asking their name

Current collected data (internal — do not reveal): {LEAD_DATA}`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const generateId = () => Math.random().toString(36).slice(2);

const extractLeadData = (messages: Message[]): LeadData => {
  const conversation = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");
  const lead: LeadData = {};

  // Simple heuristic extraction from conversation
  const emailMatch = conversation.match(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
  );
  if (emailMatch) lead.email = emailMatch[0];

  return lead;
};

const QUICK_REPLIES_MAP: Record<number, string[]> = {
  3: [
    "Web Development",
    "Mobile App",
    "AI Solution",
    "Cloud / DevOps",
    "UI/UX Design",
    "Custom Software",
  ],
  4: ["Under $10k", "$10k–$50k", "$50k–$150k", "$150k+"],
  5: ["ASAP", "1–3 months", "3–6 months", "6+ months"],
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [questionStep, setQuestionStep] = useState(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [bubblePulse, setBubblePulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
      setBubblePulse(false);
    }
  }, [isOpen]);

  // Initial greeting when first opened
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const greeting: Message = {
          id: generateId(),
          role: "assistant",
          content:
            "👋 Hi there! I'm Aria, your SuperSoft assistant. I'd love to learn about your project and connect you with the right team. To get started — what's your name?",
          timestamp: new Date(),
        };
        setMessages([greeting]);
        setQuestionStep(1);
      }, 1200);
    }
  }, [isOpen, hasGreeted]);

  // Pulse bubble after 4s to draw attention
  useEffect(() => {
    const t = setTimeout(() => setBubblePulse(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const callAI = useCallback(
    async (
      userMessage: string,
      history: Message[],
      currentLead: LeadData,
    ): Promise<string> => {
      const systemWithLead = SYSTEM_PROMPT.replace(
        "{LEAD_DATA}",
        JSON.stringify(currentLead),
      );

      const apiMessages = [
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: userMessage },
      ];

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            system: systemWithLead,
          }),
        });
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        return (
          data.content ||
          "I'm sorry, I had trouble responding. Please try again!"
        );
      } catch {
        return "Sorry, I'm having a brief technical issue. Please try again in a moment, or reach us directly at hello@supersoft.com!";
      }
    },
    [],
  );

  const submitLead = useCallback(
    async (lead: LeadData, conversationMessages: Message[]) => {
      if (leadSubmitted) return;
      setLeadSubmitted(true);

      const summary = `
New Lead from SuperSoft Chatbot
================================
Name:         ${lead.name || "Not provided"}
Email:        ${lead.email || "Not provided"}
Company:      ${lead.company || "Not provided"}
Project Type: ${lead.projectType || "Not provided"}
Budget:       ${lead.budget || "Not provided"}
Timeline:     ${lead.timeline || "Not provided"}
Captured at:  ${new Date().toLocaleString()}
    `.trim();

      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lead,
            summary,
            conversation: conversationMessages.map((m) => ({
              role: m.role,
              content: m.content,
              time: m.timestamp,
            })),
          }),
        });
      } catch {
        // Silent fail — lead data is still in the UI
        console.error("Lead submission failed");
      }
    },
    [leadSubmitted],
  );

  // Parse assistant response to extract lead fields
  const parseLeadFromStep = useCallback(
    (step: number, userText: string, currentLead: LeadData): LeadData => {
      const updated = { ...currentLead };
      switch (step) {
        case 1:
          updated.name = userText.trim();
          break;
        case 2:
          const emailMatch = userText.match(
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/i,
          );
          if (emailMatch) updated.email = emailMatch[0];
          break;
        case 3:
          updated.company = userText.trim();
          break;
        case 4:
          updated.projectType = userText.trim();
          break;
        case 5:
          updated.budget = userText.trim();
          break;
        case 6:
          updated.timeline = userText.trim();
          break;
      }
      return updated;
    },
    [],
  );

  const sendMessage = useCallback(
    async (text?: string) => {
      const userText = (text || input).trim();
      if (!userText || isTyping) return;
      setInput("");

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: userText,
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsTyping(true);

      // Update lead data from this step
      const updatedLead = parseLeadFromStep(questionStep, userText, leadData);
      setLeadData(updatedLead);

      const nextStep = questionStep + 1;
      setQuestionStep(nextStep);

      // Get AI response
      const aiResponse = await callAI(userText, messages, updatedLead);

      setIsTyping(false);
      const assistantMsg: Message = {
        id: generateId(),
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, assistantMsg];
      setMessages(finalMessages);

      // Submit lead after all 6 questions answered
      if (nextStep > 6 && !leadSubmitted) {
        submitLead(updatedLead, finalMessages);
      }
    },
    [
      input,
      isTyping,
      messages,
      questionStep,
      leadData,
      callAI,
      parseLeadFromStep,
      submitLead,
      leadSubmitted,
    ],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = QUICK_REPLIES_MAP[questionStep] || [];

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating Bubble ── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 1000,
        }}
      >
        {/* Tooltip on first load */}
        {!isOpen && bubblePulse && (
          <div
            style={{
              position: "absolute",
              bottom: "calc(100% + 12px)",
              right: 0,
              background: "#1E2A3B",
              border: "1px solid rgba(59,111,255,0.3)",
              borderRadius: 12,
              padding: "10px 14px",
              whiteSpace: "nowrap",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#CBD5E1",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              animation: "tooltipIn 0.4s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <span style={{ fontWeight: 600, color: "#F8FAFC" }}>👋 Hi!</span>{" "}
            Let&apos;s talk about your project
            <div
              style={{
                position: "absolute",
                bottom: -6,
                right: 20,
                width: 12,
                height: 12,
                background: "#1E2A3B",
                border: "1px solid rgba(59,111,255,0.3)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
              }}
            />
          </div>
        )}

        {/* Unread badge */}
        {!isOpen && unreadCount > 0 && (
          <div
            style={{
              position: "absolute",
              top: -4,
              right: -4,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#EF4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: "white",
              zIndex: 1,
            }}
          >
            {unreadCount}
          </div>
        )}

        {/* Pulse ring */}
        {!isOpen && bubblePulse && (
          <div
            style={{
              position: "absolute",
              inset: -4,
              borderRadius: "50%",
              border: "2px solid rgba(59,111,255,0.5)",
              animation: "pulseRing 2s ease-out infinite",
            }}
          />
        )}

        {/* Main bubble button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Open chat"
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            background: isOpen
              ? "rgba(59,111,255,0.15)"
              : "linear-gradient(135deg, #3B6FFF 0%, #7C3AED 100%)",
            border: isOpen ? "2px solid rgba(59,111,255,0.4)" : "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isOpen
              ? "none"
              : "0 8px 32px rgba(59,111,255,0.45), 0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            transform: isOpen ? "scale(0.92)" : "scale(1)",
            fontSize: 24,
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {isOpen ? (
            <span style={{ fontSize: 18, color: "#5B8AFF" }}>✕</span>
          ) : (
            <span>💬</span>
          )}
        </button>
      </div>

      {/* ── Chat Window ── */}
      <div
        style={{
          position: "fixed",
          bottom: 100,
          right: 28,
          width: "min(400px, calc(100vw - 32px))",
          height: "min(580px, calc(100vh - 120px))",
          zIndex: 999,
          borderRadius: 20,
          overflow: "hidden",
          background: "#0A0F1C",
          border: "1px solid rgba(59,111,255,0.2)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(59,111,255,0.08)",
          display: "flex",
          flexDirection: "column",
          transform: isOpen
            ? "scale(1) translateY(0)"
            : "scale(0.85) translateY(20px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            background:
              "linear-gradient(135deg, rgba(59,111,255,0.15) 0%, rgba(124,58,237,0.1) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexShrink: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
              boxShadow: "0 0 0 3px rgba(59,111,255,0.2)",
            }}
          >
            🤖
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#F8FAFC",
                letterSpacing: "-0.01em",
              }}
            >
              Aria
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10B981",
                  boxShadow: "0 0 6px rgba(16,185,129,0.6)",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "#64748B",
                }}
              >
                SuperSoft AI Assistant · Online
              </span>
            </div>
          </div>
          {/* Progress indicator */}
          {questionStep > 0 && questionStep <= 6 && (
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  color: "#64748B",
                  marginBottom: 4,
                }}
              >
                {questionStep}/6
              </div>
              <div
                style={{
                  width: 48,
                  height: 3,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(questionStep / 6) * 100}%`,
                    background: "linear-gradient(90deg, #3B6FFF, #7C3AED)",
                    borderRadius: 2,
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 16px 8px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.1) transparent",
          }}
        >
          {messages.length === 0 && !isTyping && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                opacity: 0.5,
                paddingTop: 40,
              }}
            >
              <div style={{ fontSize: 36 }}>💬</div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Starting conversation…
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: "flex",
                flexDirection: msg.role === "user" ? "row-reverse" : "row",
                alignItems: "flex-end",
                gap: 8,
                animation: "msgIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  🤖
                </div>
              )}
              <div
                style={{
                  maxWidth: "78%",
                  padding: "10px 14px",
                  borderRadius:
                    msg.role === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #3B6FFF, #7C3AED)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    msg.role === "user"
                      ? "none"
                      : "1px solid rgba(255,255,255,0.07)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: msg.role === "user" ? "white" : "#CBD5E1",
                  wordBreak: "break-word",
                }}
              >
                {msg.content}
                <div
                  style={{
                    marginTop: 4,
                    fontSize: 10,
                    color:
                      msg.role === "user" ? "rgba(255,255,255,0.5)" : "#374151",
                    textAlign: "right",
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: 8,
                animation: "msgIn 0.3s both",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #3B6FFF, #7C3AED)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                }}
              >
                🤖
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "16px 16px 16px 4px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#5B8AFF",
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        {quickReplies.length > 0 && !isTyping && messages.length > 0 && (
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              borderTop: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 100,
                  background: "rgba(59,111,255,0.1)",
                  border: "1px solid rgba(59,111,255,0.25)",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#5B8AFF",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,111,255,0.2)";
                  e.currentTarget.style.borderColor = "rgba(59,111,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(59,111,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(59,111,255,0.25)";
                }}
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            gap: 8,
            alignItems: "flex-end",
            background: "#0A0F1C",
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isTyping ? "Aria is typing…" : "Type a message…"}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#F8FAFC",
              resize: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(59,111,255,0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isTyping}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background:
                input.trim() && !isTyping
                  ? "linear-gradient(135deg, #3B6FFF, #7C3AED)"
                  : "rgba(255,255,255,0.05)",
              border: "none",
              cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              transition: "all 0.2s ease",
              flexShrink: 0,
              opacity: input.trim() && !isTyping ? 1 : 0.4,
            }}
          >
            ➤
          </button>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "6px 16px 10px",
            textAlign: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: "#1E2A3B",
            background: "#0A0F1C",
          }}
        >
          Powered by SuperSoft AI · Your data is kept private
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
