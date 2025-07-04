'use client';

import Timeline from '@/app/components/commons/Timeline';
import {
  ExpTimelineResponse,
  getExpTimeline,
  TimelineExp,
} from '@/apis/dashboard';
import BtnNext from '@/app/components/commons/BtnNext';
import BtnPrev from '@/app/components/commons/BtnPrev';
import { useMemo, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import { DASHBOARD_INFO } from '@/constants/dashboardInfo';

export default function ExpTimeLine({
  start,
  end,
  expTimeline,
}: {
  start: Date;
  end: Date;
  expTimeline: ExpTimelineResponse;
}) {
  const [minDate, setMinDate] = useState(start);
  const [maxDate, setMaxDate] = useState(end);
  const [experiences, setExperiences] = useState<TimelineExp[]>(
    expTimeline.data
  );

  const monthLabels = useMemo(() => {
    const labels: string[] = [];
    const dt = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    while (dt < maxDate) {
      labels.push(`${dt.getMonth() + 1}월`);
      dt.setMonth(dt.getMonth() + 1);
    }
    return labels;
  }, [minDate, maxDate]);

  // 1달 이전으로 이동
  const handlePrev = () => {
    const newMin = new Date(minDate);
    newMin.setMonth(minDate.getMonth() - 1);
    const newMax = new Date(maxDate);
    newMax.setMonth(maxDate.getMonth() - 1);
    setMinDate(newMin);
    setMaxDate(newMax);

    async function fetchTimelineExp() {
      try {
        const response = await getExpTimeline(
          newMin.toISOString().split('T')[0],
          newMax.toISOString().split('T')[0]
        );
        const timeline = response.data;
        console.log('경험 타임라인:', timeline);

        if (!Array.isArray(timeline) || timeline.length === 0) {
          return;
        }

        setExperiences(prev => {
          // 중복을 제거한 새로운 경험만 필터링
          const newItems = timeline.filter(
            newItem =>
              !prev.some(
                prevItem =>
                  prevItem.startDate === newItem.startDate &&
                  prevItem.endDate === newItem.endDate &&
                  prevItem.title === newItem.title &&
                  prevItem.experienceType === newItem.experienceType
              )
          );

          return [...prev, ...newItems];
        });
      } catch (error) {
        console.error('경험 타임라인 불러오기 실패:', error);
        setExperiences([]);
      }
    }

    fetchTimelineExp();
  };

  // 1달 이후로 이동
  const handleNext = () => {
    const newMin = new Date(minDate);
    newMin.setMonth(minDate.getMonth() + 1);
    const newMax = new Date(maxDate);
    newMax.setMonth(maxDate.getMonth() + 1);
    setMinDate(newMin);
    setMaxDate(newMax);
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <DashboardHeader
          title={DASHBOARD_INFO.EXP_TIMELINE.title}
          info={DASHBOARD_INFO.EXP_TIMELINE.info}
        />
        <div className="mb-3 body-14-m text-gray-400">
          {maxDate.getFullYear()}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-3 gap-2">
          <BtnPrev movePrev={handlePrev} />
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {monthLabels.map(label => (
              <div
                key={label}
                className="flex-1 min-w-0 py-2 flex items-center justify-center bg-gray-700 rounded-lg body-12-m"
              >
                {label}
              </div>
            ))}
          </div>
          <BtnNext moveNext={handleNext} />
        </div>
      </div>
      <Timeline minDate={minDate} maxDate={maxDate} exps={experiences} />
    </>
  );
}
