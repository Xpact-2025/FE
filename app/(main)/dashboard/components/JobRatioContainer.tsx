'use client';

import { JobRatioResponse } from '@/apis/dashboard';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import dynamic from 'next/dynamic';
const JobRatio = dynamic(() => import('./JobRatio'), {
  ssr: false,
});

export default function JobRatioContainer({
  jobRatio,
}: {
  jobRatio: JobRatioResponse | null;
}) {
  return (
    <div className="flex-[38] bg-gray-800 rounded-[23px] py-8 px-10 h-[270px] flex flex-col">
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">직무 비율</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <div className="flex flex-1 items-center justify-center w-full">
        {jobRatio?.data ? (
          <JobRatio jobRatioData={jobRatio?.data} />
        ) : (
          jobRatio?.message || '경험 정보를 추가해주세요.'
        )}
      </div>
    </div>
  );
}
