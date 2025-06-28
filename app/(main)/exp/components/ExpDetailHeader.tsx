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
  isEditing?: boolean;
  onChange?: {
    title?: (val: string) => void;
    qualification?: (val: string) => void;
    publisher?: (val: string) => void;
    issueDate?: (val: string) => void;
    startDate?: (val: string) => void;
    endDate?: (val: string) => void;
  };
}

export default function ExpHeader({
  experienceType,
  title,
  qualification,
  publisher,
  issueDate,
  startDate,
  endDate,
  isEditing = false,
  onChange = {},
}: ExpHeaderProps) {
  const isSpecial = ['PRIZE', 'CERTIFICATES'].includes(experienceType);

  return (
    <section className="mb-10">
      <div className="bg-gray-700 px-6 py-4 rounded-xl border border-gray-50-20">
        <div className="text-gray-50 text-2xl font-bold flex items-center gap-2 mb-2">
          {isEditing ? (
            isSpecial ? (
              <input
                type="text"
                value={qualification}
                onChange={e => onChange.qualification?.(e.target.value)}
                className="bg-gray-800 p-2 rounded text-white w-[90%]"
              />
            ) : (
              <input
                type="text"
                value={title}
                onChange={e => onChange.title?.(e.target.value)}
                className="bg-gray-800 p-2 rounded text-white w-[90%]"
              />
            )
          ) : (
            <>{isSpecial ? qualification : title}</>
          )}
          <ExpVariety type={experienceType as ExpType} />
        </div>

        <div className="text-sm text-gray-400 space-y-1">
          {isSpecial ? (
            isEditing ? (
              <>
                <input
                  type="date"
                  value={issueDate}
                  onChange={e => onChange.issueDate?.(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded mb-2"
                />
                <input
                  type="text"
                  value={publisher}
                  onChange={e => onChange.publisher?.(e.target.value)}
                  className="bg-gray-800 text-white p-2 rounded w-full"
                  placeholder="발행처 입력"
                />
              </>
            ) : (
              <>
                {issueDate &&
                  `${new Date(issueDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} · ${publisher}`}
              </>
            )
          ) : isEditing ? (
            <>
              <input
                type="date"
                value={startDate}
                onChange={e => onChange.startDate?.(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded mr-2 appearance-none [&::-webkit-calendar-picker-indicator]:invert"
              />
              <input
                type="date"
                value={endDate}
                onChange={e => onChange.endDate?.(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded appearance-none [&::-webkit-calendar-picker-indicator]:invert"
              />
            </>
          ) : (
            <>
              {`${new Date(startDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} - ${new Date(endDate).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}`}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
