import { useTranslations } from "next-intl";

export const Translations = () => {
  const t_index = useTranslations("index");
  const t_navbar = useTranslations("navbar");
  const t_footer = useTranslations("footer");
  const t_language = useTranslations("language");
  const t_theme = useTranslations("theme");
  const t_common = useTranslations("common");
  const t_experience = useTranslations("experience");
  const t_education = useTranslations("education");
  const t_projects = useTranslations("projects");
  const t_contact = useTranslations("contact");

  return {
    t_index,
    t_navbar,
    t_footer,
    t_language,
    t_theme,
    t_common,
    t_experience,
    t_education,
    t_projects,
    t_contact,
  };
};
