import BtnExpType from '@/app/components/BtnExpType';
import { EXP_OPTIONS } from '@/constants/expOptions';
import React from 'react';

interface ExpInputBoxProps {
  type: 'select' | 'string' | 'date' | 'textarea';
  placeholder?: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function ExpInputBox({
  type,
  placeholder,
  value,
  min,
  max,
  onChange,
}: ExpInputBoxProps) {
  const components = {
    select: SelectInput,
    string: TextInput,
    date: DateInput,
    textarea: TextAreaInput,
  };

  const Component = components[type];
  return Component ? (
    <Component {...{ type, placeholder, value, onChange, min, max }} />
  ) : null;
}

function SelectInput({ value, onChange }: ExpInputBoxProps) {
  const options = Object.values(EXP_OPTIONS);

  return (
    <div className="grid grid-cols-6 gap-2">
      {options.map((option, index) => (
        <BtnExpType
          key={index}
          label={option.label}
          selected={value === option.value}
          onClick={() =>
            onChange({
              target: { value: option.value },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
        />
      ))}
    </div>
  );
}

function DateInput({ onChange, value, min, max }: ExpInputBoxProps) {
  return (
    <div className="w-full">
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-4 py-3 font-medium bg-gray-1000 text-gray-300 rounded border border-gray-50-10"
      />
      <style>
        {`
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
    `}
      </style>
    </div>
  );
}

function TextAreaInput({ placeholder, onChange, value }: ExpInputBoxProps) {
  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-800
        border border-gray-700 placeholder:text-gray-300"
        rows={6}
      />
    </div>
  );
}

function TextInput({ placeholder, onChange, value }: ExpInputBoxProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-gray-800 text-gray-50 rounded border border-gray-700 placeholder:text-gray-300"
      />
    </div>
  );
}
