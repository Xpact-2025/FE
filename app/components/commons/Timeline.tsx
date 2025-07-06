'use client';

import { useState, useEffect, useRef } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { TimelineExp } from '@/apis/dashboard';
import TimelineLabel from './TimelineLabel';

interface ParsedExperience extends TimelineExp {
  _start: Date;
  _end: Date;
  x1: number;
  x2: number;
  textWidth: number;
}

interface PlacedExperience extends ParsedExperience {
  rowIndex: number;
}

interface Row {
  end: number;
}

interface TimelineProps {
  exps: TimelineExp[];
  width?: number | string;
  height?: number;
  minDate?: Date;
  maxDate?: Date;
}

function formatDate(dateStr: string): string {
  return dateStr.replace(/-/g, '.');
}

function measureTextWidth(text: string, font = '14px sans-serif'): number {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;
  context.font = font;
  return context.measureText(text).width;
}

export default function Timeline({
  exps,
  width = '100%',
  height = 205,
  minDate = new Date('2025-03-01'),
  maxDate = new Date('2025-06-30'),
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numericWidth = useResponsiveWidth(containerRef, width, 500);
  const [placedBar, setPlacedBar] = useState<PlacedExperience[]>([]);

  const differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

  const totalDays = Math.max(differenceInDays(maxDate, minDate), 1);
  const gap = 20;

  useEffect(() => {
    if (!numericWidth) return;

    const rows: Row[] = [];

    const parsed = exps
      .map(exp => {
        const _start = new Date(exp.startDate);
        const _end = new Date(exp.endDate);
        const x1 =
          (differenceInDays(_start, minDate) / totalDays) * numericWidth;
        const x2 = (differenceInDays(_end, minDate) / totalDays) * numericWidth;
        const textWidth = measureTextWidth(exp.title);
        return { ...exp, _start, _end, x1, x2, textWidth };
      })
      .sort((a, b) => a.x1 - b.x1)
      .map(exp => {
        const padding = 20;
        const expEndX = Math.max(exp.x1 + exp.textWidth + padding, exp.x2);

        let rowIndex = rows.findIndex(row => exp.x1 > row.end);
        if (rowIndex === -1) {
          rows.push({ end: expEndX });
          rowIndex = rows.length - 1;
        } else {
          rows[rowIndex].end = expEndX;
        }

        return { ...exp, rowIndex };
      });

    setPlacedBar(parsed);
  }, [exps, numericWidth, totalDays, minDate]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center mx-[30px] pt-[10px] bg-gray-600-20 rounded-lg overflow-hidden"
    >
      <svg
        width={numericWidth}
        height={height}
        style={{ background: 'transparent', width: `${numericWidth}px` }}
      >
        {placedBar.map((exp, idx) => {
          const h = 30;
          const y = exp.rowIndex * (h + gap);

          return (
            <TimelineLabel
              key={idx}
              idx={idx}
              x1={exp.x1}
              x2={exp.x2}
              y={y}
              h={h}
              exp={{
                ...exp,
                startDate: formatDate(exp.startDate),
                endDate: formatDate(exp.endDate),
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
