import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects.data";
import { useTranslations } from "next-intl";

interface ProjectCarouselItemProps {
  project: Project;
  isActive: boolean;
}

const ProjectCarouselItem = ({
  project,
  isActive,
}: ProjectCarouselItemProps) => {
  const t_projects = useTranslations("projects");
  return (
    <div
      className={`
        h-full flex flex-col rounded-lg shadow-lg border overflow-hidden
        transition-all duration-300 ease-out transform hover:scale-[1.02]
        ${
          isActive
            ? "border-slate-300 dark:border-slate-800 scale-100"
            : "border-slate-200 dark:border-slate-700 scale-95"
        } 
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-white
      `}
    >
      <div className="flex-shrink-0 h-48 w-full relative">
        {" "}
        <Image
          src={project.imageUrl}
          alt={`Imagen del proyecto ${project.title}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {" "}
        <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
          {" "}
          {project.description}
        </p>
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex justify-start space-x-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          {" "}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              {t_projects("view_site")}
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
            >
              {t_projects("view_code")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarouselItem;
