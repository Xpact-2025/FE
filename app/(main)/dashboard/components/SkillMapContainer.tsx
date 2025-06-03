'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import dynamic from 'next/dynamic';
const SkillMap = dynamic(() => import('./SkillMap'), {
  ssr: false,
});

export default function SkillMapContainer({
  skillMap,
}: {
  skillMap: CoreSkillMapResponse | null;
}) {
  const skillMapData = skillMap?.data;

  return (
    <div className="flex-[47] bg-gray-800 rounded-[23px] py-8 px-10 h-[270px] flex flex-col">
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">핵심 스킬맵</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        {skillMapData ? (
          <SkillMap skillMapData={skillMapData} />
        ) : (
          '경험 정보를 추가해주세요.'
        )}
      </div>
    </div>
  );
}
