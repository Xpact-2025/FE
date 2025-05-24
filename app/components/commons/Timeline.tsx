'use client';

import { useMemo, useRef, useEffect, useState } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { EXP_COLORS } from '@/constants/expColors';

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

// Timeline 컴포넌트
export default function Timeline({
  experiences = [],
  width = '100%',
  height = 200,
  padding = 40,
}: TimelineProps) {
  // 날짜 처리를 위한 함수
  const parseISO = (dateStr: string): Date => new Date(dateStr);
  const differenceInDays = (date1: Date, date2: Date): number => {
    return Math.floor(
      (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  // width가 string일 경우 실제 렌더링된 width를 사용
  const svgRef = useRef<SVGSVGElement>(null);
  const numericWidth = useResponsiveWidth(svgRef, width, 1000);

  // 1. 날짜 파싱 및 시작일 기준 정렬
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

  // 2. 겹치지 않도록 행 할당
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

  // 3. 전체 날짜 범위 결정
  interface DateRange {
    minDate: Date;
    maxDate: Date;
    totalDays: number;
    rowsCount: number;
  }

  const { minDate, maxDate, totalDays, rowsCount } = useMemo<DateRange>(() => {
    const allDates = placedBar.flatMap(e => [e._start, e._end]);
    const minD = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxD = new Date(Math.max(...allDates.map(d => d.getTime())));
    const days = differenceInDays(maxD, minD) || 1;
    return {
      minDate: minD,
      maxDate: maxD,
      totalDays: days,
      rowsCount: Math.max(1, ...placedBar.map(e => e.rowIndex + 1)),
    };
  }, [placedBar]);

  const gap = 3; // 바 사이의 세로 간격(px)
  const rowHeight = (height - padding * 2 - gap * (rowsCount - 1)) / rowsCount;

  //월 정보
  const monthLabels = useMemo(() => {
    const months: string[] = [];
    const current = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (current <= maxDate) {
      months.push(`${current.getMonth() + 1}월`);
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  }, [minDate, maxDate]);

  // 텍스트 width 측정: 클라이언트에서만 측정하여 상태로 저장
  const [textWidths, setTextWidths] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const font = '14px sans-serif';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    const widths = placedBar.map(exp => {
      context.font = font;
      return context.measureText(exp.title).width;
    });
    setTextWidths(widths);
  }, [placedBar]);

  return (
    <>
      <div className="flex items-center justify-between mb-2 px-2">
        <button
          aria-label="Previous month"
          className="px-2 py-1 text-sm rounded hover:bg-gray-200"
        >
          ◀
        </button>
        <div className="flex flex-row justify-between">
          {monthLabels.map(label => (
            <div key={label}>{label}</div>
          ))}
        </div>
        <button
          aria-label="Next month"
          className="px-2 py-1 text-sm rounded hover:bg-gray-200"
        >
          ▶
        </button>
      </div>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{
          background: 'transparent',
          width: typeof width === 'number' ? `${width}px` : width,
        }}
      >
        {/* 바 */}
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

          const thinHeight = 6;
          const thickHeight = 24;
          const textWidth = textWidths[idx] ?? 0;
          const highlightWidth = Math.max(
            Math.min(80, x2 - x1),
            textWidth + 24
          ); // 텍스트보다 항상 길게

          //기간이 짧을 경우 원으로 표시
          if (x2 - x1 < 40)
            return (
              <g key={idx}>
                <circle
                  cx={x1 + Math.max(x2 - x1, 1)}
                  cy={y + thickHeight / 2 - 2}
                  r={12}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
              </g>
            );
          return (
            <g key={idx}>
              <circle
                cx={x1 + Math.max(x2 - x1, 1) - 9}
                cy={y + thickHeight / 2 - 2}
                r={9}
                fill={EXP_COLORS[exp.experienceType] || '#666'}
              />
              {/* 얇은 전체 기간 바 */}
              <rect
                x={x1}
                y={y + thickHeight / 2 - 5}
                width={Math.max(x2 - x1, 1)}
                height={thinHeight}
                fill={EXP_COLORS[exp.experienceType] || '#666'}
                rx={2}
              />
              {/* 두꺼운 하이라이트 바 */}
              <rect
                x={x1}
                y={y}
                width={highlightWidth}
                height={thickHeight}
                fill={EXP_COLORS[exp.experienceType] || '#666'}
                rx={4}
              />
              {/* 제목 텍스트 */}
              <text
                x={x1 + 15}
                y={y + thickHeight / 2 + 6}
                fill="#000"
                fontSize={14}
              >
                {exp.title}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}
