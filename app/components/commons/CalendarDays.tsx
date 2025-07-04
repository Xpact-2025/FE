import React from 'react';
import DateMark from './DateMark';
import { WEEK_DAYS } from '@/constants/calendar';
import { DateCount } from '@/apis/dashboard';

interface CalendarDaysProps {
  calendarDays: (number | null)[];
  markedDates: DateCount[];
  year: number;
  month: number;
}

export default function CalendarDays({
  calendarDays,
  markedDates,
  year,
  month,
}: CalendarDaysProps) {
  return (
    <>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEK_DAYS.map(day => (
          <div
            key={day}
            className="text-center text-gray-100 body-12-r select-none"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={i} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const count = markedDates.find(d => d.date === dateStr)?.count;
          return (
            <div
              key={i}
              className="text-center pt-2 h-[30px] text-gray-300 body-11-m relative select-none"
            >
              {day}
              {count && <DateMark count={count} />}
            </div>
          );
        })}
      </div>
    </>
  );
}
