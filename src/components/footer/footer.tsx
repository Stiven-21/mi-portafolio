import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { HiMiniCommandLine } from "react-icons/hi2";

export const Footer = () => {
  const { t_footer, t_common } = useAppTranslations();

  return (
    <footer className="bg-gray-950 border-t border-t-slate-900 py-8">
      <div className="mx-auto text-center text-sm  grid grid-cols-3">
        {/* {t_footer("copyright", { year: new Date().getFullYear() })} */}
        {/* JAM DEV */}
        <div className="text-lg font-bold italic items-center flex justify-center gap-x-2">
          <span className="p-2 bg-blue-600 rounded-xl text-white">
            <HiMiniCommandLine className="h-4 w-4" />
          </span>
          {t_common("my_portfolio") + " "}
          <span className="text-xs text-slate-400 mt-1">&copy; 2026</span>
        </div>

        {/* Links */}
        <div className="flex items-center justify-center gap-x-6 text-slate-700">
          <span>Terminos</span>
          <span>Privacidad</span>
          <span>Cookies</span>
        </div>

        {/* Redes sociales */}
        <div className="flex items-center justify-center gap-x-6 text-slate-700">
          <span>Linkedin</span>
          <span>GitHub</span>
          <span>Twitter</span>
        </div>
      </div>
    </footer>
  );
};
