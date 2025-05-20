'use client';

import React, { useState } from 'react';
import { fetchJobsByIndustry } from '@/apis/industry';

interface IndustryModalProps {
  isOpen: boolean;
  onClose: () => void;
  industries: string[];
  onSelect: (job: string) => void;
  searchValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export default function IndustryModal({
  isOpen,
  onClose,
  industries,
  onSelect,
  searchValue,
  onChange,
  onSearch,
}: IndustryModalProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [subJobs, setSubJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleIndustryClick = async (industry: string) => {
    setSelectedIndustry(industry);
    setIsLoading(true);
    try {
      const jobs = await fetchJobsByIndustry(industry);
      setSubJobs(jobs);
    } catch (e) {
      console.error('상세 직무 불러오기 실패', e);
      setSubJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
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
        <div className="absolute top-12 right-9 flex gap-1">
          <button
            onClick={() => {
              setSelectedIndustry('');
              setSubJobs([]);
            }}
            className={`w-2 h-2 rounded-full transition ${
              selectedIndustry ? 'bg-white' : 'bg-gray-400'
            } hover:bg-primary-50`}
            aria-label="산업군으로 돌아가기"
          />
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
        </div>

        <div className="text-[20px] font-bold mb-1 text-gray-50">
          희망 직무 조회
        </div>
        <p className="text-sm text-gray-300 mb-4">
          희망하는 산업군을 선택 후, 상세 직무를 선택해 주세요.
          <br></br>
          검색해서 추가해 주세요. 조회되지 않는 경우, &rsquo;직접
          추가하기&rsquo; 버튼을 눌러 추가해 주세요.
        </p>

        {/* 검색창 */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="산업군 검색"
            value={searchValue}
            onChange={onChange}
            className="flex-1 h-[44px] px-4 py-2 bg-gray-600 text-white rounded border border-gray-400"
          />
          <button
            onClick={onSearch}
            className="w-[80px] bg-primary-50 hover:bg-primary-100 rounded-[8px] text-black font-semibold ml-2"
          >
            검색
          </button>
        </div>

        {/* 목록 */}
        <div className="bg-[#1e1e1e] rounded-md max-h-[250px] overflow-y-auto px-2 py-3">
          {!selectedIndustry &&
            (isLoading ? (
              <div className="text-center py-4 text-gray-300">로딩 중...</div>
            ) : (
              industries.map((industry, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                  onClick={() => handleIndustryClick(industry)}
                >
                  {industry}
                </div>
              ))
            ))}

          {selectedIndustry && (
            <>
              <div className="text-sm text-gray-300 px-4 mb-2">
                {selectedIndustry} 상세 직무 선택
              </div>
              {isLoading ? (
                <div className="text-center py-4">로딩 중...</div>
              ) : (
                subJobs.map((job, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                    onClick={() => {
                      onSelect(job);
                      setSelectedIndustry('');
                      setSubJobs([]);
                      onClose();
                    }}
                  >
                    {job}
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
