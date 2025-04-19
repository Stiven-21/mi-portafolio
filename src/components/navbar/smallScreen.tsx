"use client";
import { Icons } from "../icons";
import { Section } from "@/data/navbar.interface";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Translations } from "@/common/Translations/translations";

interface SmallScreenProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleNavigation: (href: string) => void;
  sections: Section[];
}

const SmallScreen = ({
  sidebarOpen,
  setSidebarOpen,
  handleNavigation,
  sections,
}: SmallScreenProps) => {
  const { t_common, t_navbar } = Translations();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("overflow-hidden");
    };
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    const sectionElements = sections
      .filter((s) => s.href.startsWith("#"))
      .map((s) => ({
        id: s.href,
        element: document.querySelector(s.href),
      }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -80% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      sectionElements.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [sections]);

  return (
    <>
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 z-40 h-screen w-full
          bg-black/50 dark:bg-black/60 
          transition-opacity duration-300 ease-in-out
          ${
            sidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        aria-hidden="true"
      />

      <aside
        className={`
          bg-slate-100 dark:bg-slate-900 text-gray-900 dark:text-white 
          block md:hidden shadow-lg fixed top-0 right-0 h-screen 
          w-full max-w-xs sm:max-w-sm z-50 p-6
          transition-transform duration-300 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative flex flex-col h-full">
          <header className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold italic">
              {t_common("my_portfolio")}
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Cerrar menú"
              className="p-1 text-gray-600 outline-none cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <Icons.x className="w-6 h-6" />
            </button>
          </header>

          <nav className="flex-grow overflow-y-auto">
            <ul className="flex flex-col space-y-2">
              {sections.map((section) => {
                const isActive =
                  (pathname === section.href && section.href !== "#") ||
                  (section.href.startsWith("#") &&
                    activeSection === section.href);

                return (
                  <li key={section.href}>
                    <div
                      className={`
                        block cursor-pointer rounded-md px-4 py-3 text-base font-medium
                        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
                        ${
                          isActive
                            ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      `}
                      onClick={() => handleNavigation(section.href)}
                    >
                      {t_navbar(section.label)}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <footer className="mt-auto pt-4 border-t border-slate-300 dark:border-neutral-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} {t_common("my_portfolio")}
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default SmallScreen;
