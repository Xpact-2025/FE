'use client';

import { useState } from 'react';
import { ExpStatus, ExpType } from '@/types/exp';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';
import DropdownMenu from './DropdownMenu';
import ExpVariety from './ExpVariety';
import { useRouter } from 'next/navigation';

interface ExpCardProps {
  id: number;
  title: string;
  type: ExpType;
  startDate?: string;
  endDate?: string;
  issueDate?: string;
  status: ExpStatus;
  subTitles: string[];
  keywords: string[];
  onDelete: (id: number) => void;
}

export default function ExpCard({
  id,
  title,
  type,
  startDate,
  endDate,
  issueDate,
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

  return (
    <div
      className="relative w-[260px] h-[224px] border 
          bg-gray-800 border-gray-50-10
       rounded-[14px] flex flex-col justify-between py-[20px] px-[23px]"
    >
      <div
        className="flex flex-col cursor-pointer"
        onClick={handleClick}
        style={{ width: '220px', height: '200px' }}
      >
        <div className="flex justify-between">
          <ExpVariety type={type} />
          {isTemp && (
            <div className="flex gap-1.5 items-center text-[13px] text-gray-300 whitespace-nowrap">
              임시저장
            </div>
          )}
        </div>
        <div className="body-16-sb text-gray-50 mt-[15px] mb-[5px] truncate">
          {title}
        </div>
        <ol className="flex flex-col gap-1.5 list-disc ml-4">
          {subTitles
            .filter(subTitle => subTitle)
            .map((subTitle, index) => (
              <li key={index} className="text-[13px] text-gray-300">
                <div className="flex">
                  <span className="truncate">{subTitle}</span>
                </div>
              </li>
            ))}
        </ol>
      </div>
      <div className="flex justify-between whitespace-nowrap text-[13px] text-gray-300">
        {type === 'CERTIFICATES' || type === 'PRIZE'
          ? issueDate
          : `${startDate} - ${endDate}`}
        <div className="flex w-full justify-end">
          <MoreVerticalIcon
            className=" stroke-gray-50 cursor-pointer"
            onClick={() => setIsDropdownOpen(prev => !prev)}
          />
        </div>
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
