import { AIActivity } from '@/apis/guide';
import AIActivityCard from './AIActivityCard';

interface AIListProps {
  data: AIActivity[];
}

export default function AIList({ data }: AIListProps) {
  if (!data || data.length === 0) {
    return <div className="text-gray-400">경험이 존재하지 않습니다.</div>;
  }

  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {data.map(item => (
        <AIActivityCard key={item.id} data={item} />
      ))}
    </div>
  );
}
