'use client';

import { useState } from 'react';
import { ExperienceType } from '@/types/exp';
import ExpType from './ExperienceType';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';
import DropdownMenu from './DropdownMenu';

interface ExperienceCardProps {
  id: number;
  title: string;
  type: ExperienceType;
  isTemp?: boolean;
}

export default function ExperienceCard({
  id,
  title,
  type,
  isTemp,
}: ExperienceCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`relative w-[322px] h-[224px] border bg-linear-125 ${
        isTemp
          ? 'from-gray-800 to-gray-900 border-gray-600'
          : 'from-gray-600 to-gray-700 border-gray-50-20'
      } rounded-[14px] flex flex-col justify-between p-[28px]`}
    >
      <div className="flex flex-col gap-[26px]">
        <div
          className={`body-20-r break-keep ${
            isTemp ? 'text-gray-600' : 'text-gray-50'
          }`}
        >
          {title}
        </div>
        <ExpType type={type} />
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
