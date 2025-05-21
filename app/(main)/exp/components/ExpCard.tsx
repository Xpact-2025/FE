'use client';

import { useState } from 'react';
import { ExpType } from '@/types/exp';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';
import DropdownMenu from './DropdownMenu';
import ExpVariety from './ExpVariety';
import { useRouter } from 'next/navigation';

interface ExpCardProps {
  id: number;
  title: string;
  type: ExpType;
  isTemp?: boolean;
}

export default function ExpCard({ id, title, type, isTemp }: ExpCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/exp/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-[322px] h-[224px] border ${
        isTemp
          ? 'bg-exp-gradient-un-s border-gray-700'
          : 'bg-exp-gradient-s border-gray-50-20'
      } rounded-[14px] flex flex-col justify-between p-[28px] cursor-pointer`}
    >
      <div className="flex flex-col gap-[26px]">
        <div
          className={`body-20-r break-keep ${
            isTemp ? 'text-gray-700' : 'text-gray-50'
          }`}
        >
          {title}
        </div>
        <ExpVariety type={type} />
      </div>
      <div className="flex flex-row justify-end items-center relative">
        {isTemp && (
          <div className="body-14-sb text-primary px-[18px] py-[14px]">
            임시저장
          </div>
        )}
        <button
          className="w-[24px] h-[24px]"
          onClick={() => setIsDropdownOpen(prev => !prev)}
        >
          <MoreVerticalIcon className="stroke-gray-50" />
        </button>
        {isDropdownOpen && (
          <DropdownMenu id={id} onClose={() => setIsDropdownOpen(false)} />
        )}
      </div>
    </div>
  );
}
