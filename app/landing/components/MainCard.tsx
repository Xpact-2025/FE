'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      className={`px-[30px] py-[37px] w-[373px] h-[234px] text-left shadow-lg hover:scale-[1.02] transition rounded-[8px] outline-1 outline-white/10 border-none
        ${isHovered ? 'bg-select-gradient' : 'bg-gray-900'}`}
    >
      <h4 className="text-[30px] text-gray-200 font-bold mb-2">{title}</h4>
      <p className="text-[16px] text-gray-300 mb-[9%] line-clamp-2 whitespace-pre-line">
        {description}
      </p>
      <div className="flex justify-end">
        <Image src="/images/Vector.png" alt="user" width={36} height={36} />
      </div>
    </div>
  );
}
