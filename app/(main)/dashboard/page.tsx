import { getTest } from '@/apis/test';
import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import ChartContainer from './components/ChartContainer';

export default async function DashboardPage() {
  const test = await getTest();
  console.log(test);
  return (
    <div className="min-h-screen py-6 px-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap 2xl:flex-nowrap gap-4 h-auto">
          {/* ProfileCard 컴포넌트 */}
          <div className="grow-2 bg-gray-800 rounded-[23px]">
            <ProfileCard />
          </div>

          {/* 경험 히스토리 */}
          <div className="grow-3 bg-gray-800 rounded-[23px] py-8 px-10">
            <ExpHistory />
          </div>

          {/* 스크랩 리스트 */}
          <div className="grow-4 bg-gray-800 rounded-[23px] py-8 px-10">
            <Scrap />
          </div>
        </div>

        {/* 직무 비율, 핵심 스킬 맵 */}
        <ChartContainer />

        {/* 경험 타임라인 */}
        <div className="bg-gray-800 rounded-[23px] p-4 h-[246px]">
          <ExpTimeLine />
        </div>
      </div>
    </div>
  );
}
