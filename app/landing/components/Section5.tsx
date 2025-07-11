import Image from 'next/image';

export default function Section5() {
  return (
    <section className="bg-black text-white py-20 flex flex-col md:flex-row items-center justify-between mt-[10%] px-[10%]">
      <div className="relative flex-1 w-full max-w-[600px] mb-12 md:mb-0">
        <Image
          src="/images/Section5.png"
          alt="AI Activity Recommendation"
          width={600}
          height={400}
          className="w-auto h-auto object-contain"
        />
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="flex-1 text-right ml-6">
        <h3 className="text-[32px] md:text-[40px] font-semibold mb-4 leading-snug">
          내 경험,
          <br />
          이렇게 발전시켜 보세요
        </h3>
        <p className="text-[16px] md:text-[18px] text-gray-400">
          입력된 경험을 기반으로 지금 나에게 필요한 활동을 추천해줍니다.
        </p>
      </div>
    </section>
  );
}
