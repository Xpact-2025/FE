import MainCard from './MainCard';
import Link from 'next/link';

export default function Section2() {
  return (
    <section className="bg-gray-1000 w-full flex flex-col items-center justify-center text-center px-[5%] py-[100px] text-gray-50">
      <h3 className="text-[35px] md:text-[40px] mb-8">
        취업 준비에 꼭 필요한 경험 관리 <br />
        <span className="text-gray-50 pl-3 py-1 font-semibold bg-highlight">
          XPact로 시작해
        </span>
        <span className="text-gray-50 py-1 font-semibold ml-0">보세요</span>
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-[5%] mt-[112px]">
        <Link href="/exp">
          <MainCard
            title="내 경험"
            description={`경험을 간편하게 입력하고, \n 한눈에 정리할 수 있습니다.`}
          />
        </Link>
        <Link href="/dashboard">
          <MainCard
            title="경험 대시보드"
            description={`입력한 경험을 시각화하고, \n직무 역량을 분석해줍니다.`}
          />
        </Link>
        <Link href="/guide">
          <MainCard
            title="성장 가이드"
            description={`필요한 역량을 파악하고 \n맞춤형 활동을 추천해줍니다.`}
          />
        </Link>
      </div>
    </section>
  );
}
