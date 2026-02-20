"use client";

import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { IoCloud } from "react-icons/io5";
import { FaCode, FaServer } from "react-icons/fa6";
import { useLanguage } from "@/provider/language.provider";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { skills } from "@/data/skills.data";
import { Skill } from "@/interfaces/skill.interface";

export default function ProfessionalSection() {
  const { t_professional } = useAppTranslations();
  const [language] = useLanguage();

  const title = useMemo(() => {
    const isES = language === "es";

    return (
      <>
        {isES ? (
          t_professional("PROFESSIONAL_CAREER")
        ) : (
          <span className="text-blue-700 dark:text-blue-600">
            {t_professional("PROFESSIONAL_PROFESSIONAL")}
          </span>
        )}{" "}
        {isES ? (
          <span className="text-blue-700 dark:text-blue-600">
            {t_professional("PROFESSIONAL_PROFESSIONAL")}
          </span>
        ) : (
          t_professional("PROFESSIONAL_CAREER")
        )}
      </>
    );
  }, [language, t_professional]);

  return (
    <section className="relative w-full min-h-36 py-24 px-6 lg:px-12 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* LEFT SIDE */}
        <ScrollAnimator
          direction="up"
          delay={0.2}
        >
          <h2 className="text-4xl font-bold mb-6">{title}</h2>

          <p className="text-slate-600 dark:text-slate-400 max-w-md mb-12 leading-relaxed">
            {t_professional("PROFESSIONAL_EXPERIENCE")}
          </p>

          <TimelineItem />
        </ScrollAnimator>

        {/* RIGHT SIDE */}
        <ScrollAnimator
          direction="up"
          delay={0.2}
        >
          <TechGrid />

          <div>
            <h3 className="text-2xl font-bold mb-8">
              {t_professional("PROFESSIONAL_TECHNICAL_SKILLS")}
            </h3>

            <div className="space-y-8">
              {skills.map((skill: Skill) => (
                <AnimatedSkillBar
                  key={skill.code}
                  skill={skill}
                  t={t_professional}
                />
              ))}
            </div>
          </div>
        </ScrollAnimator>
      </div>
    </section>
  );
}

/* ========================= */
/* Animated Skill Bar */
/* ========================= */

function AnimatedSkillBar({
  skill,
  t,
}: {
  skill: Skill;
  t: (key: string) => string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-semibold">{t(skill.code) || skill.name}</span>
        <span className="text-blue-500 font-semibold">{skill.value}%</span>
      </div>

      <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-700 dark:bg-blue-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: visible ? `${skill.value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

/* ========================= */
/* Tech Grid */
/* ========================= */

const TechGridComponent = () => {
  return (
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
  );
};

const TechGrid = memo(TechGridComponent);

/* ========================= */
/* Tech Card */
/* ========================= */

type TechCardProps = {
  icon: React.ReactNode;
  title: string;
};

const TechCardComponent = ({ icon, title }: TechCardProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-700/40 hover:border-blue-500/40">
      <div className="text-blue-700 dark:text-blue-600 mb-4">{icon}</div>
      <p className="font-semibold">{title}</p>
    </div>
  );
};

const TechCard = memo(TechCardComponent);

/* ========================= */
/* Timeline */
/* ========================= */

const TimelineItemComponent = () => (
  <div className="relative border-l border-slate-300 dark:border-slate-700 pl-8 ml-4 space-y-10">
    <div className="relative">
      <span className="absolute -left-9.5 z-10 top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
      <span className="absolute -left-9.5 z-0 animate-ping top-1 w-3 h-3 bg-blue-500 rounded-full"></span>
      <p className="text-blue-700 dark:text-blue-600 text-sm font-semibold">
        2026 - ACTUALIDAD
      </p>
      <h3 className="font-semibold text-lg">Backend Developer (Personal)</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        nestjs-auth-backend - GitHub
      </p>
    </div>
  </div>
);

const TimelineItem = memo(TimelineItemComponent);
