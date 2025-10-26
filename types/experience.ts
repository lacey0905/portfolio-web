export interface ExperienceProject {
  name: string;
  description: string;
  responsibilities: string[];
  tags: string[];
}

export interface Experience {
  id: string;
  company: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  projects: ExperienceProject[];
}

export interface ExperienceData {
  experiences: Experience[];
}
