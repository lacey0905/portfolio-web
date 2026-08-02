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
    aiAndAutomation: string[];
    graphicsAndInteractive: string[];
    devOpsAndTools: string[];
  };
  education: Education[];
  certifications: Certification[];
  contact: Contact;
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
  github: string;
  linkedin: string;
}
