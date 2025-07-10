'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Section1() {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center text-center py-[100px] relative isolate">
      <div className="mx-auto z-10 mt-[32px]">
        <h2 className="text-[32px] md:text-[60px] text-gray-50 font-bold mb-4 leading-tight">
          한눈에 정리되는 <br /> 나의 경험
        </h2>
        <p className="text-[16px] md:text-[20px]">
          경험 정리부터 직무 역량 분석, 맞춤 활동 추천까지 <br />
          취업 준비에 꼭 필요한 모든 과정을 한 번에 제공합니다.
        </p>
        <button
          className="bg-white w-[120px] h-[40px] text-gray-1100 text-[16px] font-semibold px-6 py-2 rounded hover:bg-primary-50 active:bg-primary-100 transition mt-[45px] cursor-pointer"
          onClick={() => router.push('/login')}
        >
          시작하기
        </button>
      </div>

      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '750px',
          height: '600px',
          top: '300px',
          backgroundColor: '#842800',
          filter: 'blur(200px)',
        }}
      />
      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '500px',
          height: '400px',
          top: '430px',
          backgroundColor: '#FF6D01',
          filter: 'blur(100px)',
        }}
      />
      <div className="relative z-10 mt-[10px] mx-auto justify-center items-center">
        <Image
          src="/images/dashboard.png"
          alt="Xpact"
          width={1120}
          height={815.25}
          className="rounded-[8px] object-contain"
        />
        <div className="absolute bottom-0 left-0 w-full h-[150px] z-[11] bg-gradient-to-b from-black/0 to-[#050208]" />
      </div>
    </section>
  );
}
