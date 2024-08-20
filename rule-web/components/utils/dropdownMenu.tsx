import React, { useState, useEffect, useRef } from 'react';

interface DropdownMenuProps {
  onDelete: () => void;
  onEdit: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* This is the ... button */}
      <div className="cursor-pointer">
        <button
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          onClick={toggleDropdown}
        >
          •••
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div
            className="py-1"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the dropdown from closing when clicking inside it
            }}
          >
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                onEdit();
                setIsOpen(false); // Close the dropdown after an action is taken
              }}
            >
              Edit
            </button>
            <button
              className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
              onClick={() => {
                onDelete();
                setIsOpen(false); // Close the dropdown after an action is taken
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
