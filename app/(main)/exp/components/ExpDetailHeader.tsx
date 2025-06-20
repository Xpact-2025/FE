import { ExpType } from '@/types/exp';
import ExpVariety from '../components/ExpVariety';

interface ExpHeaderProps {
  experienceType: string;
  title: string;
  qualification?: string;
  publisher?: string;
  issueDate?: string;
  startDate: string;
  endDate: string;
}

export default function ExpHeader({
  experienceType,
  title,
  qualification,
  publisher,
  issueDate,
  startDate,
  endDate,
}: ExpHeaderProps) {
  const isSpecial = ['PRIZE', 'CERTIFICATES'].includes(experienceType);

  const displayTitle = isSpecial ? qualification : title;
  const displayDate =
    isSpecial && issueDate
      ? `${new Date(issueDate).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} · ${publisher}`
      : `${new Date(startDate).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })} - ${new Date(endDate).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`;

  return (
    <section className="mb-10">
      <div className="bg-gray-700 px-6 py-4 rounded-xl border border-gray-50-20">
        <div className="text-gray-50 text-2xl font-bold flex items-center gap-2">
          {displayTitle}
          <ExpVariety type={experienceType as ExpType} />
        </div>
        <p className="text-sm text-gray-400 mt-3">{displayDate}</p>
      </div>
    </section>
  );
}
