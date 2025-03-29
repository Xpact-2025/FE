

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-[5%] py-4 border-b border-gray-800 bg-black">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-14">
          <Link href="/">
            <img src="/Logo.png" alt="Xpact" className="w-[120px] h-[34px] lg:h-[48px] lg:w-[170px]" />
          </Link>

          <nav className="hidden md:flex space-x-6 text-[16px] lg:text-[20px] font-[Pretendard] text-white">
            <Link href="/dashboard" className="hover:text-[#FF6D01]">대시보드</Link>
            <Link href="/experience" className="hover:text-[#FF6D01]">내 경험</Link>
            <Link href="/guide" className="hover:text-[#FF6D01]">성장 가이드</Link>
            <Link href="/ai-intro" className="hover:text-[#FF6D01]">AI 자기소개서</Link>
            <Link href="/mypage" className="hover:text-[#FF6D01]">마이페이지</Link>
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block text-[16px] lg:text-[20px] font-[Pretendard] text-white">
            <Link href="/login" className="hover:text-[#FF6D01]">로그인</Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-white font-[Pretendard] text-[16px]">
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">대시보드</Link>
          <Link href="/experience" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">내 경험</Link>
          <Link href="/guide" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">성장 가이드</Link>
          <Link href="/aiintro" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">AI 자기소개서</Link>
          <Link href="/mypage" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">마이페이지</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="hover:text-[#FF6D01]">로그인</Link>
        </div>
      )}
    </header>
  );
}
