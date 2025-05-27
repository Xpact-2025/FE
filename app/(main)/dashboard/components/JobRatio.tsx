'use client';

import { Pie, PieChart, Cell, Label } from 'recharts';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { JobRatioType } from '@/apis/dashboard';

export default function JobRatio({
  jobRatioData,
}: {
  jobRatioData: JobRatioType[];
}) {
  const data = jobRatioData;

  if (data.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        아직 직무 경험이 없어요.
      </div>
    );
  }

  return (
    <>
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">직무 비율</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <div className="flex flex-row items-center justify-center">
        {/* 차트 */}
        <PieChart width={170} height={170}>
          <Pie
            data={data}
            cx={85}
            cy={85}
            innerRadius={50}
            outerRadius={70}
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
                  job={data[0]?.name ?? ''}
                  viewBox={{ cx: 109, cy: 109 }}
                />
              }
            />
          </Pie>
        </PieChart>
        {/* 범례 */}
        <div className="ml-10 flex flex-col justify-center">
          <ul>
            {data.map((item, idx) => (
              <li key={item.name} className="flex items-center mb-3 last:mb-0">
                <span
                  className="inline-block w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[idx] }}
                />
                <span className="text-gray-300 body-12-m">
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
          y={cy - 10}
          textAnchor="middle"
          style={{
            fontWeight: 400,
            fontSize: '14px',
            fill: '#A9A9A9',
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
            fontWeight: 600,
            fontSize: '18px',
            fill: '#CDCDCD',
            fontFamily: 'Pretendard',
          }}
        >
          {job}
        </tspan>
      </text>
    </>
  );
}
