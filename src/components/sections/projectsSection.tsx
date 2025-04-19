"use client";
import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
import { projectsData } from "@/data/projects.data";
import ProjectCarouselItem from "../ui/projectCarouselItem";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { Icons } from "../icons";
import { useTranslations } from "next-intl";

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const allProjects = projectsData;
  const t_projects = useTranslations("projects");

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
      setActiveIndex(0);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, allProjects.length - itemsPerPage);

  const scrollCarousel = (direction: "left" | "right") => {
    let newIndex: number;

    if (direction === "right") {
      newIndex = Math.min(activeIndex + itemsPerPage, maxIndex);
    } else {
      newIndex = Math.max(activeIndex - itemsPerPage, 0);
    }

    setActiveIndex(newIndex);
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.scrollWidth / allProjects.length;
      const scrollToPosition = newIndex * itemWidth;
      carouselRef.current.scrollTo({
        left: scrollToPosition,
        behavior: "smooth",
      });
    }
  };

  const canScrollLeft = activeIndex > 0;
  const canScrollRight = activeIndex < maxIndex;

  return (
    <>
      {" "}
      <div className="container mx-auto">
        <ScrollAnimator direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-5 text-gray-900 dark:text-white">
            {t_projects("title")}
          </h2>
        </ScrollAnimator>

        <div className="relative">
          {projectsData.length > 0 ? (
            <>
              {projectsData.length > itemsPerPage && (
                <div className="flex w-full justify-center items-center space-x-4 mb-4">
                  <ScrollAnimator
                    direction="right"
                    delay={0.2}
                    className="w-full flex justify-end"
                  >
                    <button
                      onClick={() => scrollCarousel("left")}
                      disabled={!canScrollLeft}
                      className={`p-3 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white transition disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                      aria-label="Proyecto anterior"
                    >
                      <Icons.chevronLeft />
                    </button>
                  </ScrollAnimator>
                  <ScrollAnimator
                    direction="left"
                    className="w-full flex justify-start"
                    delay={0.2}
                  >
                    <button
                      onClick={() => scrollCarousel("right")}
                      disabled={!canScrollRight}
                      className={`p-3 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white transition disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
                      aria-label="Siguiente proyecto"
                    >
                      <Icons.chevronRight />
                    </button>
                  </ScrollAnimator>
                </div>
              )}

              <ScrollAnimator
                direction="up"
                delay={0.2}
              >
                <div
                  ref={carouselRef}
                  className="flex overflow-hidden snap-x snap-mandatory scroll-smooth no-scrollbar py-6 -mx-4 px-4"
                >
                  {allProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`
                            flex-shrink-0 w-full md:w-1/2 lg:w-1/3
                            snap-start scroll-ml-4 md:scroll-ml-6 lg:scroll-ml-8 xl:scroll-ml-10 px-2 md:px-3 lg:px-4
                            transition-opacity duration-300
                            ${
                              index >= activeIndex &&
                              index < activeIndex + itemsPerPage
                                ? "opacity-100"
                                : "opacity-50"
                            }
                        `}
                      style={{ minHeight: "400px" }}
                    >
                      <ProjectCarouselItem
                        project={project}
                        isActive={
                          index >= activeIndex &&
                          index < activeIndex + itemsPerPage
                        }
                      />
                    </div>
                  ))}
                </div>
              </ScrollAnimator>
            </>
          ) : (
            <ScrollAnimator
              direction="up"
              delay={0.2}
            >
              <p className="text-center text-gray-500 dark:text-gray-400">
                {t_projects("no_projects")}
              </p>
            </ScrollAnimator>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;
