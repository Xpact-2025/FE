'use client';

import Image from 'next/image';
import Link from 'next/link';
import SideBarMenu from './SideBarMenu';
import { usePathname } from 'next/navigation';
import VectorIcon from '@/public/icons/Vector.svg';
import BookIcon from '@/public/icons/Book.svg';
import CopyIcon from '@/public/icons/Copy.svg';
import FileDocumentIcon from '@/public/icons/File_Document.svg';
import BookmarkIcon from '@/public/icons/Bookmark.svg';
import UserCircleIcon from '@/public/icons/User_Circle.svg';

const SideBar = () => {
  const pathname = usePathname();

  const iconStyle = (currentPath: string) => {
    return `${currentPath === pathname ? 'stroke-gray-50' : 'stroke-gray-300'} transition-colors group-hover:stroke-gray-50`;
  };

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
            icon={
              <VectorIcon
                className={`${pathname === '/dashboard' || pathname === '/' ? 'stroke-gray-50' : 'stroke-gray-300'} transition-colors group-hover:stroke-gray-50`}
              />
            }
            text="대시보드"
            isActive={pathname === '/dashboard' || pathname === '/'}
          />
          <SideBarMenu
            href="/experience"
            icon={
              <BookIcon
                className={`${pathname === '/experience' || pathname === '/addExperience' ? 'stroke-gray-50' : 'stroke-gray-300'} transition-colors group-hover:stroke-gray-50`}
              />
            }
            text="내 경험"
            isActive={
              pathname === '/experience' || pathname === '/addExperience'
            }
          />
          <SideBarMenu
            href="/experience"
            icon={<CopyIcon className={iconStyle('/growth-guide')} />}
            text="성장 가이드"
            isActive={pathname === '/growth-guide'}
          />
          <SideBarMenu
            href="/ai-self-introduction"
            icon={
              <FileDocumentIcon
                className={iconStyle('/ai-self-introduction')}
              />
            }
            text="AI 자기소개서"
            isActive={pathname === '/ai-self-introduction'}
          />
          <SideBarMenu
            href="/bookmark"
            icon={<BookmarkIcon className={iconStyle('/bookmark')} />}
            text="북마크"
            isActive={pathname === '/bookmark'}
          />
          <SideBarMenu
            href="/my-page"
            icon={<UserCircleIcon className={iconStyle('/my-page')} />}
            text="마이페이지"
            isActive={pathname === '/my-page'}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
