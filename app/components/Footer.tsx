import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full h-[130px] font-[Pretendard]">
      <div className="h-full mx-auto px-[130px] flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/logo2.png"
            alt="Xpact"
            width={59}
            height={48}
            className="object-contain"
          />
        </div>

        <nav className="mt-4 sm:mt-0 flex items-center text-[16px] text-[#999]">
          <div>© Copyright 2025. OneTwoThree</div>
        </nav>
      </div>
    </footer>
  );
}
