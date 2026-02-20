"use client";
import React, { useState, useRef, useEffect } from "react";
import { projectsData } from "@/data/projects.data";
import ScrollAnimator from "@/utils/ScrollAnimator";
import { Project } from "@/interfaces/project.interface";
import Image from "next/image";
import { useAppTranslations } from "@/hooks/translations/useAppTranslations";
import { useLanguage } from "@/provider/language.provider";
import { FaChevronLeft, FaChevronRight, FaGithub } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const allProjects = projectsData;

  const { t_projects } = useAppTranslations();
  const { "0": language } = useLanguage();

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
      <div className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
        {/* TITLE AND DESCRIPTION */}
        <ScrollAnimator direction="up">
          <div>
            <h2 className="text-4xl font-bold ">
              {language === "es" ? (
                <>
                  {" "}
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
              )}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-lg">
              {t_projects("PROJECTS_DESCRIPTION")}
            </p>
          </div>
        </ScrollAnimator>

        {/* CAROUSEL */}
        <div className="relative space-y-6">
          {projectsData.length > 0 ? (
            <>
              <ScrollAnimator
                direction="up"
                delay={0.2}
              >
                <div
                  ref={carouselRef}
                  className="flex overflow-hidden snap-x snap-mandatory scroll-smooth no-scrollbar py-8 -mx-4 px-4"
                >
                  {allProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`
                            shrink-0 w-full md:w-1/2 lg:w-1/3
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
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </ScrollAnimator>

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
                      <FaChevronLeft className="h-5 w-5" />
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
                      <FaChevronRight className="h-5 w-5" />
                    </button>
                  </ScrollAnimator>
                </div>
              )}
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
      {/* IMAGE */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4">
          {project.liveUrl ||
            (project.repoUrl && (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="p-4 rounded-full bg-white/10 hover:bg-blue-500 transition"
                  >
                    <FaExternalLinkAlt className="text-white w-5 h-5" />
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    className="p-4 rounded-full bg-white/10 hover:bg-blue-500 transition"
                  >
                    <FaGithub className="text-white w-5 h-5" />
                  </a>
                )}
              </>
            ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold">{project.title}</h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default ProjectsSection;
