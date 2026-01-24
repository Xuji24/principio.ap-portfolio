import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "NexUS Project - Booking App",
    description:
      "A purpose-driven booking app focused on user-centric design and hassle-free reservations, supported by a robust backend with Supabase, PostgreSQL, NextJS and secure Google OAuth authentication.",
    link: "#",
  },
  {
    id: 2,
    title: "NexUS Project - Event Running App",
    description:
      "A progressive event running app focused on user-centric design and hassle-free reservations, supported by a robust backend with Supabase, PostgreSQL, NextJS and secure Google OAuth authentication.",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="w-full min-h-screen">
      <section className="py-20 animate-fade-in px-6 lg:px-16">
        <h1 className="text-5xl font-bold text-black dark:text-white mb-12 animate-slide-in-down">
          Projects
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-slide-in-up"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
