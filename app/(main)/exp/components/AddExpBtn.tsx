'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import EditPencilIcon from '@/public/icons/Edit_Pencil_01.svg';

export default function AddExpBtn() {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className="relative w-52 h-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={clsx(
          'absolute flex items-center px-[29px] top-0 right-0 h-20 rounded-[40px] bg-white/30 text-gray-50 body-20-sb backdrop-blur-md transition-all duration-300 z-10 overflow-hidden',
          hovered ? 'w-52 opacity-100' : 'w-0 opacity-0'
        )}
      >
        경험 추가
      </div>
      <div
        className="absolute flex items-center justify-center top-0 right-0 w-20 h-20 bg-primary-50 rounded-full z-20"
        onClick={() => {
          router.push('/addExp');
        }}
      >
        <EditPencilIcon className="stroke-gray-1100 w-[30px] h-[30px]" />
      </div>
    </div>
  );
}
