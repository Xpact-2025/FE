import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FormInput from '../components/InputBox';
import SocialLogin from '../components/SocialLogin';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-[Pretendard]">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-14 px-4">
        <div className="flex flex-col items-center mb-10">
          <img src="/logo2.png" alt="Xpact" className="w-[59px] h-[48px] mb-4" />
          <h1 className="text-[35px] font-semibold">회원가입</h1>
        </div>

        <div className="w-[448px] space-y-5">
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">아이디</div>
            <FormInput type="text" placeholder="아이디 (6~12자 이내, 영문/숫자 가능)" />
          </div>
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">비밀번호</div>
            <FormInput type="password" placeholder="비밀번호 (8자 이상, 문자/숫자/기호 가능)" />
          </div>
          <div>
            <FormInput type="password" placeholder="비밀번호 확인" />
          </div>

          <button className="w-full mt-[8%] py-3 bg-[#FF6D03] hover:bg-[#e45e00] text-[18px] font-semibold rounded">
            회원가입
          </button>
        </div>

        <div className="mt-[8%]">
          <SocialLogin />
        </div>
      </main>
      <Footer />
    </div>
  );
}