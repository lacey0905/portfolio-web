import { promises as fs } from "fs";
import path from "path";
import type { ExperienceData, Experience } from "@/types/experience";

async function getExperiences(): Promise<Experience[]> {
  const filePath = path.join(process.cwd(), "data", "experience.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data: ExperienceData = JSON.parse(fileContents);
  return data.experiences;
}

function formatDateRange(startDate: string, endDate: string | null): string {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-");
    return `${year}.${month}`;
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} — ${end}`;
}

function getAllTags(experience: Experience): string[] {
  const allTags = new Set<string>();
  experience.projects.forEach((project) => {
    project.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
}

export default async function ExperienceSection() {
  const experiences = await getExperiences();

  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-navy-500/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          Experience
        </h2>
      </div>
      <div>
        <ol className="group/list">
          {experiences.map((experience) => (
            <li key={experience.id} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  {formatDateRange(experience.startDate, experience.endDate)}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>
                      <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 text-base transition group-hover:text-emerald-400">
                        {experience.position} · {experience.company}
                      </span>
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      {experience.department}
                    </div>
                  </h3>

                  {experience.projects.map((project, index) => (
                    <div key={index} className="mt-4">
                      <div className="text-slate-300 text-sm font-medium transition group-hover:text-emerald-300">
                        {project.name}
                      </div>
                      <p className="mt-1 text-sm leading-normal text-slate-400">
                        {project.description}
                      </p>
                      {project.responsibilities.length > 0 && (
                        <ul className="mt-2 text-sm leading-normal text-slate-400 list-disc pl-5 space-y-1">
                          {project.responsibilities.map((resp, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <ul
                    className="mt-4 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {getAllTags(experience).map((tag) => (
                      <li key={tag} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium leading-5 text-cyan-400">
                          {tag}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <a
            className="inline-flex items-center font-semibold leading-tight text-slate-200 group"
            aria-label="View Full Résumé"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span>
              <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
                View Full{" "}
              </span>
              <span className="whitespace-nowrap">
                <span className="border-b border-transparent pb-px transition group-hover:border-emerald-400 motion-reduce:transition-none">
                  Résumé
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
