import { ExperienceType } from '@/types/exp';
import ExpType from './ExperienceType';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';

interface ExperienceCardProps {
  title: string;
  type: ExperienceType;
  isTemp?: boolean;
}

export default function ExpeienceCard({
  title,
  type,
  isTemp,
}: ExperienceCardProps) {
  return (
    <div
      className={`w-[322px] h-[224px] border bg-linear-125 ${isTemp ? 'from-gray-800 to-gray-900 border-gray-600' : 'from-gray-600 to-gray-700 border-gray-50-20'} rounded-[14px] flex flex-col justify-between p-[28px]`}
    >
      <div className="flex flex-col gap-[26px]">
        <div
          className={`body-20-r break-keep ${isTemp ? 'text-gray-600' : 'text-white'}`}
        >
          {title}
        </div>
        <ExpType type={type} />
      </div>
      <div className="flex flex-row justify-end items-center">
        {isTemp && (
          <div className="body-14-sb text-primary px-[18px] py-[14px]">
            임시저장
          </div>
        )}
        <button className="w-[24px] h-[24px]">
          <MoreVerticalIcon className="stroke-gray-50" size={24} />
        </button>
      </div>
    </div>
  );
}
