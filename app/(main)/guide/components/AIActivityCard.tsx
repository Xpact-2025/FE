'use client';

import { AIActivity } from '@/apis/guide';
import BookmarkIcon from '@/public/icons/Bookmark.svg';
import BookmarkFill from '@/public/icons/Bookmark_fill.svg';

interface AIActivityProps {
  data: AIActivity;
}

export default function AIActivityCard({ data }: AIActivityProps) {
  return (
    <div className="w-60 h-96 px-5 py-4.5 bg-zinc-90 rounded-[8px]">
      <div className="w-48 h-48 rounded">이미지</div>
      <div className="flex items-center justify-between gap-27.5 pt-6">
        {data.scrapType}
        {data.isCliped ? (
          <BookmarkIcon className="stroke-gray-100 w-[20px] h-[20px]" />
        ) : (
          <BookmarkFill className="stroke-gray-100 w-[20px] h-[20px]" />
        )}
      </div>
      <div className="body-20-r pt-6">{data.title}</div>
      <div className="flex items-center justify-between body-16-r pt-2">
        <div className="font-gray-300">{data.weakness}</div>
        <div className="font-gray-100">{data.dday}</div>
      </div>
    </div>
  );
}
