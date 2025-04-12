'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FormInput from '../components/InputBox';
import SocialLogin from '../components/SocialLogin';
import Image from 'next/image';
import { loginUser } from '../../apis/auth';
import { Suspense } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setEmailError('아이디를 입력해주세요.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('올바르지 않은 아이디 형식입니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (!value.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    let hasError = false;

    // 최종 유효성 검사
    if (!email.trim()) {
      setEmailError('아이디를 입력해주세요.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('올바르지 않은 아이디 형식입니다.');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요.');
      hasError = true;
    }

    if (hasError) return;

    const data = await loginUser({ email, password });
    if (data.httpStatus === 200) {
      alert('로그인 성공!');
      router.push('/dashboard');
    } else {
      setEmailError('아이디 또는 비밀번호가 일치하지 않습니다.');
      setPasswordError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen  bg-black text-white font-[Pretendard]">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-[120px] px-4">
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo2.png"
            alt="Xpact"
            width={59}
            height={48}
            className="mb-4"
          />
          <h1 className="text-[35px] font-semibold">로그인</h1>
        </div>

        <div className="w-[448px] space-y-5">
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">아이디</div>
            <FormInput
              type="text"
              placeholder="아이디"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
            />
          </div>
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">비밀번호</div>
            <FormInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-[8%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded cursor-pointer"
          >
            로그인
          </button>
        </div>

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
      <Footer />
    </div>
  );
}
