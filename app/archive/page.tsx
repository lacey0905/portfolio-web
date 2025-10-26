import { Project } from "@/types/project";
import ProjectImage from "./ProjectImage";
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
    <div className="archive-container">
      <div className="archive-header">
        <h1 className="archive-title">프로젝트 아카이브</h1>
        <p className="archive-description">
          지금까지 진행한 프로젝트들을 소개합니다.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <ProjectImage src={project.image} alt={project.title} />
            <div className="project-content">
              <div className="project-meta">
                <span className="project-category">{project.category}</span>
                <span className="project-date">{project.date}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    라이브 보기
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
