import type { IconType } from "react-icons";
import {
  SiTypescript, SiPython, SiJavascript, SiSharp, SiNextdotjs, SiReact, SiExpress,
  SiFastapi, SiTailwindcss, SiShadcnui, SiPostgresql, SiSupabase, SiMysql,
  SiSqlalchemy, SiGit, SiVite,
} from "react-icons/si";

/** Logo for a stack item, where one exists in Simple Icons — chips fall back to text-only. */
export const TECH_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  Python: SiPython,
  JavaScript: SiJavascript,
  "C#": SiSharp,
  "Next.js": SiNextdotjs,
  React: SiReact,
  Express: SiExpress,
  FastAPI: SiFastapi,
  Tailwind: SiTailwindcss,
  ShadCN: SiShadcnui,
  PostgreSQL: SiPostgresql,
  Supabase: SiSupabase,
  MySQL: SiMysql,
  SQLAlchemy: SiSqlalchemy,
  Git: SiGit,
  Vite: SiVite,
};
