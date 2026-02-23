/**
 * SuperSoft Lead Collection — Google Apps Script
 * ================================================
 * This script runs as a Web App inside Google Sheets.
 * It receives lead data from your website chatbot and appends
 * each lead as a new row in your spreadsheet.
 *
 * SETUP INSTRUCTIONS (5 minutes):
 * ─────────────────────────────────
 * 1. Go to Google Sheets → https://sheets.google.com
 *    Create a new sheet named "SuperSoft Leads"
 *
 * 2. Add these headers in Row 1 (columns A through H):
 *    Timestamp | Name | Email | Company | Project Type | Budget | Timeline | Source
 *
 * 3. In the sheet, go to Extensions → Apps Script
 *
 * 4. Delete any existing code in the editor and paste THIS ENTIRE FILE
 *
 * 5. Click Save (Ctrl+S / Cmd+S)
 *
 * 6. Click "Deploy" → "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click "Deploy" and copy the Web App URL
 *
 * 7. Add that URL to your .env.local file:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
 *
 * 8. Done! Every new chatbot lead will appear as a new row in your sheet.
 *
 * OPTIONAL — Email alerts:
 * Uncomment the MailApp.sendEmail() block below to also get
 * an email every time a new lead is captured.
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────────
var SHEET_NAME = "SuperSoft Leads";
var NOTIFY_EMAIL = "hello@supersoft.com"; // Change if needed
// ──────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    // Parse incoming JSON
    var data = JSON.parse(e.postData.contents);

    // Get the spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Auto-create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 8).setValues([[
        "Timestamp", "Name", "Email", "Company",
        "Project Type", "Budget", "Timeline", "Source"
      ]]);

      // Style the header row
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#3B6FFF");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Format the timestamp nicely
    var ts = data.timestamp
      ? new Date(data.timestamp).toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      : new Date().toLocaleString();

    // Append the new lead row
    sheet.appendRow([
      ts,
      data.name || "",
      data.email || "",
      data.company || "",
      data.projectType || "",
      data.budget || "",
      data.timeline || "",
      data.source || "Website Chatbot"
    ]);

    // Auto-resize all columns for readability
    sheet.autoResizeColumns(1, 8);

    // ── OPTIONAL: Email alert for each new lead ──────────────────────────────
    // Remove the /* and */ below to enable email alerts
    /*
    if (data.email) {
      var subject = "🎯 New Lead: " + (data.name || "Unknown") + " from " + (data.company || "Unknown");
      var body = [
        "New lead captured from the SuperSoft website chatbot.",
        "",
        "Name:         " + (data.name || "–"),
        "Email:        " + (data.email || "–"),
        "Company:      " + (data.company || "–"),
        "Project Type: " + (data.projectType || "–"),
        "Budget:       " + (data.budget || "–"),
        "Timeline:     " + (data.timeline || "–"),
        "Captured:     " + ts,
        "",
        "View all leads: " + ss.getUrl()
      ].join("\n");

      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    }
    */
    // ────────────────────────────────────────────────────────────────────────

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("Error processing lead:", err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health-check endpoint (GET request)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", service: "SuperSoft Lead Collector" }))
    .setMimeType(ContentService.MimeType.JSON);
}