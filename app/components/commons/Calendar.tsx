'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import { DateCount, getExpHistory } from '@/apis/dashboard';

interface CalendarProps {
  dateCounts?: { [month: string]: DateCount[] };
}

export default function Calendar({ dateCounts = {} }: CalendarProps) {
  const { year, month, monthName, moveMonth, calendarDays } = useCalendar();

  const [markedDates, setMarkedDates] = useState<{
    [month: string]: DateCount[];
  }>(dateCounts);

  const markedDatesRef = useRef(markedDates);

  useEffect(() => {
    markedDatesRef.current = markedDates;
  }, [markedDates]);

  useEffect(() => {
    //dateCounts에 현재 월이 있으면 더 data를 새로 fetch하지 않음
    if (markedDatesRef.current[String(month + 1)]) return;
    async function fetchMarkedDates() {
      try {
        const dateCounts = (await getExpHistory(year, month + 1)).data
          .dateCounts;
        //dateCounts에 현재 월이 없으면 빈 배열을 저장
        if (!dateCounts[String(month + 1)]) {
          setMarkedDates(prev => ({
            ...prev,
            [String(month + 1)]: [],
          }));
          return;
        }
        //dateCounts에 현재 월이 있으면 저장
        setMarkedDates(prev => ({
          ...prev,
          ...dateCounts,
        }));
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
        markedDates={markedDates[String(month + 1)] || []}
        year={year}
        month={month}
      />
    </>
  );
}
