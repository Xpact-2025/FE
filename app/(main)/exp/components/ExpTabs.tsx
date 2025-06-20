import { SubExperience } from '@/apis/exp';

interface ExpTabsProps {
  subDataList: SubExperience[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function ExpTabs({
  subDataList,
  selectedIndex,
  onSelect,
}: ExpTabsProps) {
  if (subDataList.length === 0) return null;

  return (
    <div className="flex mb-0 border-gray-700">
      {subDataList.map((sub, index) => {
        const isSelected = selectedIndex === index;
        return (
          <button
            key={sub.subExperienceId}
            onClick={() => onSelect(index)}
            className={`relative px-6 py-2 text-[18px] font-semibold border border-gray-400 border-b-0 transition-colors duration-150
    rounded-t-[12px]
    ${isSelected ? 'bg-gray-700 text-white shadow-[0_-3px_0_0_#f97316] z-10' : 'bg-black text-gray-400'}
  `}
          >
            {sub.subTitle || `세부 경험 ${index + 1}`}
          </button>
        );
      })}
    </div>
  );
}
