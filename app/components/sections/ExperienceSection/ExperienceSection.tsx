import { getExperiences } from "@/lib/data/loaders";
import SectionHeader from "@/app/components/ui/SectionHeader";
import ExperienceCard from "./components/ExperienceCard";
import ResumeLink from "./components/ResumeLink";

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section
      id="experience"
      className="mb-12 sm:mb-16 md:mb-20 lg:mb-36 scroll-mt-16 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <SectionHeader title="Experience" />
      <div>
        <ol className="group/list">
          {experiences.map((experience) => (
            <li key={experience.id} className="mb-8 sm:mb-10 md:mb-12">
              <ExperienceCard experience={experience} />
            </li>
          ))}
        </ol>
        <ResumeLink />
      </div>
    </section>
  );
}
