import Button from "@/components/ui/Button";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  link = "#",
}: ProjectCardProps) {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      <div className="relative w-full h-48 bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-linear-to-br from-teal-900 to-gray-900 flex items-center justify-center group">
          <span className="text-gray-400 text-center px-4 group-hover:text-teal-300 transition-colors duration-300">{title}</span>
        </div>
      </div>

      <div className="p-6 bg-linear-to-b from-gray-800 to-gray-900">
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="md" className="w-full transition-all duration-300 hover:bg-gray-100 active:scale-95">
            MORE
            <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </a>
      </div>
    </div>
  );
}
