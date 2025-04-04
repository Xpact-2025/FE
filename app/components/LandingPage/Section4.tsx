import Image from 'next/image';

export default function Section4() {
    return (
      <section className="bg-gray-900 text-white w-full p-[130px] flex flex-col md:flex-row justify-between items-center">
        <div className="flex-1 flex flex-col h-full sm:flex-row gap-6 justify-start items-start">
          <Image
            src="/gray.png"
            alt="Xpact"
            width={534}
            height={597}
          />
        </div>

        <div className="flex-1 text-right">
          <h3 className="text-[24px] md:text-[40px] font-semibold mb-[65px]">
            내 경험, 이렇게 발전시켜 보세요
          </h3>
          <p className="text-[20px] text-gray-400 leading-relaxed mb-6">
            입력된 경험을 기반으로, 지금 나에게 필요한 경험을 추천해줍니다.  
          </p>

          <Image
            src="/gray.png"
            alt="Xpact"
            width={491}
            height={302}
            className="h-[302px] bg-gray-800 mt-[115px] ml-auto"
          />
        </div>
      </section>
    )
}