import { useState, useMemo, useEffect } from 'react';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export const useCalendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 9, 0, 0, 0);
    setYear(now.getFullYear());
    setMonth(now.getMonth());
  }, []);

  const moveMonth = (diff: number) => {
    if (year === null || month === null) return;

    let newMonth = month + diff;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setMonth(newMonth);
    setYear(newYear);
  };

  const calendarDays = useMemo(() => {
    if (year === null || month === null) return [];

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);

    const days = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const remainder = days.length % 7;
    if (remainder !== 0) {
      days.push(...Array(7 - remainder).fill(null));
    }

    return days;
  }, [year, month]);

  const monthName = useMemo(() => {
    if (year === null || month === null) return '';

    return new Date(year, month).toLocaleString('en-US', {
      month: 'long',
    });
  }, [year, month]);

  return { year, month, monthName, moveMonth, calendarDays };
};
