export type Language = (typeof languages)[number];

export const languages = ["en", "es"] as const;
export const defaultLanguage = "es";
