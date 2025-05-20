'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowDownIcon from '@/public/icons/Arrow_Down.svg';
import { logout } from '@/apis/auth';

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end relative">
      <div className="flex items-center justify-center gap-1.5 text-gray-50 font-semibold">
        <Image src="/images/profile.svg" alt="profile" width={36} height={36} />
        <p className="whitespace-nowrap">김잇타</p>
        <ArrowDownIcon onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <div className="flex flex-col absolute top-full justify-center">
            <div className="flex bg-gray-800 w-44 px-5 py-2.5 text-gray-50 text-xs">
              <Link href="/mypage">마이페이지</Link>
            </div>
            <div className="flex bg-gray-800 w-44 px-5 py-2.5 text-gray-50 text-xs">
              <Link href="/scrap">스크랩</Link>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="flex bg-gray-800 w-44 px-5 py-2.5 text-gray-50 text-xs"
              >
                로그아웃
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
