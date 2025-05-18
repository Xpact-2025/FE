'use client';

import { useState } from 'react';

export default function KeywordInput() {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 21) {
      setInput(e.target.value);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input !== '') {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (tags.length < 5 && !tags.includes(trimmedInput)) {
        setTags(prevTags => [...prevTags, trimmedInput]);
        setInput('');
      }
    } else if (e.key === 'Backspace' && input === '' && tags.length) {
      const lastTag = tags[tags.length - 1];
      setTags(prevTags => prevTags.slice(0, -1));
      setInput(lastTag);
    }
  };

  return (
    <div className="w-full flex px-4 py-3 bg-gray-800 rounded border border-gray-700 placeholder:text-gray-300 gap-2.5">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="h-6 px-2 bg-gray-300 rounded-[16px] inline-flex justify-center items-center text-gray-1100 text-sm"
        >
          {tag}
        </div>
      ))}
      <input
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="#태그 입력 (최대 5개, 20글자 이내)"
      />
    </div>
  );
}
