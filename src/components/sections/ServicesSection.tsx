"use client";

import React from "react";
import { useLanguage } from "@/provider/language.provider";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { services } from "@/data/service.data";
import { Service } from "@/interfaces/service.interface";
import ScrollAnimator from "@/utils/ScrollAnimator";

export default function ServicesSection() {
  const { t_service } = useAppTranslations();
  const { "0": language } = useLanguage();

  return (
    <section className="w-full py-20 px-6 lg:px-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        {/* HEADER */}
        <div className="space-y-6">
          <ScrollAnimator direction="up">
            <h2 className="text-4xl font-bold">
              {language === "es" ? (
                <>
                  {t_service("SERVICE_SERVICES")}{" "}
                  <span className="text-blue-700 dark:text-blue-600">
                    {t_service("SERVICE_PREMIUM")}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-blue-700 dark:text-blue-600">
                    {t_service("SERVICE_PREMIUM")}{" "}
                  </span>
                  {t_service("SERVICE_SERVICES")}
                </>
              )}
            </h2>
          </ScrollAnimator>

          <ScrollAnimator direction="up">
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t_service("SERVICE_DESCRIPTION")}
            </p>
          </ScrollAnimator>
        </div>

        {/* GRID */}
        <ScrollAnimator
          direction="up"
          className="py-16 px-10"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service: Service) => (
              <ServiceCard
                key={service.title}
                {...service}
              />
            ))}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}

function ServiceCard({
  Icon,
  title,
  description,
  titleCode,
  descriptionCode,
}: Service) {
  const { t_service } = useAppTranslations();
  return (
    <div className="group p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] text-left">
      {/* ICON */}
      <div className="w-14 h-14 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-700 dark:text-blue-600 mb-6 transition group-hover:bg-blue-600/20">
        <Icon className="w-8 h-8" />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-semibold mb-4">
        {t_service(titleCode) || title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
        {t_service(descriptionCode) || description}
      </p>
    </div>
  );
}
