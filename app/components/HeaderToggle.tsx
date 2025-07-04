'use client';

import { useState, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface Props {
  loginSlot: ReactNode;
}

export default function HeaderToggle({ loginSlot }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative lg:hidden text-gray-50">
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
          <ul className="flex flex-col p-4 space-y-4 text-sm">
            <li>
              <Link href="/dashboard">대시보드</Link>
            </li>
            <li>
              <Link href="/exp">내 경험</Link>
            </li>
            <li>
              <Link href="/guide">성장 가이드</Link>
            </li>
            <li>
              <Link href="/scrap">스크랩</Link>
            </li>
            <li>
              <Link href="/myPage">마이페이지</Link>
            </li>
            <li>{loginSlot}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
