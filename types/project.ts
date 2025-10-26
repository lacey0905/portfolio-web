export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  github?: string;
  date: string;
  category: string;
}
