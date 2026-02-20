"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import SelectTheme from "../theme/selectTheme";
import SmallScreen from "./smallScreen";
import { sections } from "@/data/navbar.interface";
import SelectLanguage from "@/components/language/selectLanguage";
import { HiMiniCommandLine } from "react-icons/hi2";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { TiThMenu } from "react-icons/ti";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { t_navbar, t_common } = useAppTranslations();

  const hashSections = useMemo(
    () => sections.filter((s) => s.href.startsWith("#")),
    [],
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestSection: { id: string; distance: number } | null = null;

      hashSections.forEach((section) => {
        const element = document.querySelector(section.href);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);

        if (!closestSection || distance < closestSection.distance) {
          closestSection = { id: section.href, distance };
        }
      });

      if (closestSection) {
        setActiveSection((prev) =>
          prev !== closestSection!.id ? closestSection!.id : prev,
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hashSections]);

  const handleNavigation = useCallback(
    (href: string) => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }

      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        return;
      }

      router.push(href);
    },
    [router, sidebarOpen],
  );

  const isSectionActive = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        return activeSection === href;
      }

      return pathname === href;
    },
    [activeSection, pathname],
  );

  return (
    <>
      <nav className="sticky top-0 z-40 py-4 px-10 bg-transparent">
        <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between rounded-xl bg-slate-200/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-900">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-x-2 text-xl font-bold italic text-gray-950 dark:text-white hover:text-blue-700 dark:hover:text-blue-600"
          >
            <span className="p-2 bg-blue-600 rounded-xl text-white">
              <HiMiniCommandLine className="h-5 w-5" />
            </span>
            {t_common("my_portfolio")}
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-2">
              {sections.map((section) => {
                const isActive = isSectionActive(section.href);

                return (
                  <Button
                    key={section.href}
                    asChild
                    variant="none"
                    onClick={() => handleNavigation(section.href)}
                    className={`
                      px-5 py-2.5 rounded-2xl transition duration-150
                      text-sm font-medium bg-slate-200/20 dark:bg-slate-900/20
                      ${
                        isActive
                          ? `
                          select-all
                          text-blue-600 dark:text-blue-500
                          [text-shadow:0_0_8px_rgba(0,90,255,0.2)]
                          dark:[text-shadow:0_0_8px_rgba(0,90,255,1)]
                          -translate-y-0.5
                          z-10
                          shadow-[0_6px_14px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.1)]
                          dark:shadow-[0_6px_14px_rgba(0,0,0,0.6),0_1px_3px_rgba(0,0,0,0.1)]
                        `
                          : `
                          select-none
                          hover:text-blue-500 dark:hover:text-blue-400
                          text-slate-500/70 dark:text-slate-400/70
                          shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-2px_-2px_4px_rgba(255,255,255,1)]
                          dark:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.6),inset_-2px_-2px_4px_rgba(255,255,255,0.04)]
                        `
                      }
                    `}
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
                variant="none"
                aria-label="Abrir menú"
                className="lg:hidden cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-950 dark:text-slate-50 focues:outline-none"
              >
                <TiThMenu className="h-6 w-8 " />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <SmallScreen
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigation={handleNavigation}
        sections={sections}
        activeSection={activeSection}
      />
    </>
  );
};
