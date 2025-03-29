export default function Footer() {
    return (
      <footer className="w-full h-[130px] font-[Pretendard]">
        <div className="h-full mx-auto px-[5%] flex flex-col sm:flex-row justify-between items-center">
          <div className="w-[59px] h-[48px] flex items-center">
            <img
              src="/logo2.png"
              alt="Xpact"
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
  