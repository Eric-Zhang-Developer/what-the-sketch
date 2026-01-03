import { useState } from "react";

export default function DropDownList({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <button onClick={handleClick} className="border py-2 px-4 rounded-lg">
        Category: {value}
      </button>
      {isVisible && (
        <ul className="flex flex-col items-center absolute bg-white gap-2 w-full border mt-2">
          {options.map((option) => (
            <li
              key={option}
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
