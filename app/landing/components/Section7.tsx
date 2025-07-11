'use client';

import { useRouter } from 'next/navigation';

export default function Section7() {
  const router = useRouter();

  return (
    <section className="bg-gray-1000 text-white w-full h-[1226px] text-center flex flex-col items-center justify-centermx-auto relative">
      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '750px',
          height: '200px',
          top: '300px',
          backgroundColor: '#6E1913',
          filter: 'blur(200px)',
        }}
      />
      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '500px',
          height: '10px',
          top: '430px',
          backgroundColor: '#E24B1A',
          filter: 'blur(100px)',
        }}
      />
      <div className="w-full h-[230px] p-[0px] bg-[#020202] z-10" />
      <h3 className="text-[24px] md:text-[40px] font-semibold mb-2 mt-[240px] leading-relaxed text-gray-50 z-10">
        작은 경험도 강력한 임팩트로
      </h3>
      <p className="text-[24px] md:text-[40px] font-bold mb-10 text-gray-50 z-10">
        XPact
      </p>

      <button
        className="bg-white w-[120px] h-[40px] text-gray-1100 text-[16px] font-semibold px-6 py-2 rounded hover:bg-primary-50 active:bg-primary-100 transition mt-[45px] cursor-pointer"
        onClick={() => router.push('/login')}
      >
        시작하기
      </button>
    </section>
  );
}
