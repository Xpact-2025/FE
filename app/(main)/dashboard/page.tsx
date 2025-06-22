import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import { getExpHistory } from '@/apis/dashboard';
import Footer from '@/app/components/Footer';
import {
  LazyJobRatioContainer,
  LazySkillMapContainer,
} from './components/LazyChartContainer';
import SkeletonBox from './components/SkeletonBox';
import { Suspense } from 'react';
import { getProfileInfo } from '@/apis/profile';

export default async function DashboardPage() {
  const profileInfo = await getProfileInfo();
  const expHistory = await getExpHistory(
    new Date().getFullYear(),
    new Date().getMonth() + 1
  );

  return (
    <div className="min-h-screen py-6 px-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[1] bg-gray-800 rounded-[23px]">
            <ProfileCard profileInfo={profileInfo.data} />
          </div>
          <div className="flex-[7]">
            <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
              <Suspense fallback={<SkeletonBox title="직무 비율" />}>
                <LazyJobRatioContainer />
              </Suspense>
              <Suspense fallback={<SkeletonBox title="핵심 스킬맵" />}>
                <LazySkillMapContainer />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[2.5] bg-gray-800 rounded-[23px] py-8 px-8">
            <ExpTimeLine />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] py-8 px-8">
            <ExpHistory expHistory={expHistory} />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] py-8 px-8">
            <Scrap />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
