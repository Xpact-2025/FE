'use client';

import SearchIcon from '@/public/icons/Search.svg';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative flex items-center justify-between w-[538px] h-[45px] pl-4 pr-6 bg-gray-800 rounded-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="경험 제목이나 키워드로 검색해보세요."
        className="w-[450px] h-[45px] text-gray-300 body-16-r"
      />
      <SearchIcon />
    </div>
  );
}
