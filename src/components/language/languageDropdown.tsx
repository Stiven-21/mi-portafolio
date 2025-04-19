"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { getLanguageLocal, setLanguageLocal } from "@/services/language";
import { defaultLanguage, Language } from "@/i18n/config";
import ClickOutSide from "@/common/ClickOutSide/ClickOutSide";
import { Icons } from "@/components/icons";
import { useLocale } from "next-intl";
import { languageOptions } from "@/interfaces/languages.interface";
import { Translations } from "@/common/Translations/translations";

const LanguageDropdown = () => {
  const [isPending, startTransition] = useTransition();
  const [showDropdown, setShowDropdown] = useState(false);
  const [language, setLanguage] = useState<string | Language>(useLocale());
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { t_language } = Translations();

  useEffect(() => {
    const fetchLanguage = async () => {
      const storedLanguage = await getLanguageLocal();
      setLanguage(storedLanguage || defaultLanguage);
    };

    fetchLanguage();
  }, []);

  useEffect(() => {
    if (showDropdown) {
      const dropdown = dropdownRef.current;
      if (dropdown) {
        const rect = dropdown.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropUp(spaceBelow < 150);
      }
    }
  }, [showDropdown]);

  const buttonClass = "cursor-pointer rounded-lg px-4 py-2 w-full text-center";

  const handleChangeLanguage = (language: Language) => {
    if (isPending) return;
    startTransition(() => {
      setLanguageLocal(language);
      setLanguage(language);
    });
    setShowDropdown(false);
  };

  return (
    <ClickOutSide
      onclick={() => setShowDropdown(false)}
      className="relative"
    >
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${buttonClass} gap-x-2 flex items-center justify-between bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-950 dark:text-slate-50`}
      >
        <span className="flex items-center">
          <Icons.languages className="w-5 h-5" />
        </span>
      </button>

      <ul
        ref={dropdownRef}
        className={`w-30  left-0 right-auto md:left-auto md:right-0 duration-300 ease-linear shadow-md absolute z-10 bg-slate-50 dark:bg-gray-800 mt-2 overflow-hidden rounded-sm
          ${
            showDropdown
              ? "max-h-60 border border-gray-300 dark:border-gray-700"
              : "max-h-0 border-0 border-gray-300/0 dark:border-gray-700/0"
          }
          ${dropUp ? "bottom-full mb-2" : "top-full mt-2"}
        `}
      >
        {languageOptions.map((option, index) => (
          <li key={index}>
            <button
              className={`w-full cursor-pointer text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700
              ${
                option.value === language
                  ? "text-sky-500"
                  : "text-slate-950 dark:text-slate-50"
              }`}
              onClick={() => handleChangeLanguage(option.value)}
            >
              <Icons.languages className="w-5 h-5" />
              {t_language(option["text-dropdown"])}
            </button>
          </li>
        ))}
      </ul>
    </ClickOutSide>
  );
};

export default LanguageDropdown;
