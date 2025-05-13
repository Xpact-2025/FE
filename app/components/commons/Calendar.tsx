'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { WEEK_DAYS } from '../../../constants/calendar';

interface CalendarProps {
  markedDates?: Record<string, number>;
}

function DateMark({ count }: { count: number }) {
  return (
    <span
      className={`block mx-auto mt-1 w-1.5 h-1.5 rounded-full ${
        count > 1 ? 'bg-primary' : 'bg-[#EAA26D]'
      }`}
    />
  );
}

export default function Calendar({ markedDates = {} }: CalendarProps) {
  const { year, month, monthName, moveMonth, calendarDays } = useCalendar();

  return (
    <>
      <div className="flex items-center justify-between mb-6 mt-2">
        <button
          onClick={() => moveMonth(-1)}
          className="bg-gray-700 rounded-lg w-9 h-9 text-xl cursor-pointer mr-3 hover:bg-gray-600 transition"
          aria-label="이전 달"
        >
          {'<'}
        </button>
        <span className="body-18-m text-gray-100 min-w-[120px] text-center">
          {monthName} {year}
        </span>
        <button
          onClick={() => moveMonth(1)}
          className="bg-gray-700 rounded-lg w-9 h-9 text-xl cursor-pointer mr-3 hover:bg-gray-600 transition"
          aria-label="다음 달"
        >
          {'>'}
        </button>
      </div>
      <div className="grid grid-cols-7 my-2 gap-0.5">
        {WEEK_DAYS.map(d => (
          <div
            key={d}
            className="text-center text-gray-100 body-16-r select-none"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((d, i) => {
          if (d === null) return <div key={i} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const count = markedDates[dateStr];
          return (
            <div
              key={i}
              className="text-center pt-2 h-[40px] text-gray-300 body-16-r relative select-none"
            >
              {d}
              {count && <DateMark count={count} />}
            </div>
          );
        })}
      </div>
    </>
  );
}
