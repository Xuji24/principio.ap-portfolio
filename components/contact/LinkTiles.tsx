import { site } from "@/lib/content/site";
import { IconDoc, IconMail, IconLinkedIn, IconGitHub } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const TILES = [
  { key: "resume", label: "Résumé", value: "PDF", href: site.links.resume, Icon: IconDoc, primary: true, arrow: "↓" },
  { key: "email", label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: IconMail, primary: false, arrow: "↗" },
  { key: "linkedin", label: "LinkedIn", value: "/in/angelo-principio", href: site.links.linkedin, Icon: IconLinkedIn, primary: false, arrow: "↗" },
  { key: "github", label: "GitHub", value: "github.com/Xuji24", href: site.links.github, Icon: IconGitHub, primary: false, arrow: "↗" },
];

export function LinkTiles() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-4">
      {TILES.map(({ key, label, value, href, Icon, primary, arrow }) => (
        <a key={key} href={href} {...(key === "resume" ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
          className={cn(
            "btn-lift-lg group relative rounded-xl p-5 border rim transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-amber/50",
            primary ? "bg-ink border-ink" : "bg-surface border-line",
          )}>
          <span className={cn("absolute top-4 right-4 text-sm transition-colors", primary ? "text-muted" : "text-line group-hover:text-ink")}>{arrow}</span>
          <span className={cn("w-10 h-10 rounded-lg grid place-items-center border mb-3.5", primary ? "bg-paper/10 border-paper/20 text-paper" : "bg-paper border-line text-ink")}>
            <Icon className="w-4 h-4" />
          </span>
          <p className={cn("font-display font-bold text-sm", primary ? "text-paper" : "text-ink")}>{label}</p>
          <p className={cn("font-mono text-[10px] mt-1.5 truncate", primary ? "text-paper/60" : "text-muted")}>{value}</p>
        </a>
      ))}
    </div>
  );
}
