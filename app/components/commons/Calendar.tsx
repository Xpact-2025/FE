'use client';

import React, { useEffect, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import { DateCount, getExpHistory } from '@/apis/dashboard';

interface CalendarProps {
  dateCounts?: DateCount[];
}

export default function Calendar({ dateCounts = [] }: CalendarProps) {
  const { year, month, monthName, moveMonth, calendarDays } = useCalendar();

  const [markedDates, setMarkedDates] = useState<DateCount[]>(dateCounts);

  useEffect(() => {
    async function fetchMarkedDates() {
      try {
        const res = await getExpHistory(year, month + 1);
        setMarkedDates(res.data.dateCounts);
      } catch (error) {
        console.error('경험 히스토리 불러오기 실패:', error);
      }
    }

    fetchMarkedDates();
  }, [year, month]);

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
