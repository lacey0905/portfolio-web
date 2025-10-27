import type { Project } from "@/types/project";
import ArchiveTableHeader from "./ArchiveTableHeader";
import ArchiveTableRow from "./ArchiveTableRow";

interface ArchiveTableProps {
  projects: Project[];
}

export default function ArchiveTable({ projects }: ArchiveTableProps) {
  return (
    <div className="mt-8 sm:mt-10 md:mt-12">
      <table className="mt-8 sm:mt-10 md:mt-12 w-full border-collapse text-left">
        <ArchiveTableHeader />
        <tbody>
          {projects.map((project) => (
            <ArchiveTableRow key={project.title} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
