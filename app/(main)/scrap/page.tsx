'use client';

import { useEffect, useState } from 'react';
import { getScrapActivities } from '@/apis/scrap';
import { AIActivity } from '@/apis/guide';
import AIActivityCard from '../guide/components/AIActivityCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function ScarpPage() {
  const [scrapList, setScrapList] = useState<AIActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchScraps = async () => {
      try {
        const res = await getScrapActivities();
        const items = res.data;

        if (!items || items.length === 0) {
          setError(true);
          return;
        }

        const converted: AIActivity[] = items.map(item => ({
          id: item.id,
          title: item.title,
          imgUrl: item.imgUrl,
          scrapType: item.scrapType,
          dday: item.dday,
          isCliped: true,
          weakness: '',
        }));

        setScrapList(converted);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScraps();
  }, []);

  const handleScrapToggle = (id: number) => {
    setScrapList(prev => prev.filter(item => item.id !== id));
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || scrapList.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">
        스크랩된 활동이 없습니다.
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {scrapList.map(activity => (
        <AIActivityCard
          key={activity.id}
          data={activity}
          onScrapToggle={handleScrapToggle}
        />
      ))}
    </div>
  );
}
