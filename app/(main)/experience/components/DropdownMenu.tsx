'use client';

import { useEffect, useRef } from 'react';
import TrashFullIcon from '@/public/icons/Trash_Full.svg';
import EditPencilIcon from '@/public/icons/Edit_Pencil_02.svg';

interface DropdownMenuProps {
  onClose: () => void;
}

export default function DropdownMenu({ onClose }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-[-140px] top-[-10px] z-10 w-[132px] bg-gray-200 border rounded-md shadow-md py-2 text-gray-1000"
    >
      <button className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2">
        <EditPencilIcon className="stroke-gray-1000" />
        수정
      </button>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2">
        <TrashFullIcon className="stroke-gray-1000" />
        삭제
      </button>
    </div>
  );
}
