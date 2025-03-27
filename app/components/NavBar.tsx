export default function NavBar() {
    return (
      <header className="px-8 py-4 border-b border-gray-800">
        <div className="flex items-center space-x-10">
          <img src="/Logo.png" alt="Xpact" className="h-6" />
          <nav className="flex space-x-6 text-[17px] md:text-[21px] font-[Pretendard]">
            <a href="#" className="hover:text-[#FF6D03]">대시보드</a>
            <a href="#" className="hover:text-[#FF6D03]">내 경험</a>
            <a href="#" className="hover:text-[#FF6D03]">성장 가이드</a>
            <a href="#" className="hover:text-[#FF6D03]">AI 자기소개서</a>
            <a href="#" className="hover:text-[#FF6D03]">마이페이지</a>
          </nav>
        </div>
      </header>
    );
  }