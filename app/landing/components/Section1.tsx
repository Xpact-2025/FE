import Image from 'next/image';

export default function Section1() {
  return (
    <section className="w-full max-w-[1440px] mx-auto flex flex-col items-center text-center px-[5%] py-[100px] relative isolate">
      <div className="z-10 mt-[32px]">
        <h2 className="text-[32px] md:text-[60px] text-gray-50 font-bold mb-4 leading-tight">
          한눈에 정리되는 <br /> 나의 경험
        </h2>
        <p className="text-[16px] md:text-[20px]">
          경험 정리 대시보드, 직무 역량 분석, AI 자기소개서까지 <br />
          취업 준비에 꼭 필요한 모든 과정을 한 번에 제공합니다.
        </p>
        <button className="bg-white w-[120px] h-[40px] text-gray-1100 text-[16px] font-semibold px-6 py-2 rounded hover:bg-primary-50 active:bg-primary-100 transition mt-[45px]">
          시작하기
        </button>
      </div>

      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '750px',
          height: '600px',
          top: '300px',
          backgroundColor: '#6E1913',
          filter: 'blur(200px)',
        }}
      />
      <div
        className="absolute z-0 left-1/2 -translate-x-1/2"
        style={{
          width: '500px',
          height: '400px',
          top: '430px',
          backgroundColor: '#E24B1A',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 mt-[67.88px] w-[1098px] h-[657px]">
        <Image
          src="/images/gray.svg"
          alt="Xpact"
          width={1098}
          height={657}
          className="rounded-[8px] w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-[150px] z-[11] bg-gradient-to-b from-black/0 to-[#050208]" />
      </div>
    </section>
  );
}
