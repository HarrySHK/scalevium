import { NextResponse } from "next/server";
import { validateContactForm, contactFormToPayload, type ContactFormData } from "@/lib/contactForm";
import { createAdminClient } from "@/lib/supabase/admin";
import { postToGoogleAppsScript } from "@/lib/googleSheetsWebhook";
import { CONTACT_EMAIL } from "@/lib/site";
import { getContactSpamError, type ContactSpamFields } from "@/lib/contactSpam";

export async function POST(request: Request) {
  let body: Partial<ContactFormData> & ContactSpamFields;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const spamFields: ContactSpamFields = {
    _hp: typeof body._hp === "string" ? body._hp : undefined,
    _formStartedAt:
      typeof body._formStartedAt === "number"
        ? body._formStartedAt
        : typeof body._formStartedAt === "string"
          ? Number(body._formStartedAt)
          : undefined,
  };
  const spamError = getContactSpamError(spamFields);
  if (spamError) {
    return NextResponse.json({ error: spamError }, { status: 400 });
  }

  const form: ContactFormData = {
    firstName: String(body.firstName ?? ""),
    lastName: String(body.lastName ?? ""),
    company: String(body.company ?? ""),
    email: String(body.email ?? ""),
    phone: String(body.phone ?? ""),
    interest: String(body.interest ?? ""),
    budget: String(body.budget ?? ""),
    timeline: String(body.timeline ?? ""),
    message: String(body.message ?? ""),
  };

  const errors = validateContactForm(form);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", fields: errors }, { status: 400 });
  }

  const row = contactFormToPayload(form);

  try {
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("contact_inquiries").insert(row);

    if (dbError) {
      console.error("[contact] Supabase insert failed:", dbError.message);
      return NextResponse.json(
        { error: `We could not save your inquiry. Please try again or email ${CONTACT_EMAIL}.` },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[contact] Supabase client error:", err);
    return NextResponse.json(
      { error: `Server configuration error. Please email ${CONTACT_EMAIL}.` },
      { status: 500 }
    );
  }

  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (sheetsUrl) {
    try {
      const sheetPayload = {
        submitted_at: new Date().toISOString(),
        ...row,
      };
      const sheetRes = await postToGoogleAppsScript(sheetsUrl, sheetPayload);
      if (!sheetRes.ok) {
        if (sheetRes.status === 401 || sheetRes.status === 403) {
          console.error(
            "[contact] Google Sheets webhook unauthorized (",
            sheetRes.status,
            "). Redeploy Apps Script web app with Who has access: Anyone (not “Anyone with Google account”).",
          );
        } else {
          console.error("[contact] Google Sheets webhook failed:", sheetRes.status, sheetRes.body);
        }
      }
    } catch (err) {
      console.error("[contact] Google Sheets webhook error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
