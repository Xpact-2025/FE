'use client';

import { useMemo, useRef, useState } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import BtnPrev from './BtnPrev';
import BtnNext from './BtnNext';
import { getExpTimeline, TimelineExp } from '@/apis/dashboard';
import TimelineLabel from './TimelineLabel';

interface ParsedExperience extends TimelineExp {
  _start: Date;
  _end: Date;
}

interface PlacedExperience extends ParsedExperience {
  rowIndex: number;
}

interface Row {
  end: Date;
}

interface TimelineProps {
  exps: TimelineExp[];
  width?: number | string;
  height?: number;
  initialMinDate?: Date;
  initialMaxDate?: Date;
}

export default function Timeline({
  exps = [],
  width = '100%',
  height = 170,
  initialMinDate = new Date('2025-03-01'),
  initialMaxDate = new Date('2025-06-30'),
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numericWidth = useResponsiveWidth(containerRef, width, 500);

  const [minDate, setMinDate] = useState(initialMinDate);
  const [maxDate, setMaxDate] = useState(initialMaxDate);
  const [experiences, setExperiences] = useState<TimelineExp[]>(exps);

  // 1달 이전으로 이동
  const handlePrev = () => {
    const newMin = new Date(minDate);
    newMin.setMonth(minDate.getMonth() - 1);
    const newMax = new Date(maxDate);
    newMax.setMonth(maxDate.getMonth() - 1);
    setMinDate(newMin);
    setMaxDate(newMax);

    async function fetchTimelineExp() {
      try {
        // TODO: 날짜를 yyyy-mm-dd 형식으로 변환하여 API 호출
        const response = await getExpTimeline(
          newMin.toISOString().split('T')[0],
          newMax.toISOString().split('T')[0]
        );
        const timeline = response.data;
        console.log('경험 타임라인:', timeline);

        if (!Array.isArray(timeline) || timeline.length === 0) {
          return;
        }

        setExperiences(prev => {
          // 중복을 제거한 새로운 경험만 필터링
          const newItems = timeline.filter(
            newItem =>
              !prev.some(
                prevItem =>
                  prevItem.startDate === newItem.startDate &&
                  prevItem.endDate === newItem.endDate &&
                  prevItem.title === newItem.title &&
                  prevItem.experienceType === newItem.experienceType
              )
          );

          return [...prev, ...newItems];
        });
      } catch (error) {
        console.error('경험 타임라인 불러오기 실패:', error);
        setExperiences([]);
      }
    }

    fetchTimelineExp();
  };

  // 1달 이후로 이동
  const handleNext = () => {
    const newMin = new Date(minDate);
    newMin.setMonth(minDate.getMonth() + 1);
    const newMax = new Date(maxDate);
    newMax.setMonth(maxDate.getMonth() + 1);
    setMinDate(newMin);
    setMaxDate(newMax);
  };

  const parseISO = (dateStr: string): Date => new Date(dateStr);
  const differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

  const parsed = useMemo<ParsedExperience[]>(
    () =>
      experiences
        .map(exp => ({
          ...exp,
          _start: parseISO(exp.startDate),
          _end: parseISO(exp.endDate),
        }))
        .sort((a, b) => a._start.getTime() - b._start.getTime()),
    [experiences]
  );

  const placedBar = useMemo<PlacedExperience[]>(() => {
    const rows: Row[] = [];
    return parsed.map(exp => {
      let rowIndex = rows.findIndex(row => exp._start > row.end);
      if (rowIndex === -1) {
        rows.push({ end: exp._end });
        rowIndex = rows.length - 1;
      } else {
        rows[rowIndex].end = exp._end;
      }
      return { ...exp, rowIndex };
    });
  }, [parsed]);

  const { totalDays } = useMemo(() => {
    const days = differenceInDays(maxDate, minDate) || 1;
    return { totalDays: days };
  }, [maxDate, minDate]);

  const gap = 10;

  const monthLabels = useMemo(() => {
    const labels: string[] = [];
    const dt = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (dt < maxDate) {
      labels.push(`${dt.getMonth() + 1}월`);
      dt.setMonth(dt.getMonth() + 1);
    }
    return labels;
  }, [minDate, maxDate]);

  return (
    <div className="flex flex-col">
      <div className="mb-3">{minDate.getFullYear()}</div>
      <div className="flex items-center mb-3 gap-2">
        <BtnPrev movePrev={handlePrev} />
        <div
          className="flex-1 flex gap-2 overflow-x-auto no-scrollbar"
          ref={containerRef}
        >
          {monthLabels.map(label => (
            <div
              key={label}
              className="flex-1 min-w-0 py-2 flex items-center justify-center bg-gray-700 rounded-lg body-12-m"
            >
              {label}
            </div>
          ))}
        </div>
        <BtnNext moveNext={handleNext} />
      </div>

      <div className="flex justify-center mx-[30px] pt-[10px] bg-gray-600-20 rounded-lg overflow-hidden">
        <svg
          width={numericWidth}
          height={height}
          style={{ background: 'transparent', width: `${numericWidth}px` }}
        >
          {placedBar.map((exp, idx) => {
            const x1 =
              (differenceInDays(exp._start, minDate) / totalDays) *
              numericWidth;
            const x2 =
              (differenceInDays(exp._end, minDate) / totalDays) * numericWidth;
            const h = 30;
            const y = exp.rowIndex * (h + gap);

            return (
              <TimelineLabel
                key={idx}
                idx={idx}
                x1={x1}
                x2={x2}
                y={y}
                h={h}
                exp={exp}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
