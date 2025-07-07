'use client';

import { useState } from 'react';

interface KeywordInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function KeywordInput({ value, onChange }: KeywordInputProps) {
  const [input, setInput] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 21) {
      setInput(e.target.value);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input !== '') {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (value.length >= 5) {
        alert('키워드는 최대 5개까지 입력할 수 있습니다.');
        return;
      }

      if (trimmedInput.length > 20) {
        alert('각 키워드는 최대 20글자까지 입력할 수 있습니다.');
        return;
      }

      if (!value.includes(trimmedInput)) {
        onChange([...value, trimmedInput]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input === '' && value.length) {
      const lastTag = value[value.length - 1];
      onChange(value.slice(0, -1));
      setInput(lastTag);
    }
  };

  return (
    <div className="w-full flex px-4 py-3 bg-gray-800 items-center rounded border border-gray-700 placeholder:text-gray-300 gap-2.5">
      <div className="px-4 py-1 bg-gray-300 text-sm rounded-full text-gray-1100 whitespace-nowrap">
        #태그
      </div>
      {value.map((tag, index) => (
        <div
          key={index}
          className="px-4 py-1 bg-gray-300 rounded-[16px] inline-flex justify-center items-center text-gray-1100 text-sm whitespace-nowrap"
        >
          #{tag}
        </div>
      ))}
      <input
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="#태그 입력 (최대 5개)"
        className="w-full"
      />
    </div>
  );
}
