import type { Project } from "@/types/project";
import ArchiveTableHeader from "./ArchiveTableHeader";
import ArchiveTableRow from "./ArchiveTableRow";

interface ArchiveTableProps {
  projects: Project[];
}

export default function ArchiveTable({ projects }: ArchiveTableProps) {
  return (
    <div className="mt-12">
      <table className="mt-12 w-full border-collapse text-left">
        <ArchiveTableHeader />
        <tbody>
          {projects.map((project) => (
            <ArchiveTableRow key={project.id} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
