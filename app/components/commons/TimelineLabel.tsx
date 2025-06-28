import { useState } from 'react';
import { EXP_COLORS } from '@/constants/expColors';

type TimelineLabelProps = {
  idx: number;
  x1: number;
  x2: number;
  y: number;
  h: number;
  exp: {
    experienceType: string;
    title: string;
    startDate: string;
    endDate: string;
  };
};

export default function TimelineLabel({
  idx,
  x1,
  x2,
  y,
  h,
  exp,
}: TimelineLabelProps) {
  const [isHovered, setIsHovered] = useState(false);

  const barHeight = isHovered ? h * 1.5 : h;
  const textX = x1 < 0 && x2 > 0 ? 15 : x1 + 15;

  const fillColor = EXP_COLORS[exp.experienceType] || '#666';

  return (
    <g
      key={idx}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <rect
        x={x1}
        y={y}
        width={3}
        height={barHeight}
        rx={2}
        fill={fillColor}
        style={{
          transition: 'all 0.3s ease',
        }}
      />
      <rect
        x={x1}
        y={y}
        width={Math.max(x2 - x1, 1)}
        height={barHeight}
        rx={4}
        fill={fillColor}
        fillOpacity={0.2}
        style={{
          transition: 'all 0.3s ease',
        }}
      />
      <text
        x={0}
        y={y + h / 2 + 5}
        fontSize={14}
        fontWeight={400}
        fill="#fff"
        transform={`translate(${textX}, 0)`}
        style={{
          transition: 'transform 0.3s ease',
        }}
      >
        {exp.title}
      </text>
      <text
        x={0}
        y={y + h / 2 + 23}
        fontSize={12}
        fontWeight={400}
        fill="#fff"
        transform={`translate(${textX}, 0)`}
        style={{
          opacity: isHovered ? 0.5 : 0,
          transition: 'transform 0.3s ease',
        }}
      >
        {exp.startDate}-{exp.endDate}
      </text>
    </g>
  );
}
