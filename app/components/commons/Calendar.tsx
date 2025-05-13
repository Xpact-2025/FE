'use client';

import React from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';

interface CalendarProps {
  markedDates?: Record<string, number>;
}

export default function Calendar({ markedDates = {} }: CalendarProps) {
  const { year, month, monthName, moveMonth, calendarDays } = useCalendar();

  return (
    <>
      <CalendarHeader year={year} monthName={monthName} moveMonth={moveMonth} />
      <CalendarDays
        calendarDays={calendarDays}
        markedDates={markedDates}
        year={year}
        month={month}
      />
    </>
  );
}
