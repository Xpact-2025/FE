import ProfileCard from './components/ProfileCard';
import ExpHistory from './components/ExpHistory';
import Scrap from './components/Scrap';
import ExpTimeLine from './components/ExpTimeLine';
import { getExpHistory, getExpTimeline } from '@/apis/dashboard';
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

  function getStartAndEndLines(): {
    start: Date;
    end: Date;
    startLine: string;
    endLine: string;
  } {
    const now = new Date();

    // endLine: 이번 달의 마지막 날
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // startLine: 두 달 전의 첫째 날
    const start = new Date(now.getFullYear(), now.getMonth() - 3, 2);

    const toString = (date: Date) => date.toISOString().split('T')[0]; // yyyy-mm-dd 형식

    return {
      start: start,
      end: end,
      startLine: toString(start),
      endLine: toString(end),
    };
  }

  const { start, end, startLine, endLine } = getStartAndEndLines();
  const expTimeline = await getExpTimeline(startLine, endLine);

  return (
    <div className="min-h-screen py-6 px-14">
      <div className="flex flex-col gap-4">
        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[1] bg-gray-800 rounded-[23px]">
            <ProfileCard profileInfo={profileInfo.data} />
          </div>
          <div className="flex-[7]">
            <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
              <SkeletonBox title="직무 비율" />
              {/* <Suspense fallback={<SkeletonBox title="직무 비율" />}>
                <LazyJobRatioContainer />
              </Suspense> */}
              <SkeletonBox title="핵심 스킬맵" />
              {/* <Suspense fallback={<SkeletonBox title="핵심 스킬맵" />}>
                <LazySkillMapContainer />
              </Suspense> */}
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-wrap lg:flex-nowrap gap-4 h-auto">
          <div className="flex-[2.5] bg-gray-800 rounded-[23px] pt-8 pb-4 px-8">
            <ExpTimeLine start={start} end={end} expTimeline={expTimeline} />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] pt-8 pb-4 px-8">
            <ExpHistory expHistory={expHistory} />
          </div>
          <div className="flex-[1] bg-gray-800 rounded-[23px] pt-8 pb-4 px-8">
            <Scrap />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
