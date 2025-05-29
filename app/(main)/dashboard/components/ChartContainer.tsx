'use client';

import dynamic from 'next/dynamic';
const JobRatio = dynamic(() => import('./JobRatio'), { ssr: false });
const SkillMap = dynamic(() => import('./SkillMap'), { ssr: false });
import { JobRatioResponse } from '@/apis/dashboard';

export default function ChartContainer({
  jobRatio,
}: {
  jobRatio: JobRatioResponse;
}) {
  const jobRatioData = jobRatio.data;

  return (
    <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
      <div className="flex-[38] bg-gray-800 rounded-[23px] py-8 px-10 h-[270px]">
        <JobRatio jobRatioData={jobRatioData} />
      </div>
      <div className="flex-[47] bg-gray-800 rounded-[23px] py-8 px-10 h-[270px]">
        <SkillMap />
      </div>
    </div>
  );
}
