"use server";

import { Language, saveLanguage } from "@/lib/server/language";

export async function setLanguageAction(language: Language) {
  await saveLanguage(language);
}
