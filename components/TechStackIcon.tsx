interface TechStackIconProps {
  iconPath: string;
  iconColor: string;
  name: string;
}

export default function TechStackIcon({
  iconPath,
  iconColor,
  name,
}: TechStackIconProps) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer">
      <svg
        className="w-8 h-8 transition-transform duration-300"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color: iconColor }}
      >
        <path d={iconPath} />
      </svg>
      <span className="text-sm font-semibold text-black dark:text-white text-center">
        {name}
      </span>
    </div>
  );
}
