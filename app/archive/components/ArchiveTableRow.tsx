import type { Project } from "@/types/project";
import { getYearFromDate } from "@/lib/data/formatters";
import ProjectYearCell from "./ProjectYearCell";
import ProjectInfoCell from "./ProjectInfoCell";
import MadeAtCell from "./MadeAtCell";
import TechTagsCell from "./TechTagsCell";
import ProjectLinksCell from "./ProjectLinksCell";

interface ArchiveTableRowProps {
  project: Project;
}

export default function ArchiveTableRow({ project }: ArchiveTableRowProps) {
  return (
    <tr className="group border-b border-slate-300/10 last:border-none hover:bg-slate-800/50">
      <ProjectYearCell year={getYearFromDate(project.date)} />
      <ProjectInfoCell title={project.title} />
      <MadeAtCell company={project.company} />
      <TechTagsCell technologies={project.technologies} />
      <ProjectLinksCell link={project.link} github={project.github} />
    </tr>
  );
}
