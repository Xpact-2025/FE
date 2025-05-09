'use client';

import React from 'react';

interface SelectBoxProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
  return (
    <div className="flex-1 min-w-[149px]">
      {label && <div className="text-[18px] mb-2">{label}</div>}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className={`appearance-none w-full h-[44px] px-4 py-2 bg-[#161616] rounded border border-gray-700 pr-10 ${
            value === '' ? 'text-gray-300' : 'text-white'
          }`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="absolute rotate-90 right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
          ›
        </span>
      </div>
    </div>
  );
};

export default SelectBox;
