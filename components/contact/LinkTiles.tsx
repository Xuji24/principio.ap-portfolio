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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3.5">
      {TILES.map(({ key, label, value, href, Icon, primary, arrow }) => (
        <a key={key} href={href} {...(key === "resume" ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
          className={cn(
            "group relative rounded-xl p-3.5 border elev-sm rim transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:elev-lg hover:border-amber/50",
            primary ? "bg-ink border-ink" : "bg-surface border-line",
          )}>
          <span className={cn("absolute top-3.5 right-3.5 text-[11px] transition-colors", primary ? "text-muted" : "text-line group-hover:text-amber")}>{arrow}</span>
          <span className={cn("w-7 h-7 rounded-lg grid place-items-center border mb-2.5", primary ? "bg-paper/10 border-paper/20 text-paper" : "bg-paper border-line text-ink")}>
            <Icon className="w-3.5 h-3.5" />
          </span>
          <p className={cn("font-display font-bold text-[11.5px]", primary ? "text-paper" : "text-ink")}>{label}</p>
          <p className={cn("font-mono text-[7.5px] mt-1 truncate", primary ? "text-paper/60" : "text-muted")}>{value}</p>
        </a>
      ))}
    </div>
  );
}
