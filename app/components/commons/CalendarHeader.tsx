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
      <span className="body-12-m text-gray-100 text-center">
        {monthName} {year}
      </span>
      <BtnNext moveNext={moveMonth} />
    </div>
  );
}
