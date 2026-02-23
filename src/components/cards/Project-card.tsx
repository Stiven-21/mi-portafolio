import { Project } from "@/interfaces/project.interface";
import Image from "next/image";
import { memo } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const ProjectCardComponent = ({ project }: { project: Project }) => {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/60 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
      {/* IMAGE */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
          loading="lazy"
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:blur-sm"
        />

        {/* OVERLAY FIXED */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-blue-500 transition"
              >
                <FaExternalLinkAlt className="text-white w-5 h-5" />
              </a>
            )}

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-blue-500 transition"
              >
                <FaGithub className="text-white w-5 h-5" />
              </a>
            )}
          </div>
        )}
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
};

export const ProjectCard = memo(ProjectCardComponent);
