import Link from 'next/link';
import Image from 'next/image';

const SideBar = () => {
  return (
    <aside className="w-64 bg-[#151515] p-6 h-full">
      <nav className="fixed">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Xpact"
            width={120}
            height={34}
            className="lg:h-[48px] lg:w-[170px]"
          />
        </Link>
        <ul className="space-y-8 my-6">
          <li>
            <Link
              href="/dashboard"
              className="hover:text-[#FF6D01] transition-colors"
            >
              대시보드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#FF6D01] transition-colors">
              내 경험
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#FF6D01] transition-colors">
              성장 가이드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#FF6D01] transition-colors">
              AI 성장 가이드
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-[#FF6D01] transition-colors">
              마이 페이지
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
