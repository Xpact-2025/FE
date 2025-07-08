import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-6 font-[Pretendard] text-sm">
      <div className="flex flex-col gap-4">
        <Image
          src="/images/logo2.svg"
          alt="Xpact"
          width={59}
          height={48}
          className="object-contain"
        />
        <div className="space-x-2 text-sm text-gray-300 mt-5">
          <Link href="/terms">이용약관</Link>
          <span>|</span>
          <Link href="/privacy">개인정보처리방침</Link>
        </div>

        <div className="flex justify-between items-center flex-wrap text-xs text-gray-300">
          <div>E-mail | xpact.team@gmail.com</div>
          <div>© Copyright 2025 XPact. All right reserved</div>
        </div>
      </div>
    </footer>
  );
}
