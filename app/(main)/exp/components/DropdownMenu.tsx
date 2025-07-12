'use client';

import { useState, useEffect, useRef } from 'react';
import TrashFullIcon from '@/public/icons/Trash_Full.svg';
import EditPencilIcon from '@/public/icons/Edit_Pencil_02.svg';
import { useRouter } from 'next/navigation';
import Popup from '@/app/components/Popup';
import { deleteExp } from '@/apis/exp';

interface DropdownMenuProps {
  id: number;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export default function DropdownMenu({
  id,
  onClose,
  onDelete,
}: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  return (
    <div
      ref={menuRef}
      className="absolute right-[-130px] top-[180px] z-10 w-[132px] bg-gray-200 border rounded-md shadow-md py-2 text-gray-1100"
    >
      <button
        onClick={() => {
          onClose();
          router.push(`/exp/${id}?edit=true`);
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2"
      >
        <EditPencilIcon className="stroke-gray-1100" />
        수정
      </button>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="w-full text-left px-4 py-2 hover:bg-gray-300 flex items-center gap-2"
      >
        <TrashFullIcon className="stroke-gray-1100" />
        삭제
      </button>
      {isPopupOpen && (
        <Popup
          title="경험 삭제"
          content={`경험을 삭제하시겠습니까?\n삭제하시면 다시 복구할 수 없습니다.`}
          confirmText="삭제"
          cancelText="취소"
          onConfirm={async () => {
            await deleteExp(id);
            onClose();
            onDelete(id);
          }}
          onCancel={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}
