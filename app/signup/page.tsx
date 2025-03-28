import NavBar from "../components/NavBar";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-20 px-4">
            <h1 className="text-[40px] font-bold font-[Pretendard] mb-10">회원가입</h1>

        <div className="w-full max-w-sm space-y-6">
            <div className="space-y-2">
                <label className="block text-[25px] font-semibold font-[Pretendard]">아이디</label>
                <input
                type="text"
                placeholder="아이디 (6~12자 이내, 영문/숫자 가능)"
                className="text-[16px] w-full px-4 py-2 border border-gray-500 bg-transparent rounded text-sm"
                />
            </div>

            <div className="space-y-2">
                <label className="block text-[25px] font-semibold font-[Pretendard]">비밀번호</label>
                <input
                type="password"
                placeholder="비밀번호 (8자 이상, 문자/숫자/기호 가능)"
                className="text-[16px] w-full px-4 py-2 border border-gray-500 bg-transparent rounded text-sm"
                />
                <input
                type="password"
                placeholder="비밀번호 확인"
                className="text-[16px] w-full px-4 py-2 border border-gray-500 bg-transparent rounded text-sm"
                />
            </div>

            <button className="w-[209px] h-[49px] py-2 bg-[#FF6D03] hover:bg-orange-600 text-white font-semibold rounded text-[22px] font-[Pretendard] ml-[25%]">
                가입하기
            </button>
        </div>
      </main>
    </div>
  );
}
