export interface Project {
  slug: string;
  name: string;
  authors: { [author: string]: string }[];
  description: string;
  paratimes: string[];
  languages: string[];
  screenshots: string[];
  license: string;
  tags: string[];
  codeUrl?: string;
  demoUrl: string;
  tutorials?: { [tutorial: string]: string }[];
  created: string;
  lastUpdated: string;
  maintainedByOasis: boolean;
}
