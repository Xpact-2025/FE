import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import ChartContainer from './components/ChartContainer';
import { getJobRatio, getExpHistory } from '@/apis/dashboard';

export default async function DashboardPage() {
  const jobRatio = await getJobRatio();
  const expHistory = await getExpHistory(
    new Date().getFullYear(),
    new Date().getMonth() + 1
  );
  console.log(new Date().getMonth());

  return (
    <div className="min-h-screen py-6 px-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap 2xl:flex-nowrap gap-4 h-auto">
          <div className="grow-2 bg-gray-800 rounded-[23px]">
            <ProfileCard />
          </div>
          <div className="grow-3 bg-gray-800 rounded-[23px] py-8 px-10">
            <ExpHistory expHistory={expHistory} />
          </div>
          <div className="grow-4 bg-gray-800 rounded-[23px] py-8 px-10">
            <Scrap />
          </div>
        </div>

        {/*null 체크 후 렌더링 */}
        {jobRatio?.data?.ratios ? (
          <ChartContainer jobRatio={jobRatio} />
        ) : (
          <div className="text-gray-400 text-sm px-4 py-6 bg-gray-800 rounded-[23px] text-center">
            경험 정보가 없어 직무 비율을 표시할 수 없습니다.
          </div>
        )}

        <div className="bg-gray-800 rounded-[23px] py-8 px-10">
          <ExpTimeLine />
        </div>
      </div>
    </div>
  );
}
