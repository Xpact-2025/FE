'use client';

import React from 'react';

interface MajorModalProps {
  isOpen: boolean;
  onClose: () => void;
  majors: string[];
  onSelect: (major: string) => void;
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export default function MajorModal({
  isOpen,
  onClose,
  majors,
  onSelect,
  searchValue,
  onChange,
  onSearch,
  isLoading,
}: MajorModalProps) {
  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-700 w-[700px] rounded-lg p-8 text-white"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-300 hover:text-white text-xl font-bold"
          aria-label="모달 닫기"
        >
          &times;
        </button>

        <div className="text-[20px] font-bold mb-1 text-gray-50">
          학과명 조회
        </div>
        <p className="text-sm text-gray-300 mb-4">
          검색해서 추가해 주세요. 만약 해당 학과가 없다면 직접 추가하기 버튼을
          눌러 추가해 주세요.
        </p>

        {/* 검색창 영역 */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="학과명"
            value={searchValue}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            className="flex-1 h-[44px] px-4 py-2 bg-gray-600 text-white rounded border border-gray-400"
          />
          <button
            onClick={onSearch}
            className="w-[80px] bg-primary-50 hover:bg-primary-100 rounded-[8px] text-black font-semibold ml-[3%]"
          >
            검색
          </button>
        </div>

        {/* 결과 목록 */}
        <div className="bg-gray-600 rounded-md max-h-[250px] overflow-y-auto px-2 py-3">
          {isLoading ? (
            <div className="text-center py-4 text-gray-300">로딩 중...</div>
          ) : (
            majors.map((major, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                onClick={() => {
                  onSelect(major);
                  onClose();
                }}
              >
                {major}
              </div>
            ))
          )}
          {!isLoading && majors.length === 0 && (
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-50 font-medium">{searchValue}</span>
                <button
                  onClick={() => {
                    onSelect(searchValue);
                    onClose();
                  }}
                  className="text-sm bg-gray-600 text-white px-2 py-[2px] rounded cursor-pointer"
                >
                  직접 추가하기
                </button>
              </div>
              <div className="text-gray-400 text-sm">검색 결과가 없습니다.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
