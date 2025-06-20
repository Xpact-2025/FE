'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Popup from '@/app/components/Popup';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import {
  getExpById,
  deleteExp,
  editExp,
  ExpPayload,
  SubExperience,
} from '@/apis/exp';
import ExpHeader from '../components/ExpDetailHeader';
import ExpTabs from '../components/ExpTabs';
import ExpDetailContent from '../components/ExpDetailContent';

export default function ExpDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<ExpPayload | null>(null);
  const [subDataList, setSubDataList] = useState<SubExperience[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentSubData = subDataList[selectedTabIndex] ?? null;

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
        setSubDataList(res.data.subExperiencesResponseDto ?? []);
      } catch (e) {
        setError('경험 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchData();
  }, [params?.id]);

  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!data || !currentSubData)
    return <div className="text-gray-400 p-10">로딩 중...</div>;

  return (
    <div className="p-20">
      {/* 상단 버튼 */}
      <div className="flex justify-between w-full mb-6">
        <div className="flex items-center">
          <button type="button" onClick={() => router.push('/exp')}>
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px]" />
          </button>
          <div className="text-3xl font-bold ml-2 text-white">경험 상세</div>
        </div>
      </div>

      {/* 헤더 정보 */}
      <ExpHeader
        experienceType={data.experienceType}
        title={data.title as string}
        qualification={data.qualification}
        publisher={data.publisher}
        issueDate={data.issueDate}
        startDate={data.startDate ?? ''}
        endDate={data.endDate ?? ''}
      />

      {/* 탭 영역 */}
      <ExpTabs
        subDataList={subDataList}
        selectedIndex={selectedTabIndex}
        onSelect={setSelectedTabIndex}
      />

      {/* 세부 내용 */}
      <ExpDetailContent data={data} subData={currentSubData} />

      {/* 하단 버튼 */}
      <div className="flex items-center gap-[9px] mt-8">
        <button
          type="button"
          onClick={() => setIsPopupOpen(true)}
          className="w-[50%] py-3 bg-gray-1000 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg"
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
              ...data,
              subExperiences: subDataList,
            });
          }}
          className="w-[50%] py-3 bg-primary-50 text-sm text-gray-1100 font-semibold rounded-lg"
        >
          수정
        </button>
      </div>
    </div>
  );
}
