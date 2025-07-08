interface SkillCircleProps {
  label: string;
  isSelected: boolean;
  onMouseEnter: () => void;
  explanation: string;
  memberName: string;
}

export default function SkillCircle({
  label,
  isSelected,
  onMouseEnter,
  explanation,
  memberName,
}: SkillCircleProps) {
  return (
    <div
      className="flex items-center text-lg font-semibold cursor-pointer"
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-center justify-center w-44 h-44 bg-[radial-gradient(ellipse_54.88%_54.88%_at_50.00%_50.00%,_rgba(255,_255,_255,_0.05)_76%,_rgba(255,_255,_255,_0.01)_100%)] rounded-full  shrink-0">
        <div className="flex items-center justify-center w-37 h-37 bg-[radial-gradient(ellipse_54.88%_54.88%_at_50.00%_50.00%,_rgba(255,_255,_255,_0.10)_76%,_rgba(255,_255,_255,_0.02)_100%)] rounded-full">
          <div className="flex items-center justify-center w-30 h-30 underline bg-neutral-800 shadow-[inset_0px_0px_13.554877281188965px_7.993902206420898px_rgba(255,255,255,0.04)] rounded-full text-center leading-tight px-2 break-words">
            {label}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="pl-12.5 pr-6">
          <div className="body-20-r">
            {memberName}님의 핵심 스킬맵 분석 결과, <span> </span>
            <span className="text-primary-50">{label}</span> 역량을 보완하면
            좋아요.
          </div>
          <div className="body-16-r text-gray-300 pt-4">{explanation}</div>
        </div>
      )}
    </div>
  );
}
