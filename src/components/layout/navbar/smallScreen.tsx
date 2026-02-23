"use client";

import { memo, useEffect } from "react";
import { Section } from "@/data/navbar.interface";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { usePathname } from "next/navigation";
import { HiMiniCommandLine } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

interface SmallScreenProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (href: string) => void;
  sections: Section[];
  activeSection: string | null;
}

const SmallScreen = ({
  sidebarOpen,
  setSidebarOpen,
  handleNavigation,
  sections,
  activeSection,
}: SmallScreenProps) => {
  const { t_common, t_navbar } = useAppTranslations();
  const pathname = usePathname();

  useEffect(() => {
    if (!sidebarOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen, setSidebarOpen]);

  const isSectionActive = (href: string) => {
    if (href.startsWith("#")) {
      return activeSection === href;
    }
    return pathname === href;
  };

  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 z-40 h-screen w-full
          bg-black/50 dark:bg-black/60 backdrop-blur
          transition-opacity duration-300 ease-in-out
          ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white 
          block lg:hidden shadow-lg fixed top-0 right-0 h-screen 
          w-full max-w-xs sm:max-w-sm z-50 p-6
          transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold italic flex gap-x-2">
              <span className="p-2 bg-blue-600 rounded-xl text-white">
                <HiMiniCommandLine className="h-5 w-5" />
              </span>
              {t_common("my_portfolio")}
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
              className="p-1 text-slate-600 outline-none cursor-pointer dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </header>

          {/* Navigation */}
          <nav className="grow overflow-y-auto">
            <ul className="flex flex-col space-y-2">
              {sections.map((section) => {
                const isActive = isSectionActive(section.href);

                return (
                  <li key={section.href}>
                    <button
                      onClick={() => handleNavigation(section.href)}
                      className={`
                        w-full text-left rounded-md px-4 py-3 text-base font-medium
                        transition-colors cursor-pointer
                        ${
                          isActive
                            ? "bg-blue-700 text-white dark:bg-blue-600 "
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-200 hover:text-blue-700 dark:hover:text-blue-600 dark:hover:bg-slate-700"
                        }
                      `}
                    >
                      {t_navbar(section.label)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <footer className="mt-auto pt-4 border-t border-blue-700/15 dark:border-blue-800/20 text-center">
            <p className="text-lg text-slate-500 dark:text-slate-400 flex items-center justify-center gap-x-2 font-bold italic">
              <span className="p-2 bg-blue-600 rounded-xl text-white">
                <HiMiniCommandLine className="h-4 w-4" />
              </span>
              {t_common("my_portfolio") + " "}
              <span className="text-xs text-slate-400 mt-1">&copy; 2026</span>
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default memo(SmallScreen);
