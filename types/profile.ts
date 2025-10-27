export interface Profile {
  name: string;
  nameEn: string;
  role: string;
  birth: string;
  about: {
    paragraphs: string[];
    highlights: Record<string, string>;
  };
  skills: {
    webDevelopment: string[];
    gameAndGraphics: string[];
    devOpsAndTools: string[];
  };
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  contact: Contact;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Contact {
  email: string;
  phone: string;
  github: string;
}
