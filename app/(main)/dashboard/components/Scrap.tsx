import { DASHBOARD_INFO } from '@/constants/dashboardInfo';
import DashboardHeader from './DashboardHeader';

const scrapItems = [
  {
    title: '현대자동차 서비스 디자인 공모전',
    dday: 1,
  },
  {
    title: '창의 혁신 데이터 분석 공모전',
    dday: 3,
  },
  {
    title: '[카카오뱅크] 결제 서비스 기획 인턴',
    dday: 8,
  },
  {
    title: '[토스] Sales Mandgement 인턴',
    dday: 11,
  },
];

function ScrapCard({ title, dday }: { title: string; dday: number }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-50-20 py-[10px] gap-1">
      <div className="body-12-m text-gray-50 whitespace-pre-line">{title}</div>
      <div
        className={`body-14-m whitespace-nowrap ${dday <= 7 ? 'text-gray-50' : 'text-gray-500'}`}
      >
        D-{dday}
      </div>
    </div>
  );
}

export default function Scrap() {
  return (
    <>
      <DashboardHeader
        title={DASHBOARD_INFO.SCRAP.title}
        info={DASHBOARD_INFO.SCRAP.info}
      />
      <div className="flex flex-col gap-3">
        {scrapItems.map((item, idx) => (
          <ScrapCard key={idx} title={item.title} dday={item.dday} />
        ))}
      </div>
    </>
  );
}
