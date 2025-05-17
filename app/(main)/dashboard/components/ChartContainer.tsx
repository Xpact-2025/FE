'use client';

import dynamic from 'next/dynamic';
const JobRatio = dynamic(() => import('./JobRatio'), { ssr: false });
const SkillMap = dynamic(() => import('./SkillMap'), { ssr: false });

export default function ChartContainer() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-grow-4 bg-gray-800 rounded-[23px] py-8 px-10 h-[319px]">
        <JobRatio />
      </div>
      <div className="flex-grow-6 bg-gray-800 rounded-[23px] py-8 px-10">
        <SkillMap />
      </div>
    </div>
  );
}
