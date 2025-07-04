import { AIActivity } from '@/apis/guide';
import AIActivityCard from './AIActivityCard';

interface AIListProps {
  data: AIActivity[];
}

export default function AIList({ data }: AIListProps) {
  return (
    <div>
      {!data || data.length === 0 ? (
        <div>경험이 존재하지 않습니다.</div>
      ) : (
        <div className="w-full flex flex-wrap">
          {data?.map(data => <AIActivityCard key={data.id} data={data} />)}
        </div>
      )}
    </div>
  );
}
