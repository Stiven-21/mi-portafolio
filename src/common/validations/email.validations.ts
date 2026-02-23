import { TEMP_EMAIL_DOMAINS } from "@/common/constants/email.constants";

export const validateEmail = (value: string): string | true => {
  const atCount = (value.match(/@/g) || []).length;
  if (atCount !== 1) return "CONTACT_FORM_EMAIL_REQUIRED";

  const emailRegex =
    /^(?!\.)[A-Za-z0-9._%+-]+(?<!\.)@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(value)) return "CONTACT_FORM_EMAIL_NOT_TEMPORARY";

  const domain = value.split("@")[1].toLowerCase();

  if (TEMP_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith("." + d)))
    return "CONTACT_FORM_EMAIL_NOT_TEMPORARY";

  return true;
};
