"use server";

import { cookies } from "next/headers";
import { Language, defaultLanguage, languages } from "@/i18n/config";

const COOKIE_LENGUAGE = "NEXT_LENGUAGE";

export async function getLanguageLocal(): Promise<Language> {
  const cookieStore = await cookies();
  const storeLanguage = cookieStore.get(COOKIE_LENGUAGE)?.value as Language;
  // return (await cookies()).get(COOKIE_LENGUAGE)?.value || defaultLanguage;
  return !storeLanguage || !languages.includes(storeLanguage)
    ? defaultLanguage
    : storeLanguage;
}

export async function setLanguageLocal(language: Language): Promise<void> {
  if (!languages.includes(language)) {
    throw new Error("Language not found");
  }

  (await cookies()).set(COOKIE_LENGUAGE, language);
}
