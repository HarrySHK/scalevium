export type ContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  timeline: string;
  message: string;
};

export const CONTACT_FORM_INITIAL: ContactFormData = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  interest: "",
  budget: "",
  timeline: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getContactFieldError(
  field: keyof ContactFormData,
  form: ContactFormData
): string | undefined {
  switch (field) {
    case "firstName":
      return form.firstName.trim() ? undefined : "First name is required.";
    case "lastName":
      return form.lastName.trim() ? undefined : "Last name is required.";
    case "company":
      return form.company.trim() ? undefined : "Company is required.";
    case "email":
      if (!form.email.trim()) return "Email is required.";
      if (!EMAIL_RE.test(form.email.trim())) return "Enter a valid email address.";
      return undefined;
    case "interest":
      return form.interest ? undefined : "Please select an option.";
    case "message":
      return form.message.trim() ? undefined : "Please tell us a bit about your needs.";
    case "phone":
    case "budget":
    case "timeline":
      return undefined;
    default:
      return undefined;
  }
}

export function validateContactForm(form: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {};
  (Object.keys(form) as (keyof ContactFormData)[]).forEach((field) => {
    const message = getContactFieldError(field, form);
    if (message) errors[field] = message;
  });
  return errors;
}

export function contactFormToPayload(form: ContactFormData) {
  return {
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
    company: form.company.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim() || null,
    interest: form.interest,
    budget: form.budget || null,
    timeline: form.timeline || null,
    message: form.message.trim(),
  };
}
