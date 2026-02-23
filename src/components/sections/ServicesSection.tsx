"use client";

import React, { useMemo } from "react";
import { useLanguage } from "@/provider/language.provider";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { services } from "@/data/service.data";
import ScrollAnimator from "@/utils/ScrollAnimator";
import ServiceCard from "@/components/cards/Service-card";

export default function ServicesSection() {
  const { t_service } = useAppTranslations();
  const [language] = useLanguage();

  const title = useMemo(() => {
    const isES = language === "es";

    return isES ? (
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
    );
  }, [language, t_service]);

  const renderedServices = useMemo(
    () =>
      services.map((service) => (
        <ServiceCard
          key={service.titleCode}
          service={service}
          t={t_service}
        />
      )),
    [t_service],
  );

  return (
    <section className="w-full py-20 px-6 lg:px-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        {/* HEADER */}
        <div className="space-y-6">
          <ScrollAnimator direction="up">
            <h2 className="text-4xl font-bold">{title}</h2>
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
            {renderedServices}
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}
