import Link from 'next/link';
import Image from 'next/image';
import BtnMenu from './BtnMenu';
import LoginButton from './LoginButton';
import HeaderToggle from './HeaderToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-[130px] py-[2%] bg-gray-1000 body-16-r">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[103px]">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Xpact"
              width={170}
              height={48}
              className="h-[48px] w-[170px]"
            />
          </Link>
          <nav className="hidden md:flex space-x-[41px] font-[Pretendard] text-gray-50">
            <BtnMenu title="대시보드" menu="dashboard" />
            <BtnMenu title="내 경험" menu="experience" />
            <BtnMenu title="성장 가이드" menu="guide" />
            <BtnMenu title="AI 자기소개서" menu="ai-intro" />
            <BtnMenu title="마이페이지" menu="mypage" />
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block text-gray-50">
            <LoginButton />
          </div>

          <HeaderToggle />
        </div>
      </div>
    </header>
  );
}
