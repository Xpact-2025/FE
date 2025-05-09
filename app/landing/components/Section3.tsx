import Image from 'next/image';

export default function Section3() {
  return (
    <section className="bg-gray-1000 text-white w-full p-[130px] flex flex-col md:flex-row justify-between items-center">
      <div className="flex-1 text-left">
        <h3 className="text-[24px] md:text-[40px] font-semibold mb-[65px]">
          경험을 한눈에 정리하고 시각화해요
        </h3>
        <p className="text-[20px] text-gray-400 leading-relaxed mb-6">
          간단한 양식 입력만으로, 흩어져 있던 활동들이
          <br />
          직무별로 정리되고 시각화된 대시보드로 완성됩니다.
        </p>

        <Image
          src="/images/gray.svg"
          alt="Xpact"
          width={482}
          height={271}
          className="h-[271px] bg-gray-900 mt-[150px]"
        />
      </div>

      <div className="flex-1 flex flex-col h-full sm:flex-row gap-6 justify-end items-end mt-[15px]">
        <Image src="/images/gray.svg" alt="Xpact" width={554} height={600} />
      </div>
    </section>
  );
}
