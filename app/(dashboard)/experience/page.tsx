import { RouteHeader } from "@/components/ui/RouteHeader";
import { ExperienceList } from "@/components/experience/ExperienceList";

export const metadata = { title: "Experience — Angelo Principio" };

export default function ExperiencePage() {
  return (
    <>
      <RouteHeader crumb="Experience" title="Experience" subtitle="Where the work actually happened." />
      <ExperienceList />
    </>
  );
}
