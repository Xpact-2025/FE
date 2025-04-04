import Image from 'next/image';

export default function Section5() {
    return (
      <section className="bg-gray-900 text-white w-full p-[130px] text-center">
        <h3 className="text-[24px] md:text-[40px] font-semibold mb-4">
          자기소개서, 이제 쉽게 작성해보세요
        </h3>

        <p className="text-[20px] text-gray-400 mb-[176px]">
          직무에 꼭 맞는 자기소개서를 AI가 자동으로 생성해줍니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Image
            src="/gray.png"
            alt="Xpact"
            width={1180}
            height={597}
            className="h-[597px]"
          />
        </div>
      </section>
    )
}