import { MouseEventHandler } from 'react';

interface BtnExpTypeProps {
  label: string;
  selected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function BtnExpType({
  label,
  selected,
  onClick,
}: BtnExpTypeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[120px] h-11 px-12 py-2.5 gap-[7px] rounded-lg border items-center justify-center inline-flex whitespace-nowrap hover:bg-primary-50 hover:text-gray-900
        ${selected ? 'bg-primary-50 text-gray-900 text-lg font-medium' : 'bg-gray-900 text-gray-300 border-gray-50-20 text-lg font-medium'}`}
    >
      {label}
    </button>
  );
}
