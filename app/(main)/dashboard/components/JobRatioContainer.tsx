'use client';

import { JobRatioResponse } from '@/apis/dashboard';
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
    <div className="flex flex-1 items-center justify-center w-full">
      {jobRatio?.data ? (
        <JobRatio jobRatioData={jobRatio?.data} />
      ) : (
        jobRatio?.message || '경험 정보를 추가해주세요.'
      )}
    </div>
  );
}
