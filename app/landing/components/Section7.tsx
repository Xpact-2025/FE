export default function Section7() {
  return (
    <section className="bg-gray-900 text-white w-full h-[1226px] text-center flex flex-col items-center justify-centermx-auto relative">
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

      <button className="w-[120px] h-[40px] bg-gray-50 text-gray-1000 text-[16px] font-semibold px-5 py-2 rounded hover:bg-gray-200 transition z-10">
        시작하기
      </button>
    </section>
  );
}
