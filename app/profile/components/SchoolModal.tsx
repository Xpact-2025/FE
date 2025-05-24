'use client';

import React from 'react';

interface SchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: string[];
  onSelect: (school: string) => void;
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export default function SchoolModal({
  isOpen,
  onClose,
  schools,
  onSelect,
  searchValue,
  onChange,
  onSearch,
  isLoading,
}: SchoolModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-700 w-[709px] rounded-lg p-8 text-white"
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
          학교명 조회
        </div>
        <p className="text-sm text-gray-300 mb-4">
          검색해서 추가해 주세요. 만약 학교명이 없다면 직접 추가하기 버튼을 눌러
          추가해 주세요.
        </p>

        {/* 검색창 영역 */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="학교명"
            value={searchValue}
            onChange={onChange}
            className="flex-1 w-[613px] h-[44px] px-4 py-2 bg-gray-600 text-white rounded border border-gray-400"
          />
          <button
            onClick={onSearch}
            className="w-[80px] bg-primary-50 hover:bg-primary-100 rounded-[8px] text-black font-semibold ml-[3%]"
          >
            검색
          </button>
        </div>

        {/* 결과 목록 */}
        <div className="bg-[#2b2b2b] rounded-md max-h-[250px] overflow-y-auto px-2 py-3">
          {isLoading ? (
            <div className="text-center py-4 text-gray-300">로딩 중...</div>
          ) : (
            schools.map((school, index) => (
              <div
                key={index}
                className="px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                onClick={() => {
                  onSelect(school);
                  onClose();
                }}
              >
                {school}
              </div>
            ))
          )}
          {!isLoading && schools.length === 0 && (
            <div className="text-center py-4 text-gray-300">
              검색 결과가 없습니다.
              <button
                onClick={() => {
                  onSelect(searchValue); // 직접 추가
                  onClose();
                }}
                className="mt-2 underline text-primary-50"
              >
                {searchValue} 직접 추가하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
