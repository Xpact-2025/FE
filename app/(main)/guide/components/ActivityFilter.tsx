'use client';

import { useState } from 'react';

interface ActivityFilterProps {
  weaknesses: string[];
  onSelectFilter: (weakness: string[] | null) => void;
}

export default function ActivityFilter({
  weaknesses,
  onSelectFilter,
}: ActivityFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSelectFilter = (filter: string | null) => {
    if (filter === null || filter === selectedFilter) {
      setSelectedFilter(null);
      onSelectFilter(null); // 전체 or 해제
    } else {
      setSelectedFilter(filter);
      onSelectFilter([filter]); // 배열로 보냄
    }
  };

  return (
    <div className="flex gap-2.5">
      <button
        className={`px-7 py-2.5 rounded-[100px] border text-lg ${
          selectedFilter === null
            ? 'bg-orange-50-20 border-orange-50 text-primary-50'
            : 'bg-gray-700 border-gray-600 text-gray-200'
        }`}
        onClick={() => handleSelectFilter(null)}
      >
        전체
      </button>

      {weaknesses.map(option => (
        <button
          key={option}
          className={`px-7 py-2.5 rounded-[100px] border text-lg ${
            selectedFilter === option
              ? 'bg-orange-50-20 border-orange-50 text-primary-50'
              : 'bg-gray-700 border-gray-600 text-gray-200'
          }`}
          onClick={() => handleSelectFilter(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
