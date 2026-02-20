import { useTranslations } from "next-intl";

export const useAppTranslations = () => {
  const t_index = useTranslations("index");
  const t_navbar = useTranslations("navbar");
  const t_language = useTranslations("language");
  const t_theme = useTranslations("theme");
  const t_professional = useTranslations("professional");
  const t_projects = useTranslations("projects");
  const t_service = useTranslations("service");
  const t_contact = useTranslations("contact");
  const t_cookie = useTranslations("cookie");
  const t_footer = useTranslations("footer");
  const t_common = useTranslations("common");

  return {
    t_index,
    t_navbar,
    t_language,
    t_theme,
    t_professional,
    t_projects,
    t_service,
    t_contact,
    t_cookie,
    t_footer,
    t_common,
  };
};
