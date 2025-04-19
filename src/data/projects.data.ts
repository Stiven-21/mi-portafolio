export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string;
  repoUrl?: string;
  tags: string[];
}

export const projectsData: Project[] = [
  // {
  //   id: 1,
  //   title: "Proyecto Alpha",
  //   description: "Descripción breve del proyecto Alpha...",
  //   imageUrl: "/images/project-alpha.png",
  //   tags: ["React", "Node.js", "API"],
  //   projectUrl: "#",
  //   repoUrl: "#",
  // },
  // {
  //   id: 2,
  //   title: "Plataforma Beta",
  //   description: "Plataforma de e-commerce...",
  //   imageUrl: "/images/project-beta.png",
  //   tags: ["Next.js", "Tailwind", "Stripe"],
  //   projectUrl: "#",
  // },
  // {
  //   id: 3,
  //   title: "Proyecto Gamma",
  //   description: "Descripción breve del proyecto Gamma...",
  //   imageUrl: "/images/project-gamma.png",
  //   tags: ["React", "Node.js", "API"],
  //   repoUrl: "#",
  // },
  // {
  //   id: 4,
  //   title: "Proyecto Delta",
  //   description: "Descripción breve del proyecto Delta...",
  //   imageUrl: "/images/project-delta.png",
  //   tags: ["React", "Node.js", "API"],
  // },
  // {
  //   id: 5,
  //   title: "Proyecto Epsilon",
  //   description: "Descripción breve del proyecto Epsilon...",
  //   imageUrl: "/images/project-epsilon.png",
  //   tags: ["React", "Node.js", "API"],
  // },
  // {
  //   id: 6,
  //   title: "Proyecto Zeta",
  //   description: "Descripción breve del proyecto Zeta...",
  //   imageUrl: "/images/project-zeta.png",
  //   tags: ["React", "Node.js", "API"],
  // },
];
