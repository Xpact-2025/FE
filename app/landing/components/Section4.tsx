import Image from 'next/image';

export default function Section4() {
  return (
    <section className="bg-black text-white w-full py-20 flex flex-col md:flex-row justify-between items-center px-[10%] mt-[10%]">
      {/* 왼쪽 텍스트 영역 */}
      <div className="flex-1 text-left mb-12 md:mb-0">
        <h3 className="text-[32px] md:text-[40px] font-semibold leading-snug mb-6">
          경험을 시각화하고,
          <br />
          직무 역량을 분석해요
        </h3>
        <p className="text-[16px] md:text-[18px] text-gray-400">
          경험 데이터를 분석해 나의 경험 흐름을 시각적으로 보여줍니다.
        </p>
      </div>

      {/* 오른쪽 이미지 영역 */}
      <div className="flex-1 flex justify-end items-center">
        <Image
          src="/images/Section4.png"
          alt="Dashboard View"
          width={600}
          height={400}
          className="w-auto h-auto object-contain"
        />
      </div>
    </section>
  );
}
