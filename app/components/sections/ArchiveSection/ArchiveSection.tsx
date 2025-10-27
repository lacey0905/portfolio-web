import { getProjects } from "@/lib/data/loaders";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import ArchiveLink from "./components/ArchiveLink";

export default async function ArchiveSection() {
  const projects = await getProjects();

  return (
    <section
      id="archive"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Project archive"
    >
      <SectionHeader title="Archive" />
      <div>
        <ul className="group/list">
          {projects.map((project) => (
            <li key={project.id} className="mb-12">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <ArchiveLink />
      </div>
    </section>
  );
}
