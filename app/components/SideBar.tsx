'use client';

import Image from 'next/image';
import Link from 'next/link';
import SideBarMenu from './SideBarMenu';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#0E0E0E] p-6 h-screen">
      <nav>
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Xpact"
            width={128}
            height={48}
            className="w-[128px] my-[41px] mx-auto"
          />
        </Link>
        <ul>
          <SideBarMenu
            href="/dashboard"
            iconSrc="/icons/Vector.svg"
            text="대시보드"
            isActive={pathname === '/dashboard' || pathname === '/'}
          />
          <SideBarMenu
            href="/experience"
            iconSrc="/icons/Book.svg"
            text="내 경험"
            isActive={pathname === '/experience'}
          />
          <SideBarMenu
            href="/experience"
            iconSrc="/icons/Copy.svg"
            text="성장 가이드"
            isActive={pathname === '/growth-guide'}
          />
          <SideBarMenu
            href="/ai-self-introduction"
            iconSrc="/icons/File_Document.svg"
            text="AI 자기소개서"
            isActive={pathname === '/ai-self-introduction'}
          />
          <SideBarMenu
            href="/bookmark"
            iconSrc="/icons/Bookmark.svg"
            text="북마크"
            isActive={pathname === '/bookmark'}
          />
          <SideBarMenu
            href="/my-page"
            iconSrc="/icons/User_Circle.svg"
            text="마이페이지"
            isActive={pathname === '/my-page'}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
