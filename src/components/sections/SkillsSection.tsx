import { Translations } from "@/common/Translations/translations";
import { skillsData } from "@/data/skills.data";
import ScrollAnimator from "@/utils/ScrollAnimator";

const SkillsSection = () => {
  const { t_common } = Translations();
  return (
    <ScrollAnimator
      direction="left"
      delay={0.2}
    >
      <h2 className="text-lg font-bold mb-1">{t_common("my_skills")}</h2>
      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-1 mb-3">
        {skillsData.map((skill) => (
          <div
            key={skill.id}
            className="bg-slate-500 dark:bg-slate-700 text-white rounded-md px-3 py-1 text-sm"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </ScrollAnimator>
  );
};

export default SkillsSection;
