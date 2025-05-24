import BackIcon from '@/public/icons/Chevron_Left.svg';
import BtnPrev from './BtnPrev';
import BtnNext from './BtnNext';

interface CalendarHeaderProps {
  year: number;
  monthName: string;
  moveMonth: (direction: number) => void;
}

export default function CalendarHeader({
  year,
  monthName,
  moveMonth,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 mt-2">
      <BtnPrev movePrev={moveMonth} />
      <span className="body-18-m text-gray-100 min-w-[120px] text-center">
        {monthName} {year}
      </span>
      <BtnNext moveNext={moveMonth} />
    </div>
  );
}
