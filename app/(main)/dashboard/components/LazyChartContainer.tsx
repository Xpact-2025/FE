import { getCoreSkillMap, getJobRatio } from '@/apis/dashboard';
import SkillMapContainer from './SkillMapContainer';
import JobRatioContainer from './JobRatioContainer';

export const LazyJobRatioContainer = async () => {
  const jobRatio = await getJobRatio();
  return <JobRatioContainer jobRatio={jobRatio} />;
};

export const LazySkillMapContainer = async () => {
  const skillMap = await getCoreSkillMap();
  return <SkillMapContainer skillMap={skillMap} />;
};
