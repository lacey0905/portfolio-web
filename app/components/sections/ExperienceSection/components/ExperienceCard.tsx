import type { Experience } from "@/types/experience";
import { formatDateRange, getAllTags } from "@/lib/data/formatters";
import TechTagList from "@/app/components/ui/TechTagList";
import ProjectItem from "./ProjectItem";

export interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      {/* Hover Background Effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      {/* Date Header */}
      <header className="z-10 mb-2 mt-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
        {formatDateRange(experience.startDate, experience.endDate)}
      </header>

      {/* Content */}
      <div className="z-10 sm:col-span-6">
        {/* Company/Position Header */}
        <h3 className="font-medium leading-snug text-slate-200">
          <div>
            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-sm sm:text-base transition lg:group-hover:text-[rgb(94,234,212)]">
              {experience.position} · {experience.company}
            </span>
          </div>
          <div className="text-slate-400 text-xs sm:text-sm mt-1">
            {experience.department}
          </div>
        </h3>

        {/* Projects */}
        {experience.projects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}

        {/* Tech Tags */}
        <TechTagList tags={getAllTags(experience)} />
      </div>
    </div>
  );
}
