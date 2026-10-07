/** Minimum ms between form mount and submit — blocks instant bot posts. */
export const CONTACT_FORM_MIN_SUBMIT_MS = 2500;

export type ContactSpamFields = {
  /** Honeypot — must stay empty */
  _hp?: string;
  /** Client timestamp (ms) when the form was first rendered */
  _formStartedAt?: number;
};

export function getContactSpamError(fields: ContactSpamFields): string | undefined {
  if (fields._hp?.trim()) {
    return "Submission rejected.";
  }

  const started = fields._formStartedAt;
  if (typeof started !== "number" || !Number.isFinite(started)) {
    return "Submission rejected. Please refresh and try again.";
  }

  const elapsed = Date.now() - started;
  if (elapsed < CONTACT_FORM_MIN_SUBMIT_MS) {
    return "Please take a moment to complete the form before submitting.";
  }

  return undefined;
}
