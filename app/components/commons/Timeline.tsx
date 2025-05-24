'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { EXP_COLORS } from '@/constants/expColors';
import BtnPrev from './BtnPrev';
import BtnNext from './BtnNext';

interface Experience {
  startDate: string;
  endDate: string;
  title: string;
  experienceType: string;
}

interface ParsedExperience extends Experience {
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
  experiences: Experience[];
  width?: number | string;
  height?: number;
  padding?: number;
}

export default function Timeline({
  experiences = [],
  width = '100%',
  height = 200,
  padding = 40,
}: TimelineProps) {
  const parseISO = (dateStr: string): Date => new Date(dateStr);
  const differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

  const containerRef = useRef<HTMLDivElement>(null);
  const numericWidth = useResponsiveWidth(containerRef, width, 1000);

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
      } else rows[rowIndex].end = exp._end;
      return { ...exp, rowIndex };
    });
  }, [parsed]);

  interface DateRange {
    minDate: Date;
    maxDate: Date;
    totalDays: number;
    rowsCount: number;
  }
  const { minDate, maxDate, totalDays, rowsCount } = useMemo<DateRange>(() => {
    const all = placedBar.flatMap(e => [e._start, e._end]);
    const minD = new Date(Math.min(...all.map(d => d.getTime())));
    const maxD = new Date(Math.max(...all.map(d => d.getTime())));
    const days = differenceInDays(maxD, minD) || 1;

    return {
      minDate: minD,
      maxDate: maxD,
      totalDays: days,
      rowsCount: Math.max(1, ...placedBar.map(e => e.rowIndex + 1)),
    };
  }, [placedBar]);

  const gap = 3;
  const rowHeight = (height - padding * 2 - gap * (rowsCount - 1)) / rowsCount;

  const monthLabels = useMemo(() => {
    const labels: string[] = [];
    const dt = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (dt <= maxDate) {
      labels.push(`${dt.getMonth() + 1}월`);
      dt.setMonth(dt.getMonth() + 1);
    }
    return labels;
  }, [minDate, maxDate]);

  const [textWidths, setTextWidths] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = '14px sans-serif';
    setTextWidths(placedBar.map(exp => ctx.measureText(exp.title).width));
  }, [placedBar]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <BtnPrev movePrev={() => {}} />
        <div className="flex-1 flex gap-2" ref={containerRef}>
          {monthLabels.map(label => (
            <div
              key={label}
              className="flex-1 min-w-0 py-2 flex items-center justify-center bg-gray-700 rounded-lg"
            >
              {label}
            </div>
          ))}
        </div>
        <BtnNext moveNext={() => {}} />
      </div>

      {/* Timeline SVG */}
      <div className="flex justify-center">
        <svg
          width={numericWidth}
          height={height}
          style={{ background: 'transparent', width: `${numericWidth}px` }}
        >
          {placedBar.map((exp, idx) => {
            const x1 =
              padding +
              (differenceInDays(exp._start, minDate) / totalDays) *
                (numericWidth - padding * 2);
            const x2 =
              padding +
              (differenceInDays(exp._end, minDate) / totalDays) *
                (numericWidth - padding * 2);
            const y = padding + exp.rowIndex * (rowHeight + gap);
            const thinH = 6,
              thickH = 24;
            const textW = textWidths[idx] || 0;
            const highlightW = Math.max(Math.min(80, x2 - x1), textW + 24);
            if (x2 - x1 < 40)
              return (
                <circle
                  key={idx}
                  cx={x1 + 1}
                  cy={y + thickH / 2}
                  r={12}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
              );
            return (
              <g key={idx}>
                <circle
                  cx={x1 + (x2 - x1) - 9}
                  cy={y + thickH / 2 - 2}
                  r={9}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
                <rect
                  x={x1}
                  y={y + thickH / 2 - 5}
                  width={Math.max(x2 - x1, 1)}
                  height={thinH}
                  rx={2}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
                <rect
                  x={x1}
                  y={y}
                  width={highlightW}
                  height={thickH}
                  rx={4}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
                <text
                  x={x1 + 15}
                  y={y + thickH / 2 + 6}
                  fontSize={14}
                  fill="#000"
                >
                  {exp.title}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
