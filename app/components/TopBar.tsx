'use client';

import SearchBar from './SearchBar';
import Profile from './Profile';
import { usePathname } from 'next/navigation';

export default function TopBar() {
  const pathname = usePathname();
  const pageState = pathname === '/exp' ? 'main' : 'more';

  return (
    <div className="flex justify-between pl-[398px] pr-[130px] bg-gray-1000 h-[100px] p-7">
      {pageState === 'main' && <SearchBar />}
      <div className="flex justify-end flex-grow">
        <Profile />
      </div>
    </div>
  );
}
