'use client';

import { useState } from 'react';
import { ExpStatus, ExpType } from '@/types/exp';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';
import DropdownMenu from './DropdownMenu';
import ExpVariety from './ExpVariety';
import { useRouter } from 'next/navigation';
import ClockIcon from '@/public/icons/Clock.svg';

interface ExpCardProps {
  id: number;
  title: string;
  type: ExpType;
  draftTime?: string;
  status: ExpStatus;
  subTitles: string[];
  keywords: string[];
  onDelete: (id: number) => void;
}

export default function ExpCard({
  id,
  title,
  type,
  draftTime,
  status,
  subTitles,
  onDelete,
}: ExpCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isTemp = status === 'DRAFT';
  const router = useRouter();

  const handleClick = () => {
    router.push(`/exp/${id}`);
  };

  const formattedDraftTime = draftTime
    ? (() => {
        const date = new Date(draftTime);
        const today = new Date();
        const isToday =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();

        if (isToday) {
          return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
        } else {
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          return `${yyyy}-${mm}-${dd}`;
        }
      })()
    : null;

  return (
    <div
      className="relative min-w-[260px] h-[224px] border 
          bg-gray-800 border-gray-50-10
       rounded-[14px] flex flex-col justify-between py-[20px] px-[23px]"
    >
      <div onClick={handleClick} className="flex flex-col cursor-pointer">
        <ExpVariety type={type} />
        <div className="body-16-sb text-gray-50 mt-[15px] mb-[5px]">
          {title}
        </div>
        <ol className="flex flex-col gap-1.5 list-disc ml-4">
          {subTitles
            .filter(subTitle => subTitle)
            .map((subTitle, index) => (
              <li key={index} className="body-9-r text-gray-300">
                {subTitle}
              </li>
            ))}
        </ol>
      </div>
      <div className="flex flex-row justify-between items-center relative">
        {isTemp && draftTime && (
          <div className="flex gap-1.5 items-center body-14-m text-gray-300 whitespace-nowrap">
            <ClockIcon />
            <span>{formattedDraftTime}</span>
            <span>임시저장</span>
          </div>
        )}
        <button
          className="flex w-full justify-end cursor-pointer"
          onClick={() => setIsDropdownOpen(prev => !prev)}
        >
          <MoreVerticalIcon className=" stroke-gray-50 " />
        </button>
        {isDropdownOpen && (
          <DropdownMenu
            id={id}
            onClose={() => setIsDropdownOpen(false)}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}
