'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Popup from '@/app/components/Popup';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import { getExpById, deleteExp, ExpPayload, SubExperience } from '@/apis/exp';
import ExpHeader from '../components/ExpDetailHeader';
import ExpTabs from '../components/ExpTabs';
import ExpDetailContent from '../components/ExpDetailContent';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ExpForm from '../../addExp/components/ExpForm';

export default function ExpDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<ExpPayload | null>(null);
  const [subDataList, setSubDataList] = useState<SubExperience[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(
    () => searchParams.get('edit') === 'true'
  );
  const [editTitle, setEditTitle] = useState('');
  const [editQualification, setEditQualification] = useState('');
  const [editPublisher, setEditPublisher] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editIssueDate, setEditIssueDate] = useState('');

  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [localFiles, setLocalFiles] = useState<string[]>([]);

  const handleDeleteSubExp = (indexToDelete: number) => {
    const newList = subDataList.filter((_, i) => i !== indexToDelete);
    setSubDataList(newList);
    if (selectedTabIndex >= newList.length) {
      setSelectedTabIndex(Math.max(0, newList.length - 1));
    }
    setDeleteIndex(null);
  };

  const handleAddSubExperience = () => {
    const newSub: SubExperience = {
      formType: 'STAR_FORM',
      uploadType: 'FILE',
      tabName: '',
      subTitle: '',
      role: '',
      perform: '',
      situation: '',
      task: '',
      action: '',
      result: '',
      simpleDescription: '',
      keywords: [],
      files: [],
      status: 'SAVE',
    };
    setSubDataList(prev => {
      const updated = [...prev, newSub];
      setSelectedTabIndex(updated.length - 1);
      return updated;
    });
  };

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
        const subList = res.data.subExperiencesResponseDto ?? [];
        setSubDataList(subList);
        setEditTitle(res.data.title || '');
        setEditQualification(res.data.qualification || '');
        setEditPublisher(res.data.publisher || '');
        setEditStartDate(res.data.startDate || '');
        setEditEndDate(res.data.endDate || '');
        setEditIssueDate(res.data.issueDate || '');
        setLocalFiles(subList[0]?.files || []);
      } catch (e) {
        console.error('경험 데이터를 불러오는 데 실패했습니다.', e);
        setError('경험 데이터를 불러오는 데 실패했습니다.');
      }
    };
    fetchData();
  }, [params?.id]);

  useEffect(() => {
    setLocalFiles(subDataList[selectedTabIndex]?.files ?? []);
  }, [selectedTabIndex, subDataList]);

  if (error) return <div className="text-red-500 p-10">{error}</div>;
  if (!data || !currentSubData)
    return (
      <div className="h-[80%] flex justify-center items-center bg-black">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="pr-20 pl-20 pb-20">
      <div className="flex justify-between w-full mb-6">
        <div className="flex items-center">
          <button type="button" onClick={() => router.push('/exp')}>
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px] cursor-pointer" />
          </button>
          <div className="text-3xl font-bold ml-2 text-white">경험 상세</div>
        </div>
      </div>

      {isEditing ? (
        <>
          <ExpForm
            data={{
              id: data.experienceId,
              experienceType: data.experienceType,
              title: editTitle,
              qualification: editQualification,
              publisher: editPublisher,
              startDate: editStartDate,
              endDate: editEndDate,
              issueDate: editIssueDate,
              subExperiences: subDataList,
              subExperiencesResponseDto: subDataList,
            }}
            isEditMode={true}
            onSuccess={async () => {
              setIsEditing(false);
              const res = await getExpById(Number(params?.id));
              setData(res.data);
              setSubDataList(res.data.subExperiencesResponseDto ?? []);
              setEditTitle(res.data.title || '');
              setEditQualification(res.data.qualification || '');
              setEditPublisher(res.data.publisher || '');
              setEditStartDate(res.data.startDate || '');
              setEditEndDate(res.data.endDate || '');
              setEditIssueDate(res.data.issueDate || '');
            }}
          />
        </>
      ) : (
        <>
          <ExpHeader
            experienceType={data.experienceType}
            title={editTitle}
            qualification={editQualification}
            publisher={editPublisher}
            issueDate={editIssueDate}
            startDate={editStartDate}
            endDate={editEndDate}
            isEditing={false}
            onChange={{}} // 수정 아님
          />

          <ExpTabs
            subDataList={subDataList}
            selectedIndex={selectedTabIndex}
            onSelect={setSelectedTabIndex}
            isEditing={false}
            onRemoveClick={index => setDeleteIndex(index)}
            onRequestFullDelete={() => setIsPopupOpen(true)}
            onAddClick={handleAddSubExperience}
            onTabNameChange={(index, newName) => {
              const updated = [...subDataList];
              updated[index] = { ...updated[index], tabName: newName };
              setSubDataList(updated);
            }}
          />

          {deleteIndex !== null && (
            <Popup
              title="세부 경험 삭제"
              content="이 세부 경험 내용을 정말 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={() => handleDeleteSubExp(deleteIndex)}
              onCancel={() => setDeleteIndex(null)}
            />
          )}

          {isPopupOpen && (
            <Popup
              title="전체 경험 삭제"
              content={
                '해당 경험 카드의 모든 내용이 삭제됩니다. \n세부 경험만 삭제하려면 ‘수정’에서 개별 삭제해 주세요.'
              }
              confirmText="삭제"
              cancelText="취소"
              onConfirm={async () => {
                await deleteExp(Number(params?.id));
                router.push('/exp');
              }}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}

          <ExpDetailContent
            data={data}
            subData={currentSubData}
            isEditing={false}
            localFiles={localFiles}
            setLocalFiles={setLocalFiles}
            onChange={(field, value) => {
              const updated = [...subDataList];
              updated[selectedTabIndex] = {
                ...updated[selectedTabIndex],
                [field]: value,
              };
              setSubDataList(updated);
            }}
          />

          <div className="flex items-center gap-[9px] mt-8">
            <button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              className="w-[50%] py-3 bg-gray-1000 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg cursor-pointer"
            >
              삭제
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-[50%] py-3 bg-primary-50 text-sm text-gray-1100 font-semibold rounded-lg cursor-pointer"
            >
              수정
            </button>
          </div>
        </>
      )}
    </div>
  );
}
