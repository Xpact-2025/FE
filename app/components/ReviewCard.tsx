import Image from "next/image";

interface ReviewCardProps {
    text: string;
    name: string;
    school: string;
    highlight?: boolean;
  }
  
  export default function ReviewCard({
    text,
    name,
    school,
    highlight = false,
  }: ReviewCardProps) {
    return (
      <div
        className={`px-[30px] py-[37px] w-[373px] h-[272px] text-left shadow-lg hover:scale-[1.02] transition rounded-[8px] outline-1 outline-white/10 border-none`}
        style={{
        background: highlight
          ? 'linear-gradient(180deg, #111111 0%, #341812 25.5%, #7E2614 100%)'
          : '#111'
        }}
      >
        <p className="text-[16px] leading-relaxed mb-6">{text}</p>
        <div className="flex items-center space-x-5">
          <div className="w-[36px] h-[36px] rounded-full border border-white/20 flex items-center justify-center">
            <Image
              src="/reviewuser.png"
              alt="user"
              width={36}
              height={36}
            />
          </div>
          <div className="text-[16px]">
            <div className="font-semibold">{name}</div>
            <div className="text-gray-400 text-sm">{school}</div>
          </div>
        </div>
      </div>
    );
  }
  