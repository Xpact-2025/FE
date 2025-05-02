'use client';

import Image from 'next/image';

export default function SearchBar() {
  return (
    <div className="w-[385px] h-[45px] p-4 bg-gray-600 flex items-center justify-center gap-60 rounded-xl">
      <div className="text-gray-300 text-sm">Search</div>
      <Image src="/Search.png" alt="search" width={24} height={24} />
    </div>
  );
}
