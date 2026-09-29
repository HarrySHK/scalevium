/**
 * Scalevium contact form → Google Sheet
 *
 * 1. Sheet row 1 headers:
 *    submitted_at | first_name | last_name | company | email | phone | interest | budget | timeline | message
 * 2. Extensions → Apps Script → replace Code.gs with this file → set SPREADSHEET_ID → Save
 * 3. Run testAppendRow once (authorize) → confirm a row in the sheet
 * 4. Deploy → Web app: Execute as Me, Who has access: Anyone → copy /exec URL to .env GOOGLE_SHEETS_WEBHOOK_URL
 */

/** From sheet URL: https://docs.google.com/spreadsheets/d/THIS_ID/edit */
var SPREADSHEET_ID = "1UUyFh9NImrjdXi3tKRRL9zwqeQRHZgz7Fw5LM47_W8U";

/**
 * Opens the target sheet tab (first tab).
 */
function getSheet_() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.length > 10) {
    return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  }
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      "Set SPREADSHEET_ID at the top of Code.gs, or open this project from Extensions → Apps Script on your Sheet."
    );
  }
  return active.getSheets()[0];
}

/**
 * Web app entry — POST JSON from scalevium.com /api/contact
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing POST body.");
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    sheet.appendRow([
      data.submitted_at || new Date().toISOString(),
      data.first_name || "",
      data.last_name || "",
      data.company || "",
      data.email || "",
      data.phone || "",
      data.interest || "",
      data.budget || "",
      data.timeline || "",
      data.message || "",
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

/**
 * Optional GET — open /exec in browser; should return ok if deployment allows access.
 */
function doGet() {
  return jsonResponse_({ ok: true, message: "Scalevium contact webhook is running." });
}

/**
 * Editor test — Run ▶ with this function selected.
 */
function testAppendRow() {
  var mockEvent = {
    postData: {
      contents: JSON.stringify({
        submitted_at: new Date().toISOString(),
        first_name: "Script",
        last_name: "Test",
        company: "Scalevium",
        email: "test@example.com",
        phone: "+1 555 000 0000",
        interest: "AI Development",
        budget: "$25k – $75k",
        timeline: "1–3 months",
        message: "Row from testAppendRow() in Apps Script editor.",
      }),
    },
  };

  var result = doPost(mockEvent);
  Logger.log(result.getContent());
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
