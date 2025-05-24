'use client';

import SearchIcon from '@/public/icons/Search.svg';

export default function SearchBar() {
  return (
    <div className="w-[538px] h-[45px] p-6 bg-gray-800 flex items-center justify-between rounded-xl">
      <div className="text-gray-300 text-sm">
        경험 제목이나 키워드로 검색해보세요.
      </div>
      <SearchIcon />
    </div>
  );
}
