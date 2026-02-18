"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import SelectTheme from "../theme/selectTheme";
import SmallScreen from "./smallScreen";
import { sections } from "@/data/navbar.interface";
import SelectLanguage from "../language/selectLanguage";
import { HiMiniCommandLine } from "react-icons/hi2";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { t_navbar, t_common } = useAppTranslations();

  // Detectar sección visible en pantalla
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
      },
    );

    sectionElements.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      sectionElements.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavigation = (href: string) => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }

    if (href.startsWith("#")) {
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <nav className="sticky bg-transparent top-0 z-40 py-4 px-10">
        <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between rounded-xl bg-slate-200/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-900">
          <Link
            href="/"
            className="text-xl font-bold italic text-gray-900 dark:text-white items-center flex gap-x-2 hover:text-sky-400"
          >
            <span className="p-2 bg-blue-600 rounded-xl text-white">
              <HiMiniCommandLine className="h-5 w-5" />
            </span>
            {t_common("my_portfolio")}
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Botones del navbar en pantallas grandes */}
            <div className="hidden lg:flex space-x-2">
              {sections.map((section) => {
                const isActive =
                  (pathname === section.href && section.href !== "#") ||
                  (section.href.startsWith("#") &&
                    activeSection === section.href);

                return (
                  <Button
                    key={section.href}
                    asChild
                    variant="none"
                    className={`
                      px-5 py-2.5
                      rounded-2xl
                      transition duration-150
                      text-sm font-medium
                      bg-slate-200/20 dark:bg-slate-900/20
                      ${
                        isActive
                          ? `
                          select-all
                          text-sky-400
                          [text-shadow:0_0_8px_rgba(0,90,255,0.2)]
                          dark:[text-shadow:0_0_8px_rgba(0,90,255,1)]
                          -translate-y-0.5
                          z-10
                          shadow-[0_6px_14px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.1)]
                          dark:shadow-[0_6px_14px_rgba(0,0,0,0.6),0_1px_3px_rgba(0,0,0,0.1)]
                        `
                          : `
                          select-none
                          hover:text-sky-400
                          text-slate-500/70 dark:text-slate-400/70
                          shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,1)]
                          dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.04)]
                        `
                      }
                    `}
                    onClick={() => handleNavigation(section.href)}
                  >
                    <Link href={section.href}>{t_navbar(section.label)}</Link>
                  </Button>
                );
              })}
            </div>

            {/* Settings */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <SelectLanguage />
              <SelectTheme />
              <Button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-950 dark:text-slate-50"
                variant="none"
                aria-label="Abrir menú"
              >
                <Icons.menu className="h-6 w-6 text-gray-900 dark:text-white" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú lateral para pantallas pequeñas */}
      <SmallScreen
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigation={handleNavigation}
        sections={sections}
      />
    </>
  );
};
