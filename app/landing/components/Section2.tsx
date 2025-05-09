import MainCard from './MainCard';
import Link from 'next/link';

export default function Section2() {
  return (
    <section className="bg-gray-1000 w-full flex flex-col items-center justify-center text-center px-[5%] py-[100px] text-gray-50">
      <h3 className="text-[20px] md:text-[40px] mb-8">
        취업 준비에 꼭 필요한 경험 관리 <br />
        <span
          className="text-gray-50 pl-3 py-1 font-semibold"
          style={{
            background:
              'linear-gradient(90deg, #FF6D03 0%, rgba(255, 109, 3, 0.514) 2.5%, rgba(255, 109, 3, 0.295) 51.5%, rgba(255, 109, 3, 0) 100%)',
          }}
        >
          XPact로 시작해
        </span>
        <span className="text-gray-50 py-1 font-semibold ml-0">보세요</span>
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-[65px] mt-[112px]">
        <Link href="/dashboard">
          <MainCard
            title="경험 대시보드"
            description={`입력한 경험을 시각화하고, \n 직무 역량을 분석해줍니다`}
          />
        </Link>
        <Link href="/">
          <MainCard
            title="성장 가이드"
            description={`부족한 역량을 파악하고, \n부족한 경험을 추천해줍니다`}
          />
        </Link>
        <Link href="/">
          <MainCard
            title="AI 자기소개서"
            description={`정리된 경험을 바탕으로 \n맞춤형 자기소개서를 생성해줍니다`}
          />
        </Link>
      </div>
    </section>
  );
}
