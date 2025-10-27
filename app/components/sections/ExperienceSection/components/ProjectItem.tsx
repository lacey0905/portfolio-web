import type { ExperienceProject } from "@/types/experience";

export interface ProjectItemProps {
  project: ExperienceProject;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  return (
    <div className="mt-3 sm:mt-4">
      <div className="text-slate-300 text-xs sm:text-sm font-medium transition group-hover:text-[rgb(94,234,212)]">
        {project.name}
      </div>
      <p className="mt-1 text-xs sm:text-sm leading-normal text-slate-400">
        {project.description}
      </p>
      {project.responsibilities.length > 0 && (
        <ul className="mt-2 text-xs sm:text-sm leading-normal text-slate-400 list-disc pl-4 sm:pl-5 space-y-1">
          {project.responsibilities.map((resp, idx) => (
            <li key={idx} className="leading-relaxed">
              {resp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
