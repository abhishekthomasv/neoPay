import { Link } from "react-router-dom";
import { memo, useRef, useEffect } from "react";

export const DropdownMenu = memo(({ isOpen, setIsOpen }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (isOpen && !menuRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handler);
    } else {
      document.removeEventListener("mousedown", handler);
    }

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen, setIsOpen]);

  return (
    isOpen && (
      <div
        ref={menuRef}
        className="absolute  right-[-1.55rem] top-10 bg-gray-700 w-max p-4 rounded-lg font-bold text-gray-400 shadow-md"
      >
        <ul>
          <li
            onClick={() => {
              localStorage.clear();
            }}
          >
            <Link to="/signin">Logout</Link>
          </li>
        </ul>
      </div>
    )
  );
});
