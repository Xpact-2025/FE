'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

interface AgreementItem {
  id: string;
  label: string;
  required: boolean;
  detailComponent?: ReactNode;
}

interface Props {
  agreements: AgreementItem[];
  onChange?: (checkedItems: { [id: string]: boolean }) => void;
}

export default function AgreementList({ agreements, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState<{ [id: string]: boolean }>(
    Object.fromEntries(agreements.map(a => [a.id, false]))
  );

  const [popupContent, setPopupContent] = useState<ReactNode | null>(null); // ✨ ReactNode 타입

  const allChecked = agreements.every(a => checkedItems[a.id]);
  const [popupContentId, setPopupContentId] = useState<string | null>(null);

  const handleDetailOpen = (id: string, content: ReactNode) => {
    setPopupContent(content);
    setPopupContentId(id);
  };

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
            className="w-4 h-4 accent-gray-1000"
          />
          전체 동의하기
        </label>
      </div>

      {/* 개별 항목 */}
      {agreements.map(item => (
        <div key={item.id} className="flex justify-between items-center">
          <label className="flex items-center gap-2">
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
          {item.detailComponent && (
            <button
              onClick={() => handleDetailOpen(item.id, item.detailComponent!)}
              className="text-xs text-gray-400 hover:underline"
            >
              더보기
            </button>
          )}
        </div>
      ))}

      {popupContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[540px] bg-gray-700 rounded-[14px] p-6">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setPopupContent(null)}
              className="absolute top-4 right-5 text-gray-300 text-2xl"
            >
              ×
            </button>

            {/* 제목 */}
            <div className="flex items-center mb-4">
              <svg
                className="w-5 h-5 text-gray-50 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="text-lg font-bold text-white">이용약관</h2>
            </div>

            {/* 내용 박스 */}
            <div className="bg-gray-600 text-gray-200 text-sm rounded max-h-[280px] overflow-y-auto whitespace-pre-wrap">
              {popupContent}
            </div>

            {/* 동의 문구 */}
            <div className="flex justify-end items-center mt-4">
              <svg
                className="w-4 h-4 text-primary-50 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xs text-gray-300">
                (필수) {agreements.find(a => a.id === popupContentId)?.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
