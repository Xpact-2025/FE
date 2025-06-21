import { SubExperience } from '@/apis/exp';
import { X } from 'lucide-react';

interface ExpTabsProps {
  subDataList: SubExperience[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  isEditing?: boolean;
  onRemoveClick?: (index: number) => void;
}

export default function ExpTabs({
  subDataList,
  selectedIndex,
  onSelect,
  isEditing = false,
  onRemoveClick,
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
            className={`flex items-center gap-2 px-6 py-2 text-[18px] font-semibold border border-gray-400 border-b-0 transition-colors duration-150
              rounded-t-[12px]
              ${isSelected ? 'bg-gray-700 text-white shadow-[0_-3px_0_0_#f97316] z-10' : 'bg-black text-gray-400'}
            `}
          >
            <span>{sub.subTitle || `세부 경험 ${index + 1}`}</span>
            {isEditing && (
              <X
                size={16}
                className="hover:text-red-500"
                onClick={e => {
                  e.stopPropagation(); // 탭 선택 방지
                  onRemoveClick?.(index);
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
