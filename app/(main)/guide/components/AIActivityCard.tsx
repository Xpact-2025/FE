'use client';

import { AIActivity } from '@/apis/guide';
import BookmarkIcon from '@/public/icons/Bookmark.svg';
import BookmarkFill from '@/public/icons/Bookmark_fill.svg';
import Image from 'next/image';

interface AIActivityProps {
  data: AIActivity;
}

export default function AIActivityCard({ data }: AIActivityProps) {
  return (
    <div className="w-60 h-120 px-5 py-4.5 bg-zinc-90 rounded-[8px]">
      <div className="w-full h-60 rounded overflow-hidden">
        <Image
          src={data.imgUrl}
          alt={data.title}
          width={1920}
          height={1920}
          className="w-full h-full object-cover"
          loading="eager"
          unoptimized
        />
      </div>
      <div className="flex items-center justify-between pt-6">
        <span className="text-sm text-gray-200">{data.scrapType}</span>
        {data.isCliped ? (
          <BookmarkFill className="stroke-gray-100 w-5 h-5" />
        ) : (
          <BookmarkIcon className="stroke-gray-100 w-5 h-5" />
        )}
      </div>
      <div className="body-20-r pt-6">{data.title}</div>
      <div className="flex items-center justify-between body-16-r pt-2">
        <div className="font-gray-300">{data.weakness ?? '전체'}</div>
        <div className="font-gray-100">
          {parseInt(data.dday) >= 0 ? '마감' : `D${data.dday}`}
        </div>
      </div>
    </div>
  );
}
