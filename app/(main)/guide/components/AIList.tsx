import { AIActivity } from '@/apis/guide';
import AIActivityCard from './AIActivityCard';

interface AIListProps {
  data: AIActivity[];
}

export default function AIList({ data }: AIListProps) {
  if (!data || data.length === 0) {
    return (
      <div className="mx-5 mb-10 body-15-m text-gray-300">
        AI 추천 활동이 없습니다.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {data.map(item => (
        <AIActivityCard key={item.id} data={item} />
      ))}
    </div>
  );
}
