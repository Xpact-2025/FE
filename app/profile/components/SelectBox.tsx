'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectBoxProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

const SelectBox = ({
  label,
  value,
  onChange,
  options,
  placeholder = '선택',
}: SelectBoxProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const formattedOptions: Option[] = options.map(opt => ({
    label: opt,
    value: opt,
  }));

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const selectedLabel =
    formattedOptions.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="flex-1 min-w-[149px]">
      {label && <div className="text-[16px] font-medium mb-2">{label}</div>}
      <div className="relative w-full select-none" ref={ref}>
        <div
          className="border border-gray-700 rounded-md px-4 py-2 flex justify-between items-center bg-gray-800 h-[44px] cursor-pointer"
          onClick={() => setOpen(prev => !prev)}
        >
          <span className={`${value ? 'text-white' : 'text-gray-400'}`}>
            {selectedLabel}
          </span>
          <svg
            className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {open && (
          <div className="absolute top-full left-0 mt-1 w-full bg-gray-600 rounded-md shadow-lg z-10 max-h-56 overflow-y-auto border border-gray-50-20">
            {formattedOptions.map(opt => (
              <div
                key={opt.value}
                className={`px-4 py-2 cursor-pointer hover:bg-primary ${
                  value === opt.value ? 'bg-gray-500' : ''
                }`}
                onClick={e => {
                  e.stopPropagation(); // 외부 클릭으로 안 인식되게
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBox;
