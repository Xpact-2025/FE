'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
import { useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  PolarRadiusAxis,
} from 'recharts';
import DashboardHeader from './DashboardHeader';
import { DASHBOARD_INFO } from '@/constants/dashboardInfo';
import SkillMapReport from './SkillMapReport';
import { SKILLMAP_REPORT } from '@/constants/skillmapReport';

export default function SkillMap({
  skillMapData,
}: {
  skillMapData: CoreSkillMapResponse['data'];
}) {
  const { coreSkillMaps, strengthFeedback, weaknessFeedback } = skillMapData;
  const [showStrengthFeedback, setShowStrengthFeedback] = useState(false);
  const [showWeaknessFeedback, setShowWeaknessFeedback] = useState(false);

  return (
    <div className="relative pt-8 px-10">
      <DashboardHeader
        title={DASHBOARD_INFO.SKILL_MAP.title}
        info={DASHBOARD_INFO.SKILL_MAP.info}
      />
      <div className="mt-10 flex w-full h-full">
        {/* 차트 영역 */}
        <div>
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
        <div className="pl-4 flex flex-col gap-4 text-left">
          <button onClick={() => setShowStrengthFeedback(true)}>
            <div className="text-gray-300 body-10-m mb-2">강점 역량</div>
            <div className="flex items-center">
              <div className="inline-block w-3.5 h-3 border-2 border-gray-200 rounded-md mr-2" />
              <span className="text-primary body-12-m">
                {strengthFeedback.strengthName}
              </span>
            </div>
          </button>
          <button onClick={() => setShowWeaknessFeedback(true)}>
            <div className="text-gray-300 body-10-m mb-2">보완 필요 역량</div>
            <div className="flex items-center">
              <div className="inline-block w-3.5 h-3 border-2 border-gray-200 rounded-md mr-2" />
              <span className="text-primary body-12-m">
                {weaknessFeedback.weaknessName}
              </span>
            </div>
          </button>
        </div>
      </div>
      {showStrengthFeedback && (
        <SkillMapReport
          feedbackType={SKILLMAP_REPORT.STRENGTH.type}
          feedbackDescription={SKILLMAP_REPORT.STRENGTH.description}
          feedbackName={strengthFeedback.strengthName}
          suggestion={strengthFeedback.careerSuggestion}
          onClose={() => setShowStrengthFeedback(false)}
        />
      )}
      {showWeaknessFeedback && (
        <SkillMapReport
          feedbackType={SKILLMAP_REPORT.WEEKNESS.type}
          feedbackDescription={SKILLMAP_REPORT.WEEKNESS.description}
          feedbackName={weaknessFeedback.weaknessName}
          suggestion={weaknessFeedback.improvementSuggestion}
          onClose={() => setShowWeaknessFeedback(false)}
        />
      )}
    </div>
  );
}
