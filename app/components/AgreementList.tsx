'use client';

import { useState } from 'react';

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  showDetail?: () => void;
}

interface Props {
  agreements: AgreementItem[];
  onChange?: (checkedItems: { [id: string]: boolean }) => void;
}

export default function AgreementList({ agreements, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>(
    Object.fromEntries(agreements.map(a => [a.id, false]))
  );

  const allChecked = agreements.every(a => checkedItems[a.id]);

  const handleCheck = (id: string, value: boolean) => {
    const updated = { ...checkedItems, [id]: value };
    setCheckedItems(updated);
    onChange?.(updated);
  };

  const handleCheckAll = () => {
    const newValue = !allChecked;
    const updated = Object.fromEntries(agreements.map(a => [a.id, newValue]));
    setCheckedItems(updated);
    onChange?.(updated);
  };

  return (
    <div className="flex flex-col gap-3 text-sm text-gray-300">
      {/* 전체 동의 */}
      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleCheckAll}
            className="w-4 h-4 accent-gray-1000 "
          />
          전체 동의하기
        </label>
      </div>

      {/* 개별 항목 */}
      {agreements.map(item => (
        <div key={item.id} className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={checkedItems[item.id]}
              onChange={e => handleCheck(item.id, e.target.checked)}
              className="w-4 h-4 accent-gray-1000"
            />
            <span>
              {item.required && <span className="text-gray-400">(필수) </span>}
              {item.label}
            </span>
          </label>
          <button
            onClick={item.showDetail}
            className="text-xs text-gray-400 hover:underline"
          >
            더보기
          </button>
        </div>
      ))}
    </div>
  );
}
