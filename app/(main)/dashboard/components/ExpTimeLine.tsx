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
    startDate: '2025-03-01',
    endDate: '2025-06-30',
    title: '인턴십 A',
    experienceType: 'INTERN',
  },
  {
    startDate: '2025-03-01',
    endDate: '2025-03-10',
    title: '인턴십 B',
    experienceType: 'INTERN',
  },
  {
    startDate: '2025-03-15',
    endDate: '2025-06-20',
    title: '잇타 동아리 활동',
    experienceType: 'PROJECT',
  },
  {
    startDate: '2025-03-30',
    endDate: '2025-06-22',
    title: '잇타 동아리 활동2',
    experienceType: 'PROJECT',
  },
  {
    startDate: '2025-06-24',
    endDate: '2025-06-24',
    title: '공모전',
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
      <Timeline width={380} experiences={sampleExperiences} />
    </>
  );
}
