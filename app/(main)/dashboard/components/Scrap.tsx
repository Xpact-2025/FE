'use client';

import { DASHBOARD_INFO } from '@/constants/dashboardInfo';
import DashboardHeader from './DashboardHeader';
import { useState, useEffect } from 'react';
import { ScrapActivity, getScrapActivities } from '@/apis/scrap';

function ScrapCard({ title, dday }: { title: string; dday: string | null }) {
  const numericDday = Number(dday);
  const isNumber = !isNaN(numericDday);

  return (
    <div className="flex justify-between items-center border-b border-gray-50-20 py-[10px] gap-1.5">
      <div className="text-[13px] text-gray-50 truncate max-w-55">{title}</div>
      <div
        className={`body-14-m whitespace-nowrap ${isNumber && numericDday >= -7 ? 'text-gray-50' : 'text-gray-500'}`}
      >
        {isNumber
          ? numericDday >= 0
            ? '마감'
            : `D${numericDday}`
          : dday || '없음'}
      </div>
    </div>
  );
}

export default function Scrap() {
  const [scrapItems, setScrapItems] = useState<ScrapActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScraps() {
      setLoading(true);
      const res = await getScrapActivities();
      if (res.httpStatus === 200) {
        setScrapItems(res.data);
      } else {
        setScrapItems([]);
      }
      setLoading(false);
    }

    fetchScraps();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <DashboardHeader
        title={DASHBOARD_INFO.SCRAP.title}
        info={DASHBOARD_INFO.SCRAP.info}
      />
      <div className="flex flex-col gap-3">
        {scrapItems.length > 0 ? (
          scrapItems.map((item, idx) => (
            <ScrapCard key={idx} title={item.title} dday={item.dday} />
          ))
        ) : (
          <div className="body-14-m text-gray-500 py-4">
            스크랩한 활동이 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
