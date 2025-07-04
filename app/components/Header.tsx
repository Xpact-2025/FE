import Image from 'next/image';
import Link from 'next/link';
import BtnMenu from './BtnMenu';
import LoginButton from './LoginButton';
import HeaderToggle from './HeaderToggle';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-[10%] py-[2%] bg-gray-1000 body-16-sb">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[103px]">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Xpact"
              width={170}
              height={48}
              className="w-[140px] h-[40px] sm:w-[170px] sm:h-[48px]"
            />
          </Link>
          <nav className="hidden lg:flex space-x-[30px] text-gray-50">
            <BtnMenu title="대시보드" menu="dashboard" />
            <BtnMenu title="내 경험" menu="exp" />
            <BtnMenu title="성장 가이드" menu="guide" />
            <BtnMenu title="스크랩" menu="scrap" />
            <BtnMenu title="마이페이지" menu="myPage" />
          </nav>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:block text-gray-50">
            <LoginButton />
          </div>

          <HeaderToggle loginSlot={<LoginButton />} />
        </div>
      </div>
    </header>
  );
}
