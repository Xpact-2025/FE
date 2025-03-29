'use client';

import { useState } from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FormInput from '../components/InputBox';
import SocialLogin from '../components/SocialLogin';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate] = useState('2025-03-29');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

const handleSignup = async () => {
  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
        birthDate,
        type: 'FORM',
        role: 'ROLE_USER',
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('회원가입 성공!');
      router.push('/login');
    } else {
      alert(`회원가입 실패: ${data.message}`);
    }
  } catch (error) {
    console.error('회원가입 오류:', error);
    alert('네트워크 오류가 발생했습니다.');
  }
};


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
            <div className="text-[18px] mb-[2%] ml-[1%]">아이디 (이메일)</div>
            <FormInput
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">이름</div>
            <FormInput
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div>
            <FormInput
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleSignup}
            className="w-full mt-[8%] py-3 bg-[#FF6D03] hover:bg-[#e45e00] text-[18px] font-semibold rounded"
          >
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
