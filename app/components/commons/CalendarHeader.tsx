import React from 'react';
import BackIcon from '@/public/icons/Chevron_Left.svg';

interface CalendarHeaderProps {
  year: number;
  monthName: string;
  moveMonth: (direction: number) => void;
}

export default function CalendarHeader({
  year,
  monthName,
  moveMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 mt-2">
      <button
        onClick={() => moveMonth(-1)}
        className="flex items-center justify-center bg-gray-700 rounded-lg w-9 h-9 cursor-pointer mr-3 hover:bg-gray-600 transition"
        aria-label="이전 달"
      >
        <BackIcon className="stroke-gray-100" width={20} height={20} />
      </button>
      <span className="body-18-m text-gray-100 min-w-[120px] text-center">
        {monthName} {year}
      </span>
      <button
        onClick={() => moveMonth(1)}
        className="flex items-center justify-center bg-gray-700 rounded-lg w-9 h-9 cursor-pointer mr-3 hover:bg-gray-600 transition"
        aria-label="다음 달"
      >
        <BackIcon
          className="stroke-gray-100 rotate-180"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
}
