'use client';

import { Pie, PieChart, Cell } from 'recharts';
import HelpIcon from '@/public/icons/Circle_Help.svg';

const data = [
  { name: '기획', value: 40 },
  { name: '마케팅', value: 25 },
  { name: 'UX', value: 20 },
  { name: '개발', value: 10 },
];
const COLORS = ['#FF6D01', '#CDCDCD', '#999999', '#757575'];

export default function JobRatio() {
  return (
    <>
      <div className="flex mb-6">
        <span className="body-23-b mr-2">직무 비율</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <PieChart width={300} height={200}>
        <Pie
          data={data}
          cx={90}
          cy={100}
          innerRadius={60}
          outerRadius={90}
          fill="#FF6D01"
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
}
