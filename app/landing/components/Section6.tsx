import ReviewSlider from './ReviewSlider';

export default function Section6() {
  return (
    <section className="bg-gray-1000 text-white w-full p-[130px] text-center">
      <h3 className="text-[24px] md:text-[36px] font-semibold mb-[48px] leading-relaxed">
        정리되지 않던 경험이,{' '}
        <span className="px-2 py-1 text-white bg-highlight">
          방향이 되기까지
        </span>
      </h3>
      <p className="text-[16px] text-gray-400 mb-[112px]">
        이젠 당신이 경험해 볼 차례입니다
      </p>

      <ReviewSlider />
    </section>
  );
}
