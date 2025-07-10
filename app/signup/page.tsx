import Footer from '../components/Footer';
import Header from '../components/Header';
import SocialLogin from '../components/SocialLogin';
import Image from 'next/image';
import { Suspense } from 'react';
import SignupForm from './components/SignupForm';

export default function SignupPage() {
  return (
    <div>
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
          <h1 className="text-[35px] font-semibold">회원가입</h1>
        </div>
        <SignupForm />
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
