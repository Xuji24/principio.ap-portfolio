import { Code2, Cpu } from "lucide-react";
import React from "react";
import Image from "next/image";
import { TechStackData } from "@/components/TechStackIcons";

const experience = [
  {
    id: 1,
    role: "Backend Developer",
    company: "Polytechnic University of the Philippines",
    date: "October 2022 - 2024",
    description: "Using C#, backend design in winforms, utilizing mysql4.",
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Polytechnic University of the Philippines",
    date: "October 2023 - 2024",
    description: "Using C#, backend design in winforms, utilizing mysql4.",
  },
  {
    id: 3,
    role: "Backend Developer",
    company: "Polytechnic University of the Philippines",
    date: "October 2023 - 2024",
    description: "Using C#, backend design in winforms, utilizing mysql4.",
  },
];

function TechCard({ image, name }: { image: string; name: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mg p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-teal-500/20 transition-all duration-300 hover:scale-105 h-32 w-32">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="w-12 h-12 object-contain"
      />
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-2">
        {name}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen">
      <section className="py-20 animate-fade-in px-6 lg:px-16">
        <h1 className="text-5xl font-bold text-black dark:text-white mb-6 animate-slide-in-down">
          My Journey
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-20 animate-slide-in-up">
          The progression of my skills, showcasing background and current tech
          stacks
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 flex items-center gap-3 animate-slide-in-left">
              <Cpu className="text-teal-600" size={28} />
              Experience
            </h2>

            <div className="space-y-8">
              {experience.map((job, index) => (
                <div
                  key={job.id}
                  className="relative pl-8 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute left-0 top-2 w-4 h-4 bg-teal-600 rounded-full border-4 border-white dark:border-black animate-pulse-glow"></div>
                  {index !== experience.length - 1 && (
                    <div className="absolute left-1.5 top-8 w-0.5 h-16 bg-linear-to-b from-teal-600 to-transparent"></div>
                  )}

                  <h3 className="text-xl font-bold text-black dark:text-white">
                    {job.role}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-semibold">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {job.date}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8 flex items-center gap-3 animate-slide-in-right">
              <Code2 className="text-teal-600" size={28} />
              Tech Stack
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
              {TechStackData.map((tech, index) => (
                <div
                  key={tech.name}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  className="animate-slide-in-up"
                >
                  <TechCard image={tech.image} name={tech.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
