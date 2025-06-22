'use client';

import { useMemo, useRef } from 'react';
import useResponsiveWidth from '@/hooks/useResponsiveWidth';
import { EXP_COLORS } from '@/constants/expColors';
import BtnPrev from './BtnPrev';
import BtnNext from './BtnNext';
import { TimelineExp } from '@/apis/dashboard';

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
  experiences: TimelineExp[];
  width?: number | string;
  height?: number;
  minDate?: Date;
  maxDate?: Date;
}

export default function Timeline({
  experiences = [],
  width = '100%',
  height = 170,
  minDate = new Date('2025-03-01'),
  maxDate = new Date('2025-06-30'),
}: TimelineProps) {
  //날짜 문자열을 Date 객체로 변환하는 함수
  const parseISO = (dateStr: string): Date => new Date(dateStr);

  //두 날짜 사이의 일수 차이를 계산하는 함수
  const differenceInDays = (date1: Date, date2: Date): number =>
    Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

  const containerRef = useRef<HTMLDivElement>(null);
  const numericWidth = useResponsiveWidth(containerRef, width, 500);

  //string 타입의 경험 데이터를 Date 객체로 변환하고 정렬
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

  //경험 데이터의 기간이 겹칠 경우 다른 row로 분리
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

  //최소 날짜와 최대 날짜 사이의 총 일수 계산
  const { totalDays } = useMemo<{ totalDays: number }>(() => {
    const days = differenceInDays(maxDate, minDate) || 1;

    return {
      totalDays: days,
    };
  }, [maxDate, minDate]);

  //row 간 간격
  const gap = 10;

  //최소 날짜부터 최대 날짜까지의 월 레이블을 생성
  //예: ["1월", "2월", "3월", ...]
  const monthLabels = useMemo(() => {
    const labels: string[] = [];
    const dt = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (dt <= maxDate) {
      labels.push(`${dt.getMonth() + 1}월`);
      dt.setMonth(dt.getMonth() + 1);
    }
    return labels;
  }, [minDate, maxDate]);

  return (
    <div className="flex flex-col">
      <div className="mb-3">2025</div>
      <div className="flex items-center mb-3 gap-2">
        {/* 월 */}
        <BtnPrev movePrev={() => {}} />
        <div className="flex-1 flex gap-2" ref={containerRef}>
          {monthLabels.map(label => (
            <div
              key={label}
              className="flex-1 min-w-0 py-2 flex items-center justify-center bg-gray-700 rounded-lg body-12-m"
            >
              {label}
            </div>
          ))}
        </div>
        <BtnNext moveNext={() => {}} />
      </div>

      {/* Timeline SVG */}
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

            //기간이 짧을 때 텍스트 미표시
            if (x2 - x1 < 40)
              return (
                <g key={idx}>
                  <rect
                    x={x1}
                    y={y}
                    width={3}
                    height={h}
                    rx={2}
                    fill={EXP_COLORS[exp.experienceType] || '#666'}
                  />
                  <rect
                    x={x1}
                    y={y}
                    width={Math.max(x2 - x1, 1)}
                    height={h}
                    rx={4}
                    fill={EXP_COLORS[exp.experienceType] || '#666'}
                    fillOpacity={0.2}
                  />
                </g>
              );
            return (
              <g key={idx}>
                <rect
                  x={x1}
                  y={y}
                  width={3}
                  height={h}
                  rx={2}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                />
                <rect
                  x={x1}
                  y={y}
                  width={Math.max(x2 - x1, 1)}
                  height={h}
                  rx={4}
                  fill={EXP_COLORS[exp.experienceType] || '#666'}
                  fillOpacity={0.2}
                />
                <text
                  x={x1 + 15}
                  y={y + h / 2 + 6}
                  fontSize={14}
                  fontWeight={400}
                  fill="#fff"
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
