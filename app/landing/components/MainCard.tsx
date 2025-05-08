'use client';

import { useState } from 'react';
import ArrowDownRightIcon from '@/public/icons/Arrow_Down_Right.svg';

interface MainCardProps {
  title: string;
  description: string;
}

export default function MainCard({ title, description }: MainCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`px-[30px] py-[37px] w-[373px] h-[234px] text-left shadow-lg hover:scale-[1.02] transition rounded-[8px] outline-1 outline-white/10 border-none`}
      style={{
        background: isHovered
          ? 'linear-gradient(180deg, #111111 0%, #341812 25.5%, #7E2614 100%)'
          : '#111',
      }}
    >
      <h4 className="text-[30px] text-gray-200 font-bold mb-2">{title}</h4>
      <p className="text-[16px] text-gray-300 mb-[9%] line-clamp-2 whitespace-pre-line">
        {description}
      </p>
      <div className="flex justify-end">
        <ArrowDownRightIcon className="stroke-gray-50" />
      </div>
    </div>
  );
}
