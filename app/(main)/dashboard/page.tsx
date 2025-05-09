import { getTest } from '@/apis/test';
import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import SkillMap from './components/SkillMap';
import JobRatio from './components/JobRatio';

export default async function DashboardPage() {
  const test = await getTest();
  console.log(test);
  return (
    <div className="min-h-screen p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap lg:flex-nowrap gap-4 h-auto">
          {/* ProfileCard 컴포넌트 */}
          <div className="w-full min-w-[255px] lg:w-[255px] bg-gray-800 rounded-[23px]">
            <ProfileCard />
          </div>

          {/* 경험 히스토리 */}
          <div className="w-full min-w-[345px] lg:w-[345px] bg-gray-800 rounded-[23px] p-4">
            <ExpHistory />
          </div>

          {/* 스크랩 리스트 */}
          <div className="w-full flex-grow bg-gray-800 rounded-[23px] p-4">
            <Scrap />
          </div>
        </div>

        {/* 직무 비율, 핵심 스킬 맵맵 */}
        <div className="flex flex-wrap gap-4 h-[319px]">
          <div className="flex-grow bg-gray-800 rounded-[23px] p-4">
            <JobRatio />
          </div>
          <div className="flex-grow-2 bg-gray-800 rounded-[23px] p-4">
            <SkillMap />
          </div>
        </div>

        {/* 경험 타임라인 */}
        <div className="bg-gray-800 rounded-[23px] p-4 h-[246px]">
          <ExpTimeLine />
        </div>
      </div>
    </div>
  );
}
