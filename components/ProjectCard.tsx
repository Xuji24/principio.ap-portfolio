import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  status: string;
  image?: string;
  tags?: string[];
}

export default function ProjectCard({
  title,
  description,
  link,
  status,
  image,
  tags = [],
}: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <div className="h-full rounded-2xl overflow-hidden card-tilt">
        {/* Card Container with Glassmorphism Effect */}
        <div className="h-full card-tilt-inner bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-teal-400/50 dark:hover:border-teal-500/50 transition-shadow duration-300">
          {/* Image Section */}
          <div className="relative w-full h-56 bg-linear-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-black flex items-center justify-center overflow-hidden">
            {image ? (
              <>
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </>
            ) : (
              <div className="w-full h-full bg-linear-to-br from-teal-600 to-blue-600 flex items-center justify-center group">
                <span className="text-white text-center px-4 font-semibold text-lg group-hover:scale-110 transition-transform duration-300">
                  {title}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Status: <span className="font-semibold">{status}</span>
            </p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 dark:border-teal-400/20 text-teal-700 dark:text-teal-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-700 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
              {description}
            </p>

            {/* Button with Modern Styling */}
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold group-hover:gap-3 transition-all duration-300">
              <span>View Project</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
