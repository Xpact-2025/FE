'use client';

import { useEffect, useRef } from 'react';
import TrashFullIcon from '@/public/icons/Trash_Full.svg';
import EditPencilIcon from '@/public/icons/Edit_Pencil_02.svg';
import { useRouter } from 'next/navigation';
import { deleteExperience } from '@/apis/exp';

interface DropdownMenuProps {
  id: number;
  onClose: () => void;
}

export default function DropdownMenu({ id, onClose }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;
    try {
      await deleteExperience(id);
      alert('삭제되었습니다.');
      router.refresh();
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-[-140px] top-[-10px] z-10 w-[132px] bg-gray-200 border rounded-md shadow-md py-2 text-gray-1000"
    >
      <button className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2">
        <EditPencilIcon className="stroke-gray-1000" />
        수정
      </button>
      <button
        onClick={handleDelete}
        className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2"
      >
        <TrashFullIcon className="stroke-gray-1000" />
        삭제
      </button>
    </div>
  );
}
