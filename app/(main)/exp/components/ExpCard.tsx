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
  status: ExpStatus;
}

export default function ExpCard({ id, title, type, status }: ExpCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isTemp = status === 'DRAFT';
  const router = useRouter();

  const handleClick = () => {
    router.push(`/exp/${id}`);
  };

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
        {isTemp && (
          <div className="flex gap-1.5 items-center body-14-m text-gray-300 whitespace-nowrap">
            <ClockIcon />
            임시저장
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
