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
  if (x2 - x1 < 40) {
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
  }
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
}
