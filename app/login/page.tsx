import NavBar from '../components/NavBar';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-[#FFFFFF]">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-[40px] font-bold font-[Pretendard] mb-10">
          로그인
        </h1>
        <div className="w-full max-w-sm space-y-4">
          <input
            type="text"
            placeholder="아이디"
            className="w-full text-[16px] px-4 py-2 border border-gray-500 bg-transparent rounded"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full text-[16px] px-4 py-2 border border-gray-500 bg-transparent rounded"
          />
          <button className="items-center text-[21px] font-[Pretendard] w-[209px] py-2 bg-[#FF6D03] hover:bg-orange-600 text-white font-semibold rounded ml-[25%]">
            로그인
          </button>
        </div>
        <div className="mt-[50px] text-[22px] flex justify-between w-full max-w-sm text-sm text-gray-400">
          <a href="#" className="ml-[10%]">
            회원가입
          </a>
          <a href="#" className="mr-[10%]">
            비밀번호 찾기
          </a>
        </div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center space-x-4">
            <hr className="flex-grow border-gray-600 w-[70px]" />
            <span className="text-[12px] text-gray-400 whitespace-nowrap">
              SNS 회원가입 및 로그인
            </span>
            <hr className="flex-grow border-gray-600 w-[70px]" />
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <a href="#">
              <img src="/kakao.png" alt="kakao" className="w-[50px] h-[50px]" />
            </a>
            <a href="#">
              <img src="/naver.png" alt="naver" className="w-[50px] h-[50px]" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
