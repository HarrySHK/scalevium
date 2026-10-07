"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  setCookieConsent,
  type CookieConsentChoice,
} from "@/lib/cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getCookieConsent() === null);

    const onChange = () => setVisible(getCookieConsent() === null);
    window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
  }, []);

  const choose = (choice: CookieConsentChoice) => {
    setCookieConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title" aria-live="polite">
      <div className="cookie-consent-inner">
        <p id="cookie-consent-title" className="cookie-consent-text">
          We use essential cookies for site function and, if you accept, analytics to understand traffic. See our{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </p>
        <div className="cookie-consent-actions">
          <button type="button" className="cookie-consent-btn cookie-consent-btn--ghost" onClick={() => choose("declined")}>
            Decline analytics
          </button>
          <button type="button" className="cookie-consent-btn cookie-consent-btn--solid" onClick={() => choose("accepted")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
