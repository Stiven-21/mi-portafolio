"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { projectsData } from "@/data/projects.data";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useLanguage } from "@/provider/language.provider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ProjectCard } from "@/components/cards/Project-card";

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { t_projects } = useAppTranslations();
  const [language] = useLanguage();

  const allProjects = useMemo(() => projectsData, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;

      const newValue = width < 768 ? 1 : width < 1024 ? 2 : 3;

      setItemsPerPage((prev) => {
        if (prev !== newValue) {
          setActiveIndex(0);
          return newValue;
        }
        return prev;
      });
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = useMemo(
    () => Math.max(0, allProjects.length - itemsPerPage),
    [allProjects.length, itemsPerPage],
  );

  const canScrollLeft = useMemo(() => activeIndex > 0, [activeIndex]);

  const canScrollRight = useMemo(
    () => activeIndex < maxIndex,
    [activeIndex, maxIndex],
  );

  const scrollCarousel = useCallback(
    (direction: "left" | "right") => {
      const newIndex =
        direction === "right"
          ? Math.min(activeIndex + itemsPerPage, maxIndex)
          : Math.max(activeIndex - itemsPerPage, 0);

      setActiveIndex(newIndex);

      const container = carouselRef.current;
      if (!container) return;

      const itemWidth = container.scrollWidth / allProjects.length;

      container.scrollTo({
        left: newIndex * itemWidth,
        behavior: "smooth",
      });
    },
    [activeIndex, itemsPerPage, maxIndex, allProjects.length],
  );

  const title = useMemo(() => {
    const isES = language === "es";

    return isES ? (
      <>
        {t_projects("PROJECTS_TITLE_PROJECTS")}{" "}
        <span className="text-blue-700 dark:text-blue-600">
          {t_projects("PROJECTS_TITLE_FEATURED")}
        </span>
      </>
    ) : (
      <>
        <span className="text-blue-700 dark:text-blue-600">
          {t_projects("PROJECTS_TITLE_FEATURED")}{" "}
        </span>
        {t_projects("PROJECTS_TITLE_PROJECTS")}
      </>
    );
  }, [language, t_projects]);

  return (
    <div className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
      <ScrollAnimator direction="up">
        <div>
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-lg">
            {t_projects("PROJECTS_DESCRIPTION")}
          </p>
        </div>
      </ScrollAnimator>

      <div className="relative space-y-6">
        {allProjects.length === 0 ? (
          <ScrollAnimator
            direction="up"
            delay={0.2}
          >
            <p className="text-center text-gray-500 dark:text-gray-400">
              {t_projects("no_projects")}
            </p>
          </ScrollAnimator>
        ) : (
          <>
            <ScrollAnimator
              direction="up"
              delay={0.2}
            >
              <div
                ref={carouselRef}
                className="flex overflow-hidden scroll-smooth py-8 -mx-4 px-4"
              >
                {allProjects.map((project, index) => {
                  const isVisible =
                    index >= activeIndex && index < activeIndex + itemsPerPage;

                  return (
                    <div
                      key={project.id}
                      className={`shrink-0 w-full md:w-1/2 lg:w-1/3 px-3 transition-opacity duration-300 ${
                        isVisible ? "opacity-100" : "opacity-40"
                      }`}
                      style={{ minHeight: 400 }}
                    >
                      <ProjectCard project={project} />
                    </div>
                  );
                })}
              </div>
            </ScrollAnimator>

            {allProjects.length > itemsPerPage && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => scrollCarousel("left")}
                  disabled={!canScrollLeft}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={() => scrollCarousel("right")}
                  disabled={!canScrollRight}
                  className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsSection;
