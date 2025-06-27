'use client';

import { useState } from 'react';
import HelpIcon from '@/public/icons/Circle_Help.svg';

export default function DashboardHeader({
  title,
  info,
}: {
  title: string;
  info: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center mb-3">
      <span className="body-16-sb mr-2">{title}</span>

      <div
        className="relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />

        {isHovered && (
          <div className="absolute top-full z-10 mt-3 w-max">
            <div className="relative rounded-[16px] -translate-x-1/5 bg-gray-200 px-[22px] py-[12px] body-14-m text-gray-700 whitespace-pre-line">
              {info}
            </div>
            <div className="absolute -top-[6px] left-[6px] w-3 h-3 rotate-45 bg-gray-200"></div>
          </div>
        )}
      </div>
    </div>
  );
}
