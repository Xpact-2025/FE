import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from './components/LoginForm';
import SocialLogin from '../components/SocialLogin';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-[Pretendard]">
      <Header />
      <main className="flex flex-col items-center justify-center py-[120px] px-4">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/images/logo2.svg"
            alt="Xpact"
            width={59}
            height={48}
            className="mb-4"
          />
          <h1 className="text-[35px] font-semibold">로그인</h1>
        </div>

        <LoginForm />

        <div className="mt-6 text-[14px] text-gray-400">
          계정이 없으신가요? <span />
          <a href="/signup" className="text-[#FF6D01] font-medium">
            회원가입
          </a>
        </div>

        <div className="mt-[5%]">
          <Suspense fallback={<div>소셜 로그인 로딩 중...</div>}>
            <SocialLogin />
          </Suspense>
        </div>
      </main>
      <div className="px-[10%]">
        <Footer />
      </div>
    </div>
  );
}
