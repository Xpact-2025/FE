'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '../../components/InputCheckBox';
import { getMyInfo, loginUser } from '@/apis/auth';

export default function LoginForm() {
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
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

    try {
      const loginRes = await loginUser({ email, password });

      if (loginRes.httpStatus === 200) {
        try {
          const userInfo = await getMyInfo();

          if (userInfo.success === true) {
            router.push('/'); // 메인으로 이동
          } else {
            router.push('/profile');
          }
        } catch (err) {
          console.error('회원 정보 조회 실패:', err);
          router.push('/profile');
        }
      } else {
        setEmailError('아이디 또는 비밀번호가 일치하지 않습니다.');
        setPasswordError('아이디 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      alert('로그인 중 문제가 발생했습니다.');
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="w-[448px] space-y-5">
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
        type="submit"
        className="w-full mt-[8%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded cursor-pointer"
      >
        로그인
      </button>
    </form>
  );
}
