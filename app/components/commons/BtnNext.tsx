import BackIcon from '@/public/icons/Chevron_Left.svg';

interface BtnNextProps {
  moveNext: (direction: number) => void;
}

export default function BtnPrev({ moveNext }: BtnNextProps) {
  return (
    <button
      onClick={() => moveNext(1)}
      className="flex items-center justify-center bg-gray-700 rounded-lg w-9 h-9 cursor-pointer mx-1.5 hover:bg-gray-600 transition"
      aria-label="다음 달"
    >
      <BackIcon className="stroke-gray-100 rotate-180" width={20} height={20} />
    </button>
  );
}
