'use client';

import React, { useState } from 'react';
import { fetchJobsByIndustry, searchDetailJobs } from '@/apis/industry';
import LoadingSpinner from '@/app/components/LoadingSpinner';

interface IndustryModalProps {
  isOpen: boolean;
  onClose: () => void;
  industries: string[];
  onSelect: (recruitName: string, detailRecruitName: string) => void;
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
  isLoading,
}: IndustryModalProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [subJobs, setSubJobs] = useState<string[]>([]);
  const [loadingSubJobs, setLoadingSubJobs] = useState(false);

  if (!isOpen) return null;

  const handleIndustryClick = async (industry: string) => {
    setSelectedIndustry(industry);
    setLoadingSubJobs(true);
    try {
      const jobs = await fetchJobsByIndustry(industry);
      setSubJobs(jobs);
    } catch (e) {
      console.error('상세 직무 불러오기 실패', e);
      setSubJobs([]);
    } finally {
      setLoadingSubJobs(false);
    }
  };

  const handleDetailSearch = async () => {
    if (!selectedIndustry || !searchValue.trim()) return;
    setLoadingSubJobs(true);
    try {
      const jobs = await searchDetailJobs(selectedIndustry, searchValue.trim());
      setSubJobs(jobs);
    } catch (e) {
      console.error('상세 직무 검색 실패', e);
      setSubJobs([]);
    } finally {
      setLoadingSubJobs(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleDetailSearch();
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

        {/* 제목 */}
        <div className="text-[20px] font-bold mb-1 text-gray-50">
          희망 직무 조회
        </div>
        <p className="text-sm text-gray-300 mb-4">
          검색해서 추가해 주세요. 조회되지 않는 경우, ‘직접 추가하기’ 버튼을
          눌러 추가해 주세요.
        </p>

        {/* 검색창 */}
        {selectedIndustry && (
          <div className="flex mb-6">
            <input
              type="text"
              placeholder="희망 직무 검색"
              value={searchValue}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              className="flex-1 h-[44px] px-4 py-2 bg-gray-600 text-white rounded border border-gray-400"
            />
            <button
              onClick={handleDetailSearch}
              className="w-[80px] bg-primary-50 hover:bg-primary-100 rounded-[8px] text-black font-semibold ml-2"
            >
              검색
            </button>
          </div>
        )}

        {/* 탭 헤더 */}
        <div className="flex">
          <button
            className={`w-1/5 py-2 text-center font-medium rounded-t-[6px] cursor-pointer ${
              !selectedIndustry ? 'bg-gray-400' : 'bg-gray-600 text-gray-300'
            }`}
            onClick={() => {
              setSelectedIndustry('');
              setSubJobs([]);
            }}
          >
            산업군
          </button>
          <button
            className={`ml-2 w-1/5 py-2 text-center font-medium rounded-t-[6px] ${
              selectedIndustry ? 'bg-gray-400' : 'bg-gray-600 text-gray-300'
            }`}
            disabled={!selectedIndustry}
          >
            직무
          </button>
        </div>

        {/* 리스트 */}
        <div className="bg-gray-600 rounded-tr-md rounded-br-md rounded-bl-md max-h-[250px] overflow-y-auto px-2 py-3 border border-gray-400">
          {!selectedIndustry &&
            (isLoading ? (
              <LoadingSpinner />
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
              {loadingSubJobs ? (
                <div className="text-center py-4">
                  <LoadingSpinner />
                </div>
              ) : subJobs.length > 0 ? (
                subJobs.map((job, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded hover:bg-orange-500 cursor-pointer"
                    onClick={() => {
                      onSelect(selectedIndustry, job);
                      setSelectedIndustry('');
                      setSubJobs([]);
                      onClose();
                    }}
                  >
                    {job}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">
                      {searchValue}
                    </span>
                    <button
                      onClick={() => {
                        onSelect(selectedIndustry, searchValue);
                        setSelectedIndustry('');
                        setSubJobs([]);
                        onClose();
                      }}
                      className="text-sm bg-black text-white px-2 py-[2px] rounded cursor-pointer"
                    >
                      직접 추가하기
                    </button>
                  </div>
                  <div className="text-gray-400 text-sm">
                    검색 결과가 없습니다.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
