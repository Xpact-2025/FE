interface SkillCircleProps {
  label: string;
  isSelected: boolean;
  onMouseEnter: () => void;
}

export default function SkillCircle({
  label,
  isSelected,
  onMouseEnter,
}: SkillCircleProps) {
  return (
    <div
      className="flex items-center text-lg font-semibold cursor-pointer"
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-center justify-center w-44 h-44 bg-[radial-gradient(ellipse_54.88%_54.88%_at_50.00%_50.00%,_rgba(255,_255,_255,_0.05)_76%,_rgba(255,_255,_255,_0.01)_100%)] rounded-full  shrink-0">
        <div className="flex items-center justify-center w-37 h-37 bg-[radial-gradient(ellipse_54.88%_54.88%_at_50.00%_50.00%,_rgba(255,_255,_255,_0.10)_76%,_rgba(255,_255,_255,_0.02)_100%)] rounded-full">
          <div className="flex items-center justify-center w-30 h-30 underline bg-neutral-800 shadow-[inset_0px_0px_13.554877281188965px_7.993902206420898px_rgba(255,255,255,0.04)] rounded-full">
            {label}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="pl-12.5 pr-6">
          <div className="body-20-r">
            김잇타님의 핵심 스킬맵 분석 결과,{' '}
            <span className="text-primary-50">{label}</span> 역량을 보완하면
            좋아요.
          </div>
          <div className="body-16-r text-gray-300 pt-4">
            프로젝트나 인턴 경험에서 사용자 피드백을 정성적으로 수집하거나
            감각적인 판단으로 방향성을 설정한 사례는 있으나, 로그 데이터 분석,
            KPI 트래킹, 데이터 기반 의사결정 과정은 구체적으로 드러나지
            않았습니다. 예를 들어, 뉴스 앱 기획 인턴 경험에서도 사용자 피드백을
            바탕으로 UI를 조정한 사례는 있으나, 수치 기반 분석이나 A/B 테스트 등
            정량적 접근은 한계적으로 나타났습니다.
          </div>
        </div>
      )}
    </div>
  );
}
