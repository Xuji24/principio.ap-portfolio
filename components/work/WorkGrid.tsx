"use client";
import { useState } from "react";
import { Segmented } from "@/components/ui/Segmented";
import { ProjectCard } from "./ProjectCard";
import { filterProjects } from "@/lib/content/projects";
import type { ProjectKind } from "@/lib/content/types";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "professional", label: "Professional" },
  { value: "personal", label: "Personal" },
];

export function WorkGrid() {
  const [kind, setKind] = useState<"all" | ProjectKind>("all");
  const projects = filterProjects(kind);

  return (
    <>
      <div className="flex justify-end -mt-12 mb-4 relative z-10">
        <Segmented options={OPTIONS} value={kind} onChange={(v) => setKind(v as "all" | ProjectKind)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} wide={p.featured && kind !== "professional"} />
        ))}
      </div>
    </>
  );
}
