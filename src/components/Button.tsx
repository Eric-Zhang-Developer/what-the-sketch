// Neo-brutalist button default

import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "danger"; // Blue default or Red
}

// Put this in an array because long tailwind strings are a nightmare to read
const BASE_STYLES = [
  "rounded-xl px-6 sm:px-8 py-3 text-2xl font-bold text-light-foreground", // Layout & Text
  "border-2 border-light-foreground shadow-[4px_4px_0px_0px_#18181b]", // Borders & Shadows
  "transition-all duration-75 active:duration-0 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer", // State & Animation
  "dark:text-dark-foreground dark:border-dark-foreground dark:shadow-[4px_4px_0px_0px_#fafafa]", // Dark Mode
  "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]", // Active State (Pop effect)
].join(" ");

const VARIANTS = {
  primary: "bg-blue-400 hover:bg-blue-300",
  danger: "bg-red-400 hover:bg-red-300",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${BASE_STYLES} ${VARIANTS[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
