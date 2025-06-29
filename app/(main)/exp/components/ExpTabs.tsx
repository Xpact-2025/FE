'use client';

import { useState } from 'react';
import { SubExperience } from '@/apis/exp';
import { X } from 'lucide-react';
import PlusGrayIcon from '@/public/icons/PlusIcon_gray.svg';

interface ExpTabsProps {
  subDataList: SubExperience[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  isEditing?: boolean;
  onRemoveClick?: (index: number) => void;
  onRequestFullDelete?: () => void;
  onAddClick?: () => void;
  onTabNameChange?: (index: number, newName: string) => void;
}

export default function ExpTabs({
  subDataList,
  selectedIndex,
  onSelect,
  isEditing = false,
  onRemoveClick,
  onRequestFullDelete,
  onAddClick,
  onTabNameChange,
}: ExpTabsProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  if (subDataList.length === 0) return null;

  const handleStartEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(subDataList[index].tabName || `경험 ${index + 1}`);
  };

  const handleSave = (index: number) => {
    const trimmed = editingValue.trim();
    const newName = trimmed === '' ? `경험 ${index + 1}` : trimmed;
    onTabNameChange?.(index, newName);
    setEditingIndex(null);
  };

  return (
    <div className="flex mb-[-10px]">
      {subDataList.map((sub, index) => {
        const isSelected = selectedIndex === index;
        const isEditingTab = editingIndex === index;

        return (
          <button
            key={sub.subExperienceId ?? index}
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
            <div
              className="truncate max-w-[10ch]"
              onClick={e => {
                if (isEditing) {
                  e.stopPropagation();
                  handleStartEditing(index);
                }
              }}
            >
              {isEditingTab ? (
                <input
                  value={editingValue}
                  autoFocus
                  onChange={e => setEditingValue(e.target.value)}
                  onBlur={() => handleSave(index)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleSave(index);
                  }}
                  className="w-[100px] h-[30px] bg-black px-2 py-1 rounded"
                />
              ) : (
                sub.tabName || `경험 ${index + 1}`
              )}
            </div>

            {isEditing && subDataList.length > 1 && (
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

      {isEditing && (
        <button
          type="button"
          onClick={onAddClick}
          className="w-48 h-20 bg-black border border-gray-700 rounded-tl-2xl rounded-tr-2xl flex items-center justify-center"
        >
          <PlusGrayIcon className="w-[27px] h-[27px]" />
        </button>
      )}
    </div>
  );
}
