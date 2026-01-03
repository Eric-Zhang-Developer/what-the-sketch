import { useState } from "react";
export default function DropDownList() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div>
      <button onClick={handleClick} className="border py-2 px-4 rounded-lg">
        Click Me
      </button>
      {isVisible && (
        <ul className="flex flex-col items-center">
          <li>Item 1</li>
        </ul>
      )}
    </div>
  );
}
