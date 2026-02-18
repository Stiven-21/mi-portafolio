"use client";

import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useLanguage } from "@/provider/language.provider";
import ScrollAnimator from "@/utils/ScrollAnimator";
import Image from "next/image";
import React from "react";

export default function HeroSection() {
  const { t_index } = useAppTranslations();
  const { "0": language } = useLanguage();
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-transparent">
      <ScrollAnimator
        direction="up"
        delay={0.2}
      >
        {/* Contenedor principal */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <div className="space-y-8 pt-2">
            <div className=" bg-blue-500/10 border border-blue-400/40 dark:border-blue-400/30 relative py-1 px-4 rounded-full inline-flex items-center text-xs">
              <span className="w-2 h-2 bg-blue-500 absolute rounded-full mr-2 z-0 animate-ping shadow shadow-blue-500 " />
              <span className="w-2 h-2 bg-blue-500 absolute rounded-full mr-2 z-10 shadow shadow-blue-500 "></span>
              <span className="ml-4 text-blue-700 dark:text-blue-400 font-bold tracking-wider">
                {t_index("HERO_AVAILABLE")}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight">
              {language === "es" ? (
                <>
                  {t_index("HERO_DEVELOPER")} <br />
                  <span className="text-blue-500 dark:text-blue-400">
                    {t_index("FULL_STACK")}
                  </span>{" "}
                </>
              ) : (
                <>
                  <span className="text-blue-500 dark:text-blue-400">
                    {t_index("FULL_STACK")}
                  </span>{" "}
                  {t_index("HERO_DEVELOPER")}
                </>
              )}
              <br />
              {t_index("HERO_CREATING")} <br />
              {language === "es" ? (
                <>
                  {t_index("HERO_EXPERIENCE")} <br />
                  {t_index("HERO_DIGITAL")}
                </>
              ) : (
                <>
                  {t_index("HERO_DIGITAL")} <br />
                  {t_index("HERO_EXPERIENCE")}
                </>
              )}
            </h1>

            <p className="max-w-xl text-lg sm:text-xl text-slate-400 dark:text-slate-600 leading-relaxed">
              {t_index("HERO_DESCRIPTION")}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center">
            {/* Marco decorativo */}
            <div className="absolute -top-12 right-1 w-40 h-40 border-t border-r hidden md:block border-blue-500/30 rounded-tr-3xl pointer-events-none" />

            {/* Caja principal */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-linear-to-br from-slate-200/60 dark:from-slate-900/60 to-slate-100/40 dark:to-slate-900/40 backdrop-blur-xl border border-white/10 dark:border-slate-900/30 shadow-2xl flex items-center justify-center">
              <Image
                src="/images/perfil.jpg"
                alt="Personal Image"
                width={300}
                height={300}
                className="rounded-3xl w-full h-full object-cover select-none shadow-md opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
            </div>

            {/* Línea decorativa inferior */}
            <div className="absolute -bottom-12 left-1 w-40 h-40 border-l border-b hidden md:block border-blue-500/30 rounded-bl-3xl pointer-events-none" />
          </div>
        </div>
      </ScrollAnimator>
    </section>
  );
}
