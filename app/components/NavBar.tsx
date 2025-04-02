'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-[5%] py-4 bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[41px]">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Xpact"
              width={170}
              height={48}
              className="h-[48px] w-[170px]"
            />
          </Link>

          <nav className="hidden md:flex space-x-6 text-[16px] text-gray-50">
            <Link href="/dashboard" className="hover:text-primary-100">
              대시보드
            </Link>
            <Link href="/experience" className="hover:text-primary-100">
              내 경험
            </Link>
            <Link href="/guide" className="hover:text-primary-100">
              성장 가이드
            </Link>
            <Link href="/ai-intro" className="hover:text-primary-100">
              AI 자기소개서
            </Link>
            <Link href="/mypage" className="hover:text-primary-100">
              마이페이지
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block text-[16px] text-gray-50">
            <Link href="/login" className="hover:text-primary-100">
              로그인
            </Link>
          </div>

          <button
            className="md:hidden text-gray-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-gray-50 text-[16px]">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            대시보드
          </Link>
          <Link
            href="/experience"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            내 경험
          </Link>
          <Link
            href="/guide"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            성장 가이드
          </Link>
          <Link
            href="/aiintro"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            AI 자기소개서
          </Link>
          <Link
            href="/mypage"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            마이페이지
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="hover:text-primary-100"
          >
            로그인
          </Link>
        </div>
      )}
    </header>
  );
}
