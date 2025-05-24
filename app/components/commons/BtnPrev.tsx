import BackIcon from '@/public/icons/Chevron_Left.svg';

interface BtnPrevProps {
  movePrev: (direction: number) => void;
}

export default function BtnPrev({ movePrev }: BtnPrevProps) {
  return (
    <button
      onClick={() => movePrev(-1)}
      type="button"
      className="flex items-center justify-center bg-gray-700 rounded-lg w-9 h-9 cursor-pointer mx-1.5 hover:bg-gray-600 transition"
      aria-label="이전 달"
    >
      <BackIcon className="stroke-gray-100 w-[20px] h-[20px]" />
    </button>
  );
}
