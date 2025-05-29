'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from 'recharts';

export default function SkillMap({
  skillMapData,
}: {
  skillMapData: CoreSkillMapResponse['data'];
}) {
  const { coreSkillMaps, strengthFeedback, weaknessFeedback } = skillMapData;
  console.log(
    'coreSkillMaps',
    coreSkillMaps,
    strengthFeedback,
    weaknessFeedback
  );

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
          data={coreSkillMaps}
        >
          <PolarGrid stroke="#444" />
          <PolarAngleAxis
            dataKey="coreSkillName"
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
              <span className="text-primary body-12-m">
                {strengthFeedback.strengthName}
              </span>
            </div>
          </div>
          <div>
            <div className="text-gray-300 body-10-m mb-2">보완 필요 역량</div>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 border-2 border-gray-200 rounded-2xl mr-2" />
              <span className="text-primary body-12-m">
                {weaknessFeedback.weaknessName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
