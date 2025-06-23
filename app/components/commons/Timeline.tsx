'use client';

import { useMemo, useRef } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { TimelineExp } from '@/apis/dashboard';
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
  minDate?: Date;
  maxDate?: Date;
}

export default function Timeline({
  exps,
  width = '100%',
  height = 170,
  minDate = new Date('2025-03-01'),
  maxDate = new Date('2025-06-30'),
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numericWidth = useResponsiveWidth(containerRef, width, 500);

  const differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

  const placedBar = useMemo<PlacedExperience[]>(() => {
    const rows: Row[] = [];

    return exps
      .map(exp => ({
        ...exp,
        _start: new Date(exp.startDate),
        _end: new Date(exp.endDate),
      }))
      .sort((a, b) => a._start.getTime() - b._start.getTime())
      .map(exp => {
        let rowIndex = rows.findIndex(row => exp._start > row.end);
        if (rowIndex === -1) {
          rows.push({ end: exp._end });
          rowIndex = rows.length - 1;
        } else {
          rows[rowIndex].end = exp._end;
        }
        return { ...exp, rowIndex };
      });
  }, [exps]);

  const { totalDays } = useMemo(() => {
    const days = differenceInDays(maxDate, minDate) || 1;
    return { totalDays: days };
  }, [maxDate, minDate]);

  const gap = 20;

  return (
    <div className="flex justify-center mx-[30px] pt-[10px] bg-gray-600-20 rounded-lg overflow-hidden">
      <svg
        width={numericWidth}
        height={height}
        style={{ background: 'transparent', width: `${numericWidth}px` }}
      >
        {placedBar.map((exp, idx) => {
          const x1 =
            (differenceInDays(exp._start, minDate) / totalDays) * numericWidth;
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
  );
}
