import { SubExperience } from '@/apis/exp';
import { X } from 'lucide-react';

interface ExpTabsProps {
  subDataList: SubExperience[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  isEditing?: boolean;
  onRemoveClick?: (index: number) => void;
  onRequestFullDelete?: () => void;
}

export default function ExpTabs({
  subDataList,
  selectedIndex,
  onSelect,
  isEditing = false,
  onRemoveClick,
  onRequestFullDelete,
}: ExpTabsProps) {
  if (subDataList.length === 0) return null;

  return (
    <div className="flex mb-[-10px]">
      {subDataList.map((sub, index) => {
        const isSelected = selectedIndex === index;
        return (
          <button
            key={sub.subExperienceId}
            onClick={() => onSelect(index)}
            className={`w-48 h-20 px-4 py-2 text-lg font-semibold transition-colors duration-150 
              rounded-tl-2xl rounded-tr-2xl flex items-center justify-center relative
              ${
                isSelected
                  ? 'bg-gray-700 border-t-2 border-primary-50 text-white'
                  : 'bg-black border border-gray-700 text-gray-400'
              }
            `}
          >
            <span className="truncate max-w-[10ch]">
              {sub.subTitle || `세부 경험 ${index + 1}`}
            </span>
            {isEditing && (
              <X
                size={16}
                className="absolute top-2 right-2 hover:text-red-500"
                onClick={e => {
                  e.stopPropagation();
                  if (subDataList.length === 1) {
                    onRequestFullDelete?.();
                  } else {
                    onRemoveClick?.(index);
                  }
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
