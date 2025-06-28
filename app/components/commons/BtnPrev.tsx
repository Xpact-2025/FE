import BackIcon from '@/public/icons/Chevron_Left.svg';

interface BtnPrevProps {
  movePrev: (direction: number) => void;
}

export default function BtnPrev({ movePrev }: BtnPrevProps) {
  return (
    <button
      onClick={() => movePrev(-1)}
      type="button"
      className="flex items-center justify-center bg-gray-700 rounded-lg w-[28px] h-[28px] cursor-pointer hover:bg-gray-600 transition"
      aria-label="이전 달"
    >
      <BackIcon className="stroke-gray-100" width={15} height={15} />
    </button>
  );
}
