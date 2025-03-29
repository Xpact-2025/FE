'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FormInput from '../components/InputBox';
import SocialLogin from '../components/SocialLogin';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert('로그인 성공!');

        // 토큰 저장
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

        router.push('/dashboard'); 
      } else {
        alert(`로그인 실패: ${data.message}`);
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-[Pretendard]">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-14 px-4">
        <div className="flex flex-col items-center mb-10">
          <img src="/logo2.png" alt="Xpact" className="w-[59px] h-[48px] mb-4" />
          <h1 className="text-[35px] font-semibold">로그인</h1>
        </div>

        <div className="w-[448px] space-y-5">
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">아이디</div>
            <FormInput
              type="text"
              placeholder="아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">비밀번호</div>
            <FormInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full mt-[8%] py-3 bg-[#FF6D03] hover:bg-[#e45e00] text-[18px] font-semibold rounded"
          >
            로그인
          </button>
        </div>

        <div className="mt-6 text-[14px] text-gray-400">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-[#FF6D01] font-medium">회원가입</a>
        </div>

        <div className="mt-[8%]">
          <SocialLogin />
        </div>
      </main>
      <Footer />
    </div>
  );
}
