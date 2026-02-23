import { getCookieValue, setCookieValue } from "@/lib/server/cookies";

export const languages = ["en", "es"] as const;
export type Language = (typeof languages)[number];

const COOKIE_LANGUAGE = "COOKIE_JAM_DEV_LANGUAGE";

export function getLanguage(): Promise<Language> {
  return getCookieValue<Language>({
    key: COOKIE_LANGUAGE,
    defaultValue: "en",
    allowedValues: languages,
  });
}

export function saveLanguage(language: Language): Promise<void> {
  return setCookieValue<Language>({
    key: COOKIE_LANGUAGE,
    value: language,
    allowedValues: languages,
  });
}
