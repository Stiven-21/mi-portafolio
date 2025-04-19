import { Translations } from "@/common/Translations/translations";

export const Footer = () => {
  const { t_footer } = Translations();

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 border-t border-t-slate-700 dark:border-t-slate-800 py-4">
      <div className="mx-auto text-center text-sm text-slate-500/60 dark:text-slate-500/70">
        {t_footer("copyright", { year: new Date().getFullYear() })}
      </div>
    </footer>
  );
};
