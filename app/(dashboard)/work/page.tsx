import { RouteHeader } from "@/components/ui/RouteHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { getProjects } from "@/lib/content/projects";

export const metadata = { title: "Work — Angelo Principio" };

export default function WorkPage() {
  const total = getProjects().length;
  const pro = getProjects().filter((p) => p.kind === "professional").length;
  return (
    <>
      <RouteHeader
        crumb="Work"
        title="Selected Work"
        subtitle={`${total} shipped projects — ${pro} professional, ${total - pro} personal.`}
      />
      <WorkGrid />
    </>
  );
}
