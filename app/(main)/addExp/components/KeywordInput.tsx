'use client';

import { useState } from 'react';
import CloseIcon from '@/public/icons/Close_gray.svg';

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
    }
  };

  const handleRemove = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="w-full flex px-4 py-3 bg-gray-800 items-center rounded border border-gray-700 placeholder:text-gray-300 gap-2.5">
      {value.map((tag, index) => (
        <div
          key={index}
          className="inline-flex justify-between items-center px-3 py-1 bg-gray-300 rounded-[16px] gap-2 text-gray-1100 body-14-m whitespace-nowrap"
        >
          <span>#{tag}</span>
          <div>
            <CloseIcon onClick={() => handleRemove(index)} />
          </div>
        </div>
      ))}
      <input
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder="키워드 입력 후 Enter (최대 5개)"
        className="w-full"
      />
    </div>
  );
}
