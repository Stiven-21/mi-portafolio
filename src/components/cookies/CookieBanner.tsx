"use client";

import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useEffect, useState, useCallback, useRef } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const hasLoadedGA = useRef(false);
  const { t_cookie } = useAppTranslations();

  const loadGoogleAnalytics = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!GA_ID) return;
    if (hasLoadedGA.current) return;

    hasLoadedGA.current = true;

    if (document.querySelector(`script[src*="${GA_ID}"]`)) return;

    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', {
        anonymize_ip: true
      });
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setVisible(true);
      return;
    }

    if (consent === "accepted") {
      loadGoogleAnalytics();
    }
  }, [loadGoogleAnalytics]);

  /**
   * Handlers memorizados
   */
  const acceptCookies = useCallback(() => {
    localStorage.setItem("cookie-consent", "accepted");
    loadGoogleAnalytics();
    setVisible(false);
  }, [loadGoogleAnalytics]);

  const rejectCookies = useCallback(() => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl z-50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm">{t_cookie("COOKIE_BANNER_DESCRIPTION")} </p>

        <div className="flex gap-4">
          <button
            onClick={rejectCookies}
            className="px-4 py-2 text-sm rounded-lg border bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            {t_cookie("COOKIE_BANNER_DECLINE")}
          </button>

          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition cursor-pointer"
          >
            {t_cookie("COOKIE_BANNER_ACCEPT")}
          </button>
        </div>
      </div>
    </div>
  );
}
