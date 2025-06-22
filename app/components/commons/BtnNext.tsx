import BackIcon from '@/public/icons/Chevron_Left.svg';

interface BtnNextProps {
  moveNext: (direction: number) => void;
}

export default function BtnNext({ moveNext }: BtnNextProps) {
  return (
    <button
      onClick={() => moveNext(1)}
      className="flex items-center justify-center bg-gray-700 rounded-lg w-[28px] h-[28px] cursor-pointer hover:bg-gray-600 transition"
      aria-label="다음 달"
    >
      <BackIcon className="stroke-gray-100 rotate-180" width={15} height={15} />
    </button>
  );
}
