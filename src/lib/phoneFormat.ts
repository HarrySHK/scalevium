/** Formats digits as +1 (555) 555-1234 while typing (US/Canada). */
export function formatNorthAmericanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) {
    return raw.includes("+") ? "+" : "";
  }

  let national: string;
  if (digits.startsWith("1")) {
    national = digits.slice(1, 11);
    if (digits.length === 1) {
      return "+1";
    }
  } else {
    national = digits.slice(0, 10);
  }

  let result = "+1";
  if (national.length === 0) {
    return result;
  }

  result += " (" + national.slice(0, 3);
  if (national.length < 3) {
    return result;
  }

  result += ")";
  if (national.length <= 3) {
    return result;
  }

  result += " " + national.slice(3, 6);
  if (national.length <= 6) {
    return result;
  }

  result += "-" + national.slice(6, 10);
  return result;
}
