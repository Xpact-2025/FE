'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { kakaoLogin, getKakaoAuthUrl } from '../../apis/auth';
import Image from 'next/image';
import Link from 'next/link';

export default function SocialLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) return;

    const login = async () => {
      try {
        await kakaoLogin(code);
        router.push('/');
      } catch (err) {
        console.error('로그인 실패:', err);
      }
    };

    login();
  }, [searchParams, router]);

  const handleKakaoLogin = async () => {
    try {
      const url = await getKakaoAuthUrl();
      console.log(url);
      window.location.href = url;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-[448px]">
      <div className="flex items-center justify-center space-x-4 text-gray-500">
        <hr className="flex-grow border-gray-700" />
        <span className="text-[14px] whitespace-nowrap">
          SNS 회원가입 및 로그인
        </span>
        <hr className="flex-grow border-gray-700" />
      </div>

      <div className="mt-5 flex justify-center space-x-10">
        <button onClick={handleKakaoLogin} className="cursor-pointer">
          <Image src="/images/kakao.svg" alt="kakao" width={48} height={48} />
        </button>
        <Link href="#">
          <Image src="/images/naver.svg" alt="naver" width={48} height={48} />
        </Link>
      </div>
    </div>
  );
}
