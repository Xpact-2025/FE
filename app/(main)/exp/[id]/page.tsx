'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  ExpPayload,
  getExpById,
  deleteExp,
  editExp,
  SubExperience,
} from '@/apis/exp';
import { EXP_OPTIONS } from '@/constants/expOptions';
import { useRouter } from 'next/navigation';
import Popup from '@/app/components/Popup';
import BackIcon from '@/public/icons/Chevron_Left.svg';

export default function ExpDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editData, setEditData] = useState<ExpPayload>({} as ExpPayload);
  const [data, setData] = useState<ExpPayload | null>(null);
  const [subData, setSubData] = useState<SubExperience | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const expId = Number(params?.id);
      if (isNaN(expId)) {
        setError('잘못된 접근입니다.');
        return;
      }

      try {
        const res = await getExpById(expId);
        setData(res.data);
        setEditData(res.data);

        const firstSub = res.data.subExperiences?.[0] ?? null;
        setSubData(firstSub);
      } catch {
        setError('경험 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchData();
  }, [params?.id]);

  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!data) return <div className="text-gray-400 p-10">로딩 중...</div>;

  const experienceLabel =
    EXP_OPTIONS[data.experienceType]?.label || data.experienceType;

  const renderPrizeSection = () => (
    <>
      {data.qualification && <p>수상명: {data.qualification}</p>}
      {data.publisher && <p>대회명 · 주최기관: {data.publisher}</p>}
      {data.issueDate && (
        <p>수상일: {new Date(data.issueDate).toLocaleDateString('ko-KR')}</p>
      )}
      {subData?.simpleDescription && (
        <p>간단 설명: {subData.simpleDescription}</p>
      )}
    </>
  );

  const renderCertificateSection = () => (
    <>
      {data.qualification && <p>자격증명: {data.qualification}</p>}
      {data.publisher && <p>발행처: {data.publisher}</p>}
      {data.issueDate && (
        <p>취득일: {new Date(data.issueDate).toLocaleDateString('ko-KR')}</p>
      )}
      {subData?.simpleDescription && (
        <p>간단 설명: {subData.simpleDescription}</p>
      )}
    </>
  );

  const renderSimpleSection = () => (
    <>
      {data.startDate && data.endDate && (
        <p>
          기간: {new Date(data.startDate).toLocaleDateString('ko-KR')} ~{' '}
          {new Date(data.endDate).toLocaleDateString('ko-KR')}
        </p>
      )}
      {subData?.role && <p>역할: {subData.role}</p>}
      {subData?.perform && <p>주요 성과: {subData.perform}</p>}
    </>
  );

  const renderStarSection = () => (
    <>
      {data.title && <p>경험 제목: {data.title}</p>}
      {data.startDate && data.endDate && (
        <p>
          기간: {new Date(data.startDate).toLocaleDateString('ko-KR')} ~{' '}
          {new Date(data.endDate).toLocaleDateString('ko-KR')}
        </p>
      )}
      {subData?.situation && <p>상황: {subData.situation}</p>}
      {subData?.task && <p>문제: {subData.task}</p>}
      {subData?.action && <p>행동: {subData.action}</p>}
      {subData?.result && <p>결과: {subData.result}</p>}
    </>
  );

  const renderDetailContent = () => {
    if (subData?.formType === 'SIMPLE_FORM') {
      if (data.experienceType === 'PRIZE') return renderPrizeSection();
      if (data.experienceType === 'CERTIFICATES')
        return renderCertificateSection();
      return renderSimpleSection();
    }

    if (subData?.formType === 'STAR_FORM') return renderStarSection();

    return null;
  };

  return (
    <div className="p-20">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              router.push('/exp');
            }}
          >
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px]" />
          </button>
          <div className="text-3xl font-bold">경험 상세</div>
        </div>
        <div className="flex items-center gap-[9px]">
          <button
            type="button"
            onClick={async () => {
              setIsPopupOpen(true);
            }}
            className="w-20 py-3 bg-gray-1000 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg"
          >
            삭제
          </button>
          {isPopupOpen && (
            <Popup
              title="경험 삭제"
              content={`경험을 삭제하시겠습니까?\n삭제하시면 다시 복구할 수 없습니다.`}
              confirmText="삭제"
              cancelText="취소"
              onConfirm={async () => {
                await deleteExp(Number(params?.id));
                router.push('/exp');
              }}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}
          <button
            type="button"
            onClick={async () => {
              await editExp(Number(params?.id), {
                ...editData,
                subExperiences: editData.subExperiences ?? [],
              });
            }}
            className="w-20 py-3 bg-primary-50 text-sm text-gray-1100 font-semibold rounded-lg"
          >
            수정
          </button>
        </div>
      </div>

      <section className="bg-gray-800 p-8 rounded-[14px] text-gray-100">
        <h2 className="text-[21px] font-semibold mb-6 text-gray-50">내용</h2>
        <div className="bg-gray-700 p-6 rounded-[4px] space-y-4 border border-gray-600 leading-relaxed">
          <p>경험 유형: {experienceLabel}</p>
          {renderDetailContent()}
        </div>
        {!['수상', '자격증'].includes(experienceLabel) && (
          <div className="mt-10">
            <h3 className="text-[21px] font-semibold mb-6 text-gray-50">
              키워드
            </h3>
            <div className="bg-gray-700 p-3 rounded-[4px] border border-gray-600">
              <div className="flex flex-wrap gap-2">
                {subData?.keywords?.map((keyword: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-1 bg-gray-300 text-sm rounded-full text-gray-1100"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
