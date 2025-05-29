import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import ChartContainer from './components/ChartContainer';
import { getJobRatio, getExpHistory } from '@/apis/dashboard';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import Footer from '@/app/components/Footer';

export default async function DashboardPage() {
  const jobRatio = await getJobRatio();
  const expHistory = await getExpHistory(
    new Date().getFullYear(),
    new Date().getMonth() + 1
  );

  return (
    <div className="min-h-screen py-6 px-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[1] bg-gray-800 rounded-[23px]">
            <ProfileCard />
          </div>
          {jobRatio?.data ? (
            <div className="flex-[7]">
              <ChartContainer jobRatio={jobRatio} />
            </div>
          ) : (
            <div className="flex-[7] flex flex-wrap grow-7 gap-4 h-[319px]">
              <div className="flex-grow-38 bg-gray-800 rounded-[23px] py-8 px-10 flex flex-col">
                <div className="flex mb-3">
                  <span className="  mr-2">직무 비율</span>
                  <HelpIcon className="stroke-gray-600" />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  경험 정보를 추가해주세요.
                </div>
              </div>
              <div className="flex-grow-47 bg-gray-800 rounded-[23px] py-8 px-10 flex flex-col">
                <div className="flex mb-3">
                  <span className="body-16-sb mr-2">핵심 스킬맵</span>
                  <HelpIcon className="stroke-gray-600" />
                </div>
                <div className="flex flex-1 items-center justify-center">
                  경험 정보를 추가해주세요.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[2] bg-gray-800 rounded-[23px] py-8 px-10">
            <ExpTimeLine />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] py-8 px-10">
            <ExpHistory expHistory={expHistory} />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] py-8 px-10">
            <Scrap />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
