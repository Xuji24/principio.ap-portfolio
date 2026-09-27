import type { PipelineNode } from "./types";

const PIPELINE: PipelineNode[] = [
  { id: "trigger", title: "Cron trigger", subtitle: "Runs nightly" },
  { id: "check", title: "Check inactivity", subtitle: "30+ days idle" },
  { id: "flag", title: "Flag and email", subtitle: "Warning sent" },
  { id: "grace", title: "Grace period", subtitle: "7 days" },
  { id: "purge", title: "Archive + TTL purge", subtitle: "Permanent delete" },
];

export function getPipeline(): PipelineNode[] { return PIPELINE; }
