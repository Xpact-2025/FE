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
  if (skillMap.data) {
    return (
      <div className="w-full h-full">
        <SkillMap skillMapData={skillMap.data} />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="py-5 px-10 flex flex-col h-full">
        <DashboardHeader
          title={DASHBOARD_INFO.SKILL_MAP.title}
          info={DASHBOARD_INFO.SKILL_MAP.info}
        />
        <div className="flex flex-1 h-full items-center justify-center text-gray-500">
          {skillMap.message ||
            '핵심 역량 맵을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.'}
        </div>
      </div>
    </div>
  );
}
