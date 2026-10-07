export const COOKIE_CONSENT_STORAGE_KEY = "scalevium-cookie-consent";

export type CookieConsentChoice = "accepted" | "declined";

export const COOKIE_CONSENT_EVENT = "scalevium:cookie-consent";

export function getCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
    return null;
  } catch {
    return null;
  }
}

export function setCookieConsent(choice: CookieConsentChoice) {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
}

export function analyticsAllowed(): boolean {
  return getCookieConsent() === "accepted";
}
