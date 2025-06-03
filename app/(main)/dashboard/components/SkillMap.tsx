'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
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

  return (
    <>
      <div className="mt-10 group flex w-full overflow-hidden relative h-[200px]">
        {/* 차트 영역 */}
        <div
          className="
            transition-all duration-500 
            transform 
            translate-x-0 
            opacity-100 
            group-hover:-translate-x-full 
            group-hover:opacity-0
            group-hover:absolute group-hover:left-0
          "
        >
          <RadarChart
            width={300}
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
        </div>

        {/* 설명 영역 */}
        <div
          className={`
            pl-4 transition-all duration-500 
            flex flex-col gap-4 
            group-hover:justify-center
            group-hover:-translate-x-full
            group-hover:absolute group-hover:left-30
          `}
        >
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
        <div
          className={`
            w-2/3 transition-all duration-500
            flex-col gap-4
            hidden group-hover:block
            group-hover:justify-right
            group-hover:absolute group-hover:right-0
          `}
        >
          <div
            className="text-gray-500 body-11-m text-left
              hidden group-hover:block
              group-hover:text-center"
          >
            <p className="mb-2">
              강점 이유:
              <span className="text-gray-300 body-10-m">
                {strengthFeedback.reason}
              </span>
            </p>
            <p className="mb-2">
              강점 커리어 제안:
              <span className="text-gray-300 body-10-m">
                {strengthFeedback.careerSuggestion}
              </span>
            </p>
            <p className="mb-2">
              보완 필요 이유:
              <span className="text-gray-300 body-10-m">
                {weaknessFeedback.reason}
              </span>
            </p>
            <p className="mb-2">
              보완 활동 제안:
              <span className="text-gray-300 body-10-m">
                {weaknessFeedback.improvementSuggestion}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
