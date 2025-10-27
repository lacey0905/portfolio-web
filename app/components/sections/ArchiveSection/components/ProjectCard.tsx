import type { Project } from "@/types/project";
import TechTagList from "@/app/components/ui/TechTagList";
import ProjectImage from "./ProjectImage";
import ProjectTitle from "./ProjectTitle";

export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const content = (
    <>
      {/* Hover Background Effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      {/* Image */}
      <div className="z-10 sm:col-span-2">
        <ProjectImage src={project.image} alt={project.title} />
      </div>

      {/* Content */}
      <div className="z-10 sm:col-span-6">
        <ProjectTitle title={project.title} link={project.link} />
        <p className="mt-2 text-sm leading-normal text-slate-400">
          {project.description}
        </p>
        <TechTagList tags={project.technologies} />
      </div>
    </>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      {content}
    </div>
  );
}
