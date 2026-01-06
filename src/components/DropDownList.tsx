import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DropDownList({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /**
   * Purpose is to turn an enum into proper casing example "ANIMALS" → "Animals"
   */
  const formatForDisplay = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const BASE_STYLES = [
    "rounded-xl text-xl font-bold text-light-foreground bg-light-background", // Layout & Text
    "border-2 border-light-foreground shadow-[4px_4px_0px_0px_#18181b]", // Borders & Shadows
    "dark:border-dark-foreground dark:bg-dark-background dark:text-dark-foreground dark:shadow-[4px_4px_0px_0px_#fafafa]",
    "transition-all duration-75 hover:cursor-pointer", // State & Animation
  ].join(" ");

  return (
    <div className="relative text-2xl">
      <button onClick={handleClick} className={`${BASE_STYLES} px-4 sm:px-6 py-2`}>
        <div className="flex gap-1 items-center justify-center">
          <ChevronDown
            className={`transition-transform duration-500 ease-in-out ${
              isVisible ? "rotate-180" : "rotate-0"
            }`}
            size={20}
            strokeWidth={2.5}
          ></ChevronDown>
          Category: {formatForDisplay(value)}
        </div>
      </button>
      {isVisible && (
        <ul className={`${BASE_STYLES} flex flex-col items-center mt-2 absolute w-full py-2`}>
          {options.map((option) => (
            <li
              key={option}
              className="px-4 sm:px-6 py-1 w-full text-center hover:scale-110 transition"
              onClick={() => {
                onChange(option);
                handleClick();
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
