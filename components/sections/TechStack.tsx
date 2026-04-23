import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface Tech {
  name: string;
  image: string;
}

interface TechGroup {
  label: string;
  techs: Tech[];
}

const groups: TechGroup[] = [
  {
    label: "Frontend",
    techs: [
      { name: "HTML5", image: "/HTML.png" },
      { name: "CSS3", image: "/CSS.png" },
      { name: "JavaScript", image: "/Javascript.png" },
      { name: "ReactJS", image: "/ReactJs.png" },
      { name: "NextJS", image: "/NextJS.png" },
      { name: "jQuery", image: "/Jquery.png" },
    ],
  },
  {
    label: "Backend & API",
    techs: [
      { name: "NodeJS", image: "/NodeJs.png" },
      { name: "ExpressJS", image: "/expressjs-light.png" },
      { name: "TypeScript", image: "/Typescript.png" },
    ],
  },
  {
    label: "Database",
    techs: [
      { name: "Supabase", image: "/Supabase.png" },
      { name: "PostgreSQL", image: "/PostgreSQL.png" },
      { name: "MySQL", image: "/MySQL.png" },
    ],
  },
  {
    label: "Tools",
    techs: [
      { name: "GitHub", image: "/github.png" },
      { name: "Git", image: "/Vector.png" },
    ],
  },
];

export default function TechStack() {
  return (
    <section className="w-full py-24 px-6 lg:px-16">
      <ScrollReveal direction="up">
        <p className="text-xs font-bold tracking-[0.4em] uppercase text-primary mb-3">
          02 · TECH STACK
        </p>
        <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tighter mb-4">
          Technologies I{" "}
          <span className="text-primary">
            Build With.
          </span>
        </h2>
        <p className="text-muted-foreground text-base max-w-xl mb-14">
          From database design to UI polish — here&apos;s the stack powering my projects.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {groups.map((group, gi) => (
          <ScrollReveal key={group.label} direction="up" delay={gi * 100}>
            <div
              className={`rounded-2xl border border-border bg-card p-6 h-full`}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-5">
                {group.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="group flex flex-col items-center gap-2 cursor-default"
                  >
                    <div className="w-14 h-14 rounded-xl bg-secondary border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/8 transition-all duration-300 group-hover:scale-110">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        width={36}
                        height={36}
                        className="w-9 h-9 object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center leading-tight">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
