import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 rounded-lg shadow-md ${
        hover ? "transition-transform duration-300 hover:shadow-lg hover:scale-105" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
