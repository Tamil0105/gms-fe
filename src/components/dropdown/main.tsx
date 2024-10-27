import React, { useState } from 'react';

interface Option {
  value: string|number;
  label: string;
  icon?: React.ReactNode|any;
  color?: string; // Added color property
}

interface CustomDropdownProps {
  options: Option[];
  selectedValue: string;
  onSelect: (value: string|number) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (value: string|number) => {
    console.log(value)
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="flex items-center mb-1 text-sm">File Type</label>
      <button
        onClick={(e:any) =>handleDropdownToggle(e)}
        className="w-full border p-1 rounded text-sm flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <span className={`flex ${options.find(option => option.value === selectedValue)?.color} items-center`}>
          {options.find(option => option.value === selectedValue)?.icon}
          <span className="ml-2">{options.find(option => option.value === selectedValue)?.label}</span>
        </span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <ul className="absolute w-full border rounded bg-white shadow-lg mt-1 z-10">
          {options?.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`flex items-center p-2 cursor-pointer hover:bg-blue-100 ${option.color}`} 
            >
              {option.icon?React.cloneElement(option?.icon, { className: option?.color }):null} {/* Set icon color */}
              <span className="ml-2">{option?.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
