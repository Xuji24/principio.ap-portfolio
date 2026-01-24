import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";

  const variants = {
    primary:
      "bg-teal-700 text-white hover:bg-teal-800 disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed",
    outline:
      "border-2 border-teal-700 text-teal-700 hover:bg-teal-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
