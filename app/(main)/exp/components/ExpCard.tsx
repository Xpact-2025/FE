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
  keywords: string[];
}

export default function ExpCard({
  id,
  title,
  type,
  draftTime,
  status,
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
          // 연-월-일 포맷
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          return `${yyyy}-${mm}-${dd}`;
        }
      })()
    : null;

  return (
    <div
      className="relative w-[322px] h-[224px] border 
          bg-exp-gradient-un-s border-gray-700
       rounded-[14px] flex flex-col justify-between p-[16px]"
    >
      <div
        onClick={handleClick}
        className="flex flex-col gap-[15px] cursor-pointer"
      >
        <ExpVariety type={type} />
        <div className="body-20-r text-gray-50">{title}</div>
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
          <DropdownMenu id={id} onClose={() => setIsDropdownOpen(false)} />
        )}
      </div>
    </div>
  );
}
