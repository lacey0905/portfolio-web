import { Project } from "@/types/project";
import Link from "next/link";
import fs from "fs";
import path from "path";

async function getProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "archive.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    return data.projects;
  } catch (error) {
    console.error("Error reading archive.json:", error);
    return [];
  }
}

export default async function Archive() {
  const projects = await getProjects();

  return (
    <div className="bg-navy-500 min-h-screen px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-24">
      <Link
        href="/"
        className="group mb-8 inline-flex items-center font-semibold leading-tight text-emerald-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="mr-1 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-2"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          ></path>
        </svg>
        김개발
      </Link>

      <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
        전체 프로젝트 아카이브
      </h1>

      <div className="mt-12">
        <table className="mt-12 w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-navy-500/75 px-6 py-5 backdrop-blur">
            <tr>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                연도
              </th>
              <th className="py-4 pr-8 text-sm font-semibold text-slate-200">
                프로젝트
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">
                제작 기술
              </th>
              <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                링크
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={project.id}
                className="border-b border-slate-300/10 last:border-none"
              >
                <td className="py-4 pr-4 align-top text-sm">
                  <div className="translate-y-px text-slate-400">
                    {new Date(project.date).getFullYear()}
                  </div>
                </td>
                <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                  <div>
                    <div className="block sm:hidden">
                      {project.link ? (
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-emerald-400 focus-visible:text-emerald-400 group/link text-base"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="inline-block">
                            {project.title}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </div>
                    <div className="hidden sm:block">{project.title}</div>
                  </div>
                  <div className="mt-2 text-sm leading-normal text-slate-400">
                    {project.description}
                  </div>
                  <ul
                    className="flex flex-wrap mt-2 sm:hidden"
                    aria-label="Technologies"
                  >
                    {project.technologies.map((tech, i) => (
                      <li key={i} className="mr-1.5 mt-2">
                        <div className="flex items-center rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium leading-5 text-cyan-400">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="hidden py-4 pr-4 align-top lg:table-cell">
                  <ul className="flex -translate-y-1.5 flex-wrap">
                    {project.technologies.map((tech, i) => (
                      <li key={i} className="my-1 mr-1.5">
                        <div className="flex items-center rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium leading-5 text-cyan-400">
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="hidden py-4 align-top sm:table-cell">
                  <ul className="translate-y-1">
                    {project.link && (
                      <li className="mb-1 flex items-center">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-slate-200 focus-visible:text-slate-200 text-sm"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>
                            <span className="inline-block">
                              웹사이트
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </li>
                    )}
                    {project.github && (
                      <li className="mb-1 flex items-center">
                        <a
                          className="inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-slate-200 focus-visible:text-slate-200 text-sm"
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>
                            <span className="inline-block">
                              GitHub
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-0.5"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </span>
                          </span>
                        </a>
                      </li>
                    )}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
