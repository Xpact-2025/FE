import HelpIcon from '@/public/icons/Circle_Help.svg';
import Timeline from '@/app/components/commons/Timeline';

interface Experience {
  startDate: string;
  endDate: string;
  title: string;
  experienceType: string;
}

const sampleExperiences: Experience[] = [
  {
    startDate: '2025-03-27',
    endDate: '2025-05-29',
    title: '프로젝트3',
    experienceType: 'PROJECT',
  },
  {
    startDate: '2025-04-01',
    endDate: '2025-06-29',
    title: '인턴',
    experienceType: 'INTERN',
  },
  {
    startDate: '2025-06-11',
    endDate: '2025-06-12',
    title: 'dd공모전',
    experienceType: 'CONTEST',
  },
];

export default function ExpTimeLine() {
  return (
    <>
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">경험 타임 라인</span>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px]" />
      </div>
      <Timeline experiences={sampleExperiences} />
    </>
  );
}
