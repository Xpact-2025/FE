'use client';

import { CoreSkillMapResponse } from '@/apis/dashboard';
import dynamic from 'next/dynamic';
const SkillMap = dynamic(() => import('./SkillMap'), {
  ssr: false,
});

export default function SkillMapContainer({
  skillMap,
}: {
  skillMap: CoreSkillMapResponse;
}) {
  return (
    <div className="flex flex-1 items-center justify-center w-full">
      {skillMap?.data ? (
        <SkillMap skillMapData={skillMap?.data} />
      ) : (
        '경험 정보를 추가해주세요.'
      )}
    </div>
  );
}
