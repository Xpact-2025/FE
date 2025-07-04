import { useState, useRef, useEffect } from 'react';
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
  const textRef = useRef<SVGTextElement | null>(null);

  const barHeight = isHovered ? h * 1.5 : h;
  const textY = y + h / 2 + 5;
  const textX = x1 < 0 && x2 > 0 ? 15 : x1 + 15;
  const barWidth = Math.max(x2 - x1, 1);
  const fillColor = EXP_COLORS[exp.experienceType] || '#666';

  const [textBBox, setTextBBox] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // 텍스트의 실제 크기 측정
  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setTextBBox({ width: bbox.width, height: bbox.height });
    }
  }, [exp.title]);

  return (
    <g
      key={idx}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 작은 세로 막대 */}
      <rect
        x={0}
        y={y}
        width={3}
        height={barHeight}
        rx={2}
        fill={fillColor}
        transform={`translate(${x1}, 0)`}
        style={{ transition: 'transform 0.3s ease' }}
      />

      {/* 길이 막대 */}
      <rect
        x={0}
        y={y}
        width={barWidth}
        height={barHeight}
        rx={4}
        fill={fillColor}
        fillOpacity={0.2}
        transform={`translate(${x1}, 0)`}
        style={{ transition: 'transform 0.3s ease' }}
      />

      {/* 텍스트 */}
      <text
        ref={textRef}
        x={0}
        y={textY}
        fontSize={14}
        fontWeight={400}
        fill="#fff"
        transform={`translate(${textX}, 0)`}
        style={{ transition: 'transform 0.3s ease' }}
      >
        {exp.title}
      </text>

      {/* 바 이후 영역을 덮는 반투명 회색 박스 */}
      <rect
        x={0}
        y={textY - textBBox.height + 3}
        width={15 + textBBox.width}
        height={textBBox.height + 2}
        fill="#212121"
        transform={`translate(${x1 + barWidth}, 0)`}
        style={{ transition: 'transform 0.3s ease' }}
        fillOpacity={0.3}
      />

      {/* 날짜 */}
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
