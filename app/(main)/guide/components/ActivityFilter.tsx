'use client';

import { useState } from 'react';
import { AIActivity } from '@/apis/guide';

interface ActivityFilterProps {
  data?: AIActivity[];
  onSelectFilter: (weakness: string[] | null) => void;
}

export default function ActivityFilter({
  onSelectFilter,
}: ActivityFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState<string[] | null>(null);
  const options = ['데이터 분석', '사용자 리서치', '문제정의 능력'];

  const handleSelectFilter = (filter: string | null) => {
    if (filter === null) {
      setSelectedFilter(null);
      onSelectFilter(null);
      return;
    }

    if (selectedFilter === null) {
      setSelectedFilter([filter]);
      onSelectFilter([filter]);
      return;
    }

    if (selectedFilter.includes(filter)) {
      const newFilters = selectedFilter.filter(f => f !== filter);
      setSelectedFilter(newFilters.length ? newFilters : null);
      onSelectFilter(newFilters.length ? newFilters : null);
    } else {
      const newFilters = [...selectedFilter, filter];
      if (newFilters.length === 3) {
        setSelectedFilter(null);
        onSelectFilter(null);
      } else {
        setSelectedFilter(newFilters);
        onSelectFilter(newFilters);
      }
    }
  };

  return (
    <div className="flex gap-2.5">
      <button
        className={`px-7 py-2.5 rounded-[100px] border text-lg ${selectedFilter === null ? 'bg-orange-50-20 border-orange-50 text-primary-50 ' : 'bg-gray-700 border-gray-600 text-gray-200'}`}
        onClick={() => {
          handleSelectFilter(null);
        }}
      >
        전체
      </button>
      {options.map(option => (
        <button
          key={option}
          className={`px-7 py-2.5 rounded-[100px] border text-lg ${selectedFilter?.includes(option) ? 'bg-orange-50-20 border-orange-50 text-primary-50 ' : 'bg-gray-700 border-gray-600 text-gray-200'}`}
          onClick={() => handleSelectFilter(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
