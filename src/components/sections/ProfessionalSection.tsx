"use client";

import React from "react";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { IoCloud } from "react-icons/io5";
import { FaCode, FaServer } from "react-icons/fa6";
import { useLanguage } from "@/provider/language.provider";
import ScrollAnimator from "@/utils/ScrollAnimator";

const skills = [
  {
    name: "Frontend Architecture",
    value: 75,
    code: "PROFESSIONAL_FRONTEND_ARCHITECTURE",
  },
  {
    name: "Backend & API Design",
    value: 85,
    code: "PROFESSIONAL_BACKEND_API_DESIGN",
  },
  { name: "DevOps & Cloud", value: 65, code: "PROFESSIONAL_DEVOPS_CLOUD" },
];

export default function ProfessionalSection() {
  const { t_professional } = useAppTranslations();
  const { "0": language } = useLanguage();
  return (
    <section className="relative w-full min-h-36 py-24 px-6 lg:px-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* LEFT SIDE - Timeline */}
        <ScrollAnimator
          direction="up"
          delay={0.2}
        >
          <h2 className="text-4xl font-bold  mb-6">
            {language === "es" ? (
              t_professional("PROFESSIONAL_CAREER")
            ) : (
              <span className="text-blue-700 dark:text-blue-600">
                {t_professional("PROFESSIONAL_PROFESSIONAL")}
              </span>
            )}{" "}
            {language === "es" ? (
              <span className="text-blue-700 dark:text-blue-600">
                {t_professional("PROFESSIONAL_PROFESSIONAL")}
              </span>
            ) : (
              t_professional("PROFESSIONAL_CAREER")
            )}
          </h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-md mb-12 leading-relaxed">
            {t_professional("PROFESSIONAL_EXPERIENCE")}
          </p>

          <div className="relative border-l border-slate-300 dark:border-slate-700 pl-8 ml-4 space-y-10">
            {/* ITEM 1 */}
            <div className="relative">
              <span className="absolute -left-9.5 z-10 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="absolute -left-9.5 z-0 animate-ping top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
              <p className="text-blue-700 dark:text-blue-600 text-sm font-semibold">
                2026 - ACTUALIDAD
              </p>
              <h3 className="font-semibold text-lg">
                Backend Developer (Personal)
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                nestjs-auth-backend - GitHub
              </p>
            </div>
          </div>
        </ScrollAnimator>

        {/* RIGHT SIDE */}
        <ScrollAnimator
          direction="up"
          delay={0.2}
        >
          {/* Tech Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 mt-4 px-2">
            <TechCard
              icon={<FaCode className="w-7 h-7" />}
              title="React"
            />
            <TechCard
              icon={<FaServer className="w-7 h-7" />}
              title="Node.js"
            />
            <TechCard
              icon={<BsDatabaseFillCheck className="w-7 h-7" />}
              title="PostgreSQL"
            />
            <TechCard
              icon={<IoCloud className="w-7 h-7" />}
              title="AWS"
            />
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8">
              {t_professional("PROFESSIONAL_TECHNICAL_SKILLS")}
            </h3>

            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.code}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">
                      {t_professional(skill.code) || skill.name}
                    </span>
                    <span className="text-blue-500 font-semibold">
                      {skill.value}%
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 dark:bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}

type TechCardProps = {
  icon: React.ReactNode;
  title: string;
};

function TechCard({ icon, title }: TechCardProps) {
  return (
    <div className="group p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 backdrop-blur-md hover:shadow-blue-700/50 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="text-blue-700 dark:text-blue-600 mb-4">{icon}</div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
