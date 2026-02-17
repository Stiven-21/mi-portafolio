"use client";

import { useEffect, useState, useTransition } from "react";
import { Language } from "@/lib/server/language";
import { setLanguageAction } from "@/action/language/language";
import { languages } from "@/lib/server/language";

export default function useLanguageMode(initialLanguage: Language) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const updateLanguage = (newLanguage: Language) => {
    if (isPending || newLanguage === language) return;

    if (!languages.includes(newLanguage)) return;

    setLanguage(newLanguage);

    startTransition(() => {
      setLanguageAction(newLanguage);
    });
  };

  return [language, updateLanguage, isPending] as const;
}
