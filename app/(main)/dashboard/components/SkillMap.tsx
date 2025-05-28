'use client';

import HelpIcon from '@/public/icons/Circle_Help.svg';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from 'recharts';

const data = [
  { skill: '사용자 중심 사고', score: 90, fullMark: 100 },
  { skill: '콘텐츠 기획력', score: 70, fullMark: 100 },
  { skill: '데이터 분석', score: 80, fullMark: 100 },
  { skill: '문제 해결력', score: 40, fullMark: 100 },
  { skill: '커뮤니케이션', score: 70, fullMark: 100 },
];

export default function SkillMap() {
  return (
    <>
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">핵심 스킬 맵</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <div className="flex flex-row items-center justify-center py-4">
        {/* 레이더 차트 */}
        <RadarChart
          width={350}
          height={150}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={data}
        >
          <PolarGrid stroke="#444" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: '#CDCDCD', fontSize: 13 }}
          />
          <PolarRadiusAxis axisLine={false} tick={false} stroke="#444" />
          <Radar
            name="역량"
            dataKey="score"
            stroke="#FF6D01"
            fill="#FF6D01"
            fillOpacity={0.2}
          />
        </RadarChart>
        {/* 설명 */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <div className="text-gray-300 body-10-m mb-2">강점 역량</div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 border-2 border-gray-200 rounded-2xl mr-2" />
              <span className="text-primary body-12-m">사용자 중심 사고</span>
            </div>
          </div>
          <div>
            <div className="text-gray-300 body-10-m mb-2">보완 필요 역량</div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 border-2 border-gray-200 rounded-2xl mr-2" />
              <span className="text-primary body-12-m">문제 해결력</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
