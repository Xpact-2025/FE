'use client';

import SearchIcon from '@/public/icons/Search.svg';

export default function SearchBar() {
  return (
    <div className="w-[385px] h-[45px] p-4 bg-gray-600 flex items-center justify-center gap-60 rounded-xl">
      <div className="text-gray-300 text-sm">Search</div>
      <SearchIcon />
    </div>
  );
}
