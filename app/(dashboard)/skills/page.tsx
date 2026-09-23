import { RouteHeader } from "@/components/ui/RouteHeader";
import { SkillsGrid } from "@/components/skills/SkillsGrid";

export const metadata = { title: "Skills — Angelo Principio" };

export default function SkillsPage() {
  return (
    <>
      <RouteHeader crumb="Skills" title="Skills" subtitle="What I build, what I build it with, and where it shipped." />
      <SkillsGrid />
    </>
  );
}
