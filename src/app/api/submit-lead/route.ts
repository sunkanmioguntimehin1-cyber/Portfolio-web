import { NextRequest, NextResponse } from "next/server";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const NOTIFY_EMAIL = "hello@supersoft.com";
const SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || "";
// ─────────────────────────────────────────────────────────────────────────────

interface LeadData {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
}

interface SubmitLeadBody {
  lead: LeadData;
  summary: string;
  conversation: Array<{ role: string; content: string; time: string }>;
}

// Send email via Resend (or swap for SendGrid / Nodemailer)
async function sendEmailNotification(lead: LeadData, summary: string) {
  const resendKey = process.env.RESEND_API_KEY;

  // If no Resend key, log and skip (won't crash the app)
  if (!resendKey) {
    console.log("No RESEND_API_KEY set — skipping email. Lead data:", summary);
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #3B6FFF, #7C3AED); padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">🎯 New Lead from SuperSoft Chatbot</h1>
        <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">
          Captured at ${new Date().toLocaleString()}
        </p>
      </div>
      <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse;">
          ${[
            ["👤 Name", lead.name],
            ["📧 Email", lead.email],
            ["🏢 Company", lead.company],
            ["💻 Project Type", lead.projectType],
            ["💰 Budget", lead.budget],
            ["⏱️ Timeline", lead.timeline],
          ]
            .map(
              ([label, value]) => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #374151; width: 140px;">
                ${label}
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #4b5563;">
                ${value || "<em style='color:#9ca3af'>Not provided</em>"}
              </td>
            </tr>`,
            )
            .join("")}
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          <h3 style="margin: 0 0 8px; color: #374151; font-size: 14px;">📅 Suggested Next Step</h3>
          <p style="margin: 0; color: #6b7280; font-size: 13px;">
            ${lead.email ? `Reply to <strong>${lead.email}</strong> within 24 hours.` : "Reach out via the contact info above."}
            Consider inviting them to book a call at
            <a href="https://calendly.com/sunkanmi" style="color: #3B6FFF;">calendly.com/sunkanmi</a>
          </p>
        </div>
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Aria (SuperSoft Bot) <noreply@supersoft.com>",
      to: [NOTIFY_EMAIL],
      subject: `🎯 New Lead: ${lead.name || "Unknown"} from ${lead.company || "Unknown Company"}`,
      html,
    }),
  });
}

// Post to Google Sheets via Apps Script webhook
async function postToGoogleSheets(lead: LeadData) {
  if (!SHEETS_WEBHOOK_URL) {
    console.log("No GOOGLE_SHEETS_WEBHOOK_URL set — skipping Sheets sync.");
    return;
  }

  await fetch(SHEETS_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      name: lead.name || "",
      email: lead.email || "",
      company: lead.company || "",
      projectType: lead.projectType || "",
      budget: lead.budget || "",
      timeline: lead.timeline || "",
      source: "Website Chatbot",
    }),
  });
}

// ─── ROUTE HANDLER ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: SubmitLeadBody = await req.json();
    const { lead, summary } = body;

    // Fire both in parallel — don't block on either
    await Promise.allSettled([
      sendEmailNotification(lead, summary),
      postToGoogleSheets(lead),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submit lead error:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 },
    );
  }
}
