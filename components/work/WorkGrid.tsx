"use client";
import { useState } from "react";
import { RouteHeader } from "@/components/ui/RouteHeader";
import { ProjectCard } from "./ProjectCard";
import { LivePreview } from "./LivePreview";
import { getProjects } from "@/lib/content/projects";
import type { Project } from "@/lib/content/types";

export function WorkGrid({ subtitle }: { subtitle: string }) {
  const projects = getProjects();
  const [preview, setPreview] = useState<Project | null>(null);
  const previewUrl = preview?.links.live;

  return (
    <>
      <RouteHeader crumb="Work" title="Selected Work" subtitle={subtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} onPreview={p.links.live && p.embeddable !== false ? () => setPreview(p) : undefined} />
        ))}
      </div>

      {preview && previewUrl && (
        <LivePreview url={previewUrl} title={preview.title} slug={preview.slug} onClose={() => setPreview(null)} />
      )}
    </>
  );
}
