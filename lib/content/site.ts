import { getProjects } from "./projects";
import { getCredentials } from "./credentials";
import { getStack } from "./skills";

export const site = {
  name: "Angelo Principio",
  role: "Full Stack Developer",
  tagline: "Automation-driven web applications that make internal operations measurably faster.",
  email: "principio.ap@gmail.com",
  timezone: "Asia/Manila",
  links: {
    linkedin: "https://www.linkedin.com/in/angelo-principio-6b8380296/",
    github: "https://github.com/Xuji24",
    resume: "/angelo-principio-resume.pdf",
  },
} as const;

export function getStats() {
  const projects = getProjects();
  return [
    { label: "Projects", value: projects.length },
    { label: "Credentials", value: getCredentials().length },
    { label: "Technologies", value: new Set(getStack().flatMap((g) => g.items)).size },
    { label: "Live Deploys", value: projects.filter((p) => p.links.live).length },
  ];
}
