'use client';

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import RevealHeading from "@/components/RevealHeading";
import FormField from "@/components/FormField";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";
import Toast, { type ToastState } from "@/components/Toast";
import {
  CONTACT_FORM_INITIAL,
  getContactFieldError,
  validateContactForm,
  type ContactFormData,
} from "@/lib/contactForm";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/site";
import { formatNorthAmericanPhone } from "@/lib/phoneFormat";

const INTERESTS = ["Staff Augmentation (hire an engineer)", "Managed Engineering Pod", "AI Development", "Full-Stack Development", "Not sure yet"];

const INTEREST_QUERY_VALUES: Record<string, string> = {
  "ai-development": "AI Development",
  "AI Development": "AI Development",
};
const BUDGETS = ["Under $25k", "$25k – $75k", "$75k – $150k", "$150k+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "6+ months", "Just exploring"];

type FormFieldKey = keyof ContactFormData;

export default function ContactClient() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<ContactFormData>(CONTACT_FORM_INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Partial<Record<FormFieldKey, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [toast, setToast] = useState<ToastState>(null);
  const [copied, setCopied] = useState(false);

  const dismissToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const interestParam = searchParams.get("interest");
    if (!interestParam) return;

    const decoded = decodeURIComponent(interestParam);
    const mapped = INTEREST_QUERY_VALUES[decoded] ?? (INTERESTS.includes(decoded) ? decoded : undefined);
    if (!mapped) return;

    setForm((f) => (f.interest === mapped ? f : { ...f, interest: mapped }));
  }, [searchParams]);

  const setFieldError = (field: FormFieldKey, nextForm: ContactFormData) => {
    const message = getContactFieldError(field, nextForm);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const handleBlur = (field: FormFieldKey) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setFieldError(field, form);
  };

  const update =
    (field: FormFieldKey) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const value = field === "phone" ? formatNorthAmericanPhone(raw) : raw;
      setForm((f) => {
        const nextForm = { ...f, [field]: value };
        if (touched[field]) {
          setFieldError(field, nextForm);
        }
        return nextForm;
      });
    };

  const fieldClass = (field: FormFieldKey) =>
    touched[field] && errors[field] ? "field-invalid" : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateContactForm(form);
    setErrors(errs);
    setTouched({
      firstName: true,
      lastName: true,
      company: true,
      email: true,
      interest: true,
      message: true,
    });

    if (Object.keys(errs).length > 0) {
      setToast({
        variant: "error",
        message: "Please fix the highlighted fields before submitting.",
      });
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };

      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setToast({
          variant: "error",
          message: data.error || `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
        });
        return;
      }

      setForm(CONTACT_FORM_INITIAL);
      setErrors({});
      setTouched({});
      setToast({
        variant: "success",
        message:
          "Thank you — we received your inquiry and saved it securely. Our team will respond within one business day.",
      });
    } catch {
      setToast({
        variant: "error",
        message: `Network error. Please check your connection or email ${CONTACT_EMAIL}.`,
      });
    } finally {
      setStatus("idle");
    }
  };

  const copyEmail = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard?.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ position: "relative", zIndex: 3 }}>
      <Toast toast={toast} onDismiss={dismissToast} />

      <section className="section-pad-hero">
        <div className="container">
          <h1 className="sr-only">Start A Conversation: Let's Build Something That Matters.</h1>
          <span className="eyebrow-minimal" aria-hidden="true">START A CONVERSATION</span>
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", marginBottom: 0 }} text="Let's Build Something" />
          <RevealHeading tag="span" aria-hidden="true" className="hero-title" style={{ maxWidth: "60rem", fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "var(--accent-light)" }} delay={0.22} text="That Matters." />
          <p className="section-sub-editorial" style={{ marginTop: "1.5rem", maxWidth: "38.75rem" }}>
            Share details about your team goals, architectural needs, or product timeline. We respond within one business day.
          </p>
        </div>
      </section>

      <section className="section-pad-standard" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row" style={{ marginBottom: "2rem" }}>
                  <FormField label="First Name *" id="firstName" error={touched.firstName ? errors.firstName : undefined}>
                    <Input
                      id="firstName"
                      name="firstName"
                      className={fieldClass("firstName")}
                      value={form.firstName}
                      onChange={update("firstName")}
                      onBlur={handleBlur("firstName")}
                      placeholder="Jordan"
                      aria-required="true"
                      aria-invalid={!!errors.firstName && !!touched.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    />
                  </FormField>
                  <FormField label="Last Name *" id="lastName" error={touched.lastName ? errors.lastName : undefined}>
                    <Input
                      id="lastName"
                      name="lastName"
                      className={fieldClass("lastName")}
                      value={form.lastName}
                      onChange={update("lastName")}
                      onBlur={handleBlur("lastName")}
                      placeholder="Reyes"
                      aria-required="true"
                      aria-invalid={!!errors.lastName && !!touched.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    />
                  </FormField>
                </div>

                <div className="form-row" style={{ marginBottom: "2rem" }}>
                  <FormField label="Company *" id="company" error={touched.company ? errors.company : undefined}>
                    <Input
                      id="company"
                      name="company"
                      className={fieldClass("company")}
                      value={form.company}
                      onChange={update("company")}
                      onBlur={handleBlur("company")}
                      placeholder="Enterprise Inc."
                      aria-required="true"
                      aria-invalid={!!errors.company && !!touched.company}
                      aria-describedby={errors.company ? "company-error" : undefined}
                    />
                  </FormField>
                  <FormField label="Email *" id="email" error={touched.email ? errors.email : undefined}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className={fieldClass("email")}
                      value={form.email}
                      onChange={update("email")}
                      onBlur={handleBlur("email")}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email && !!touched.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                  </FormField>
                </div>

                <div className="form-row" style={{ marginBottom: "2rem" }}>
                  <FormField label="Phone" id="phone">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      onBlur={handleBlur("phone")}
                      placeholder="+1 (555) 555-1234"
                    />
                  </FormField>
                  <FormField label="Primary Need *" id="interest" error={touched.interest ? errors.interest : undefined}>
                    <Select
                      id="interest"
                      name="interest"
                      className={fieldClass("interest")}
                      options={INTERESTS}
                      placeholder="Select primary need"
                      value={form.interest}
                      onChange={update("interest")}
                      onBlur={handleBlur("interest")}
                      aria-required="true"
                      aria-invalid={!!errors.interest && !!touched.interest}
                      aria-describedby={errors.interest ? "interest-error" : undefined}
                    />
                  </FormField>
                </div>

                <div className="form-row" style={{ marginBottom: "2rem" }}>
                  <FormField label="Target Budget" id="budget">
                    <Select
                      id="budget"
                      name="budget"
                      options={BUDGETS}
                      placeholder="Select budget"
                      value={form.budget}
                      onChange={update("budget")}
                      onBlur={handleBlur("budget")}
                    />
                  </FormField>
                  <FormField label="Delivery Timeline" id="timeline">
                    <Select
                      id="timeline"
                      name="timeline"
                      options={TIMELINES}
                      placeholder="Select timeline"
                      value={form.timeline}
                      onChange={update("timeline")}
                      onBlur={handleBlur("timeline")}
                    />
                  </FormField>
                </div>

                <div style={{ marginBottom: "3rem" }}>
                  <FormField label="Project / Requirement Details *" id="message" error={touched.message ? errors.message : undefined}>
                    <Textarea
                      id="message"
                      name="message"
                      className={fieldClass("message")}
                      value={form.message}
                      onChange={update("message")}
                      onBlur={handleBlur("message")}
                      placeholder="Outline your technical goals, stack, or team requirements..."
                      aria-required="true"
                      aria-invalid={!!errors.message && !!touched.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                  </FormField>
                </div>

                <Button type="submit" className="submit-btn" aria-label={status === "submitting" ? "Sending inquiry..." : "Submit Inquiry"}>
                  {status === "submitting" ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem" }}>
                  <span className="eyebrow-minimal">DIRECT EMAIL</span>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>For confidential inquiries or direct RFPs:</p>
                  <a
                    href={CONTACT_MAILTO}
                    className="link-editorial"
                    style={{ fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
                  >
                    <Mail size={16} aria-hidden="true" /> {CONTACT_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="link-editorial"
                    style={{ fontSize: "0.8125rem", marginTop: "0.75rem", display: "block", background: "none", border: "none", padding: 0, cursor: "pointer" }}
                    aria-label={copied ? "Email copied to clipboard" : `Copy ${CONTACT_EMAIL}`}
                  >
                    {copied ? "Copied!" : "Copy email address"}
                  </button>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "2rem" }}>
                  <span className="eyebrow-minimal">RESPONSE PROTOCOL</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" }}>
                    {[
                      { num: "01", text: "Technical review within 24 hours." },
                      { num: "02", text: "Discovery session with lead engineer." },
                      { num: "03", text: "Squad selection and proposal." },
                    ].map((step) => (
                      <div key={step.num} style={{ display: "flex", gap: "1rem" }}>
                        <span style={{ color: "var(--text-subtle)", fontSize: "0.875rem", fontWeight: 500 }}>{step.num}</span>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <style>{`
        .submit-btn { width: 100%; justify-content: center; }
      `}</style>
    </div>
  );
}
