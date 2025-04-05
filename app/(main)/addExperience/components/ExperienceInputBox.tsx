import React from 'react';

interface ExperienceInputBoxProps {
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

export default function ExperienceInputBox({
  type,
  placeholder,
  value,
  min,
  max,
  onChange,
}: ExperienceInputBoxProps) {
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

function SelectInput({ value, onChange }: ExperienceInputBoxProps) {
  const options = [
    '공모전',
    '인턴',
    '프로젝트',
    '대외활동',
    '자격증',
    '학회/동아리',
    '교육',
    '수상',
    '봉사활동',
    '해외경험',
    '교내활동',
    '기타',
  ];

  return (
    <div className="grid grid-cols-6 gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() =>
            onChange({
              target: { value: option },
            } as React.ChangeEvent<HTMLSelectElement>)
          }
          className={`px-4 py-2 rounded border 
            ${value === option ? 'bg-[#FF6D01] text-black' : 'bg-[#161616] text-[#777] border-[#444]'}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function DateInput({ onChange, value, min, max }: ExperienceInputBoxProps) {
  return (
    <div className="w-100">
      <input
        type="date"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full text-[16px] px-4 py-3 bg-[#161616] text-[#777] rounded border border-[#161616]"
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

function TextAreaInput({
  placeholder,
  onChange,
  value,
}: ExperienceInputBoxProps) {
  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded
        border border-[#161616] placeholder:text-[#777]"
        rows={6}
      />
    </div>
  );
}

function TextInput({ placeholder, onChange, value }: ExperienceInputBoxProps) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded border border-[#161616] placeholder:text-[#777]"
      />
    </div>
  );
}
