'use client';

import { AIActivity } from '@/apis/guide';
import { addScrap, removeScrap } from '@/apis/scrap';
import BookmarkIcon from '@/public/icons/Bookmark.svg';
import BookmarkFill from '@/public/icons/Bookmark_fill.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface AIActivityProps {
  data: AIActivity;
  onScrapToggle?: (id: number) => void;
}

export default function AIActivityCard({
  data,
  onScrapToggle,
}: AIActivityProps) {
  const [isCliped, setIsCliped] = useState(data.isCliped);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggleScrap = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지
    if (loading) return;
    setLoading(true);

    try {
      if (isCliped) {
        const success = await removeScrap(data.id);
        if (success) {
          setIsCliped(false);
          onScrapToggle?.(data.id);
        }
      } else {
        const success = await addScrap(data.id);
        if (success) setIsCliped(true);
      }
    } catch (e) {
      console.error('스크랩 처리 오류:', e);
      alert('스크랩 처리 중 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/guide/${data.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-65 h-125 px-5 py-4.5 bg-[#1A1A1A] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between mb-5 cursor-pointer"
    >
      <div>
        {/* 이미지 */}
        <div className="w-full h-60 rounded-md overflow-hidden">
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

        {/* 스크랩 정보 */}
        <div className="flex items-center justify-between pt-6">
          <span className="text-sm text-gray-200">{data.scrapType}</span>
          <div onClick={handleToggleScrap} className="cursor-pointer">
            {isCliped ? (
              <BookmarkFill className="stroke-gray-100 w-5 h-5" />
            ) : (
              <BookmarkIcon className="stroke-gray-100 w-5 h-5" />
            )}
          </div>
        </div>

        {/* 제목 */}
        <div className="pt-5 body-20-r text-gray-50 break-words whitespace-normal">
          {data.title}
        </div>
      </div>

      {/* D-day */}
      <div className="flex items-center justify-between body-16-r pt-2">
        <div className="text-gray-50">{data.weakness ?? '전체'}</div>
        <div className="text-gray-50">
          {parseInt(data.dday) >= 0 ? '마감' : `D${data.dday}`}
        </div>
      </div>
    </div>
  );
}
