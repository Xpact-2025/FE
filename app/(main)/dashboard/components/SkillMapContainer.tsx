'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
import dynamic from 'next/dynamic';
import DashboardHeader from './DashboardHeader';
import { DASHBOARD_INFO } from '@/constants/dashboardInfo';
const SkillMap = dynamic(() => import('./SkillMap'), {
  ssr: false,
});

export default function SkillMapContainer({
  skillMap,
}: {
  skillMap: CoreSkillMapResponse;
}) {
  return (
    <div className="w-full h-full">
      {skillMap?.data ? (
        <SkillMap skillMapData={skillMap?.data} />
      ) : (
        <div className="py-8 px-10 flex flex-col h-full">
          <DashboardHeader
            title={DASHBOARD_INFO.SKILL_MAP.title}
            info={DASHBOARD_INFO.SKILL_MAP.info}
          />
          <div className="flex flex-1 h-full items-center justify-center text-gray-500">
            경험 정보를 추가해주세요.
          </div>
        </div>
      )}
    </div>
  );
}
