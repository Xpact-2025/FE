'use client';

import { Pie, PieChart, Cell, Label } from 'recharts';
import HelpIcon from '@/public/icons/Circle_Help.svg';

const data = [
  { name: '서비스 기획', value: 40 },
  { name: '마케팅', value: 25 },
  { name: 'UX', value: 20 },
  { name: '개발', value: 10 },
];

const COLORS = ['#FF6D01', '#CDCDCD', '#999999', '#757575'];

function CustomLabel({
  viewBox,
  job = '',
}: {
  viewBox: { cx: number; cy: number };
  job?: string;
}) {
  const { cx, cy } = viewBox;
  return (
    <>
      <text>
        <tspan
          x={cx}
          y={cy}
          textAnchor="middle"
          style={{
            fontWeight: 700,
            fontSize: '23px',
            fill: '#CDCDCD',
            fontFamily: 'Pretendard',
          }}
        >
          주요 직무
        </tspan>
        <tspan
          x={cx}
          y={cy + 20}
          textAnchor="middle"
          style={{
            fontWeight: 500,
            fontSize: '14px',
            fill: '#A9A9A9',
            fontFamily: 'Pretendard',
          }}
        >
          {job}
        </tspan>
      </text>
    </>
  );
}

export default function JobRatio() {
  return (
    <>
      <div className="flex mb-3">
        <span className="body-23-b mr-2">직무 비율</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <div className="flex flex-row items-center justify-center">
        <PieChart width={218} height={218}>
          <Pie
            data={data}
            cx={109}
            cy={109}
            innerRadius={70}
            outerRadius={100}
            fill="#FF6D01"
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              position="center"
              content={
                <CustomLabel
                  job={data[0].name}
                  viewBox={{
                    cx: 109,
                    cy: 109,
                  }}
                />
              }
            />
          </Pie>
        </PieChart>
        {/* 오른쪽: 범례 */}
        <div className="ml-10 flex flex-col justify-center">
          <ul>
            {data.map((item, idx) => (
              <li key={item.name} className="flex items-center mb-3 last:mb-0">
                <span
                  className="inline-block w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <span className="text-gray-300 body-16-r">
                  {item.name} {item.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
