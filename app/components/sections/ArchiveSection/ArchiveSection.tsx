import { getFeaturedProjects } from "@/lib/data/loaders";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import ArchiveLink from "./components/ArchiveLink";

export default async function ArchiveSection() {
  const projects = await getFeaturedProjects();

  return (
    <section
      id="archive"
      className="mb-12 sm:mb-16 md:mb-20 lg:mb-32 scroll-mt-16 lg:scroll-mt-24"
      aria-label="Project archive"
    >
      <SectionHeader title="Archive" />
      <div>
        <ul className="group/list">
          {projects.map((project) => (
            <li key={project.title} className="mb-8 sm:mb-10 md:mb-12">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        <ArchiveLink />
      </div>
    </section>
  );
}
