import Image from 'next/image';

interface MainCardProps {
  title: string;
  description: string;
  highlight?: boolean;
}

export default function MainCard({
  title,
  description,
  highlight = false,
}: MainCardProps) {
  return (
    <div
      className={`px-[30px] py-[37px] w-[373px] h-[234px] text-left shadow-lg hover:scale-[1.02] transition rounded-[8px] outline-1 outline-white/10 border-none`}
      style={{
        background: highlight
          ? 'linear-gradient(180deg, #111111 0%, #341812 25.5%, #7E2614 100%)'
          : '#111',
      }}
    >
      <h4 className="text-[30px] text-gray-200 font-bold mb-2">{title}</h4>
      <p className="text-[16px] text-gray-300 mb-[9%] line-clamp-2 whitespace-pre-line">
        {description}
      </p>
      <div className="flex justify-end">
        <Image src="/arrow.png" alt="Xpact" width={29} height={29} />
      </div>
    </div>
  );
}
