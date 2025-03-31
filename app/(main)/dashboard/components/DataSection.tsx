import SectionCard from './SectionCard';

const DataSection = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mx-16 my-8">
      <SectionCard
        title="직무 비율"
        description="경험을 입력하고, 나의 직무 역량을 시각적으로 확인해보세요."
        buttonText="경험 입력하러 가기"
      />
      <SectionCard
        title="핵심 스킬 맵"
        description="경험을 입력하고, 어떤 역량이 중요한지 부족한지 한눈에 확인해보세요."
        buttonText="경험 입력하러 가기"
      />
    </div>
  );
};

export default DataSection;
