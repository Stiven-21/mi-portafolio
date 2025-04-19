"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import SelectTheme from "../theme/selectTheme";
import LanguageDropdown from "../language/languageDropdown";
import SmallScreen from "./smallScreen";
import { sections } from "@/data/navbar.interface";
import { Translations } from "@/common/Translations/translations";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { t_navbar, t_common } = Translations();

  // Cambiar color de fondo al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`border-b sticky top-0 z-30 transition-colors duration-300 ease-in-out ${
        hasScrolled || sidebarOpen
          ? "bg-slate-100/95 dark:bg-slate-900/95 backdrop-blur-sm border-b-slate-300 dark:border-b-neutral-800"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold italic text-gray-900 dark:text-white"
        >
          {t_common("my_portfolio")}
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Botones del navbar en pantallas grandes */}
          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <Button
                key={section.href}
                asChild
                variant="none"
                className={`
                  ${
                    (pathname === section.href && section.href !== "#") ||
                    (section.href.startsWith("#") &&
                      activeSection === section.href)
                      ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                  px-3 py-2 text-sm font-medium
                `}
                onClick={() => handleNavigation(section.href)}
              >
                <Link href={section.href}>{t_navbar(section.label)}</Link>
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <LanguageDropdown />
            <SelectTheme />
            <Button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-950 dark:text-slate-50"
              variant="none"
              aria-label="Abrir menú"
            >
              <Icons.menu className="h-6 w-6 text-gray-900 dark:text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Menú lateral para pantallas pequeñas */}
      <SmallScreen
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigation={handleNavigation}
        sections={sections}
      />
    </nav>
  );
};
