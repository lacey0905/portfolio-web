import { getFeaturedProjects } from "@/lib/data/loaders";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ProjectCard from "./components/ProjectCard";
import ArchiveLink from "./components/ArchiveLink";

export default async function ArchiveSection() {
  const projects = await getFeaturedProjects();

  return (
    <section
      id="archive"
      className="mb-16 sm:mb-20 md:mb-24 lg:mb-28 scroll-mt-16 lg:scroll-mt-24"
      aria-label="Project archive"
    >
      <SectionHeader title="Archive" />
      <div>
        <p className="mb-6 text-sm leading-relaxed text-slate-400 sm:mb-8">
          사내 도구와 비공개 프로젝트는 목록에 포함되어 있지 않습니다.
        </p>
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
