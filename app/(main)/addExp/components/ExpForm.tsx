'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editExp, saveExp, SubExperience, type ExpPayload } from '@/apis/exp';
import FormTab from './FormTab';
import Popup from '@/app/components/Popup';
import GuideModal from './GuideModal';
import ExpInputBox from './ExpInputBox';
import Footer from '@/app/components/Footer';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { ExpFormType, ExpType } from '@/types/exp';
import AwardForm from './AwardForm';
import StarForm from './StarForm';
import SimpleForm from './SimpleForm';

interface ExpFormProps {
  data: ExpPayload & { subExperiencesResponseDto: SubExperience[] };
}

const getInitialForm = (
  data?: ExpPayload & { subExperiencesResponseDto?: SubExperience[] }
) => {
  const sub = data?.subExperiencesResponseDto?.[0];

  return {
    subExperiences: data?.subExperiencesResponseDto || [],
    selectedTab:
      sub?.formType === 'STAR_FORM'
        ? 'star'
        : sub?.formType === 'SIMPLE_FORM'
          ? 'simple'
          : 'star',
    status: sub?.status || 'SAVE',
    formType: sub?.formType || 'STAR_FORM',
    uploadType: sub?.uploadType || 'FILE',
    experienceType: data?.experienceType || ('' as ExpType),
    qualification: data?.qualification || '',
    publisher: data?.publisher || '',
    issueDate: data?.issueDate || '',
    simpleDescription: sub?.simpleDescription || '',
    title: data?.title || '',
    startDate: data?.startDate || '',
    endDate: data?.endDate || '',
    role: sub?.role || '',
    perform: sub?.perform || '',
    situation: sub?.situation || '',
    task: sub?.task || '',
    action: sub?.action || '',
    result: sub?.result || '',
    files: sub?.files || [],
    keywords: sub?.keywords || [],
    id: data?.id,
    subId: sub?.id,
  };
};

export default function ExpForm({ data }: ExpFormProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [pendingFormType, setPendingFormType] = useState<ExpFormType | null>(
    null
  );

  const [form, setForm] = useState(getInitialForm(data));
  const [tab, setTab] = useState<'star' | 'simple'>('star');

  const isFormChanged = () => {
    const keysToCompare = [
      'qualification',
      'publisher',
      'issueDate',
      'simpleDescription',
      'title',
      'startDate',
      'endDate',
      'role',
      'perform',
      'situation',
      'task',
      'action',
      'result',
      'files',
      'keywords',
    ] as (keyof ExpPayload)[];

    if (!data) {
      const allEmpty = keysToCompare.every(key => {
        const val = form[key as keyof typeof form];
        if (val === undefined || val === null) return true;
        if (typeof val === 'string' && val.trim() === '') return true;
        if (Array.isArray(val) && val.length === 0) return true;
        return false;
      });
      return !allEmpty;
    }

    return keysToCompare.some(key => {
      return (
        JSON.stringify(form[key as keyof typeof form]) !==
        JSON.stringify(data[key])
      );
    });
  };

  const confirmTabChange = () => {
    if (pendingFormType) {
      setForm({
        ...getInitialForm(undefined),
        formType: pendingFormType,
        selectedTab: pendingFormType === 'STAR_FORM' ? 'star' : 'simple',
      });
      setPendingFormType(null);
      setIsPopupOpen(false);
    }
  };

  const handleTabChange = (value: {
    formType: ExpFormType;
    selectedTab: 'star' | 'simple';
  }) => {
    if (isFormChanged()) {
      setPendingFormType(value.formType);
      setIsPopupOpen(true);
    } else {
      setForm(prev => ({
        ...prev,
        formType: value.formType,
        selectedTab: value.selectedTab,
      }));
      setTab(value.selectedTab);
    }
  };

  const handleChange = (key: string, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExpPayload = {
      ...form,
      issueDate: form.issueDate
        ? new Date(form.issueDate).toISOString()
        : undefined,
      startDate: form.startDate
        ? new Date(form.startDate).toISOString()
        : undefined,
      endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
    };

    const { httpStatus, message } = form.id
      ? await editExp(form.id, {
          ...payload,
          subExperiences: form.subExperiences,
        })
      : await saveExp({
          ...payload,
          subExperiences: form.subExperiences || [],
        });

    if (httpStatus == 200) {
      alert('성공적으로 저장되었습니다!');
      router.push('/exp');
    } else {
      alert(`저장 실패: ${message}`);
      console.log('보내는 payload:', payload);
    }
  };

  const renderForm = () => {
    if (
      form.experienceType === 'CERTIFICATES' ||
      form.experienceType === 'PRIZE'
    ) {
      return (
        <AwardForm
          experienceType={form.experienceType}
          onChange={handleChange}
        />
      );
    }
    if (form.formType === 'STAR_FORM') {
      return <StarForm onChange={handleChange} />;
    }
    return <SimpleForm onChange={handleChange} />;
  };

  return (
    <form onSubmit={handleSubmit} className="p-20">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              setPendingFormType(null);
              setIsPopupOpen(true);
            }}
          >
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px]" />
          </button>
          {isPopupOpen && !pendingFormType && (
            <Popup
              title="작성취소"
              content={`경험 작성을 취소하시겠습니까?\n취소하시면 입력하신 내용은 저장되지 않습니다.`}
              confirmText="작성 취소"
              cancelText="계속 작성"
              onConfirm={() => router.push('/exp')}
              onCancel={() => {
                setIsPopupOpen(false);
              }}
            />
          )}
          <div className="text-gray-50 text-2xl font-medium">경험 입력</div>
        </div>
        <div className="flex items-center gap-[9px]">
          <button
            type="submit"
            onClick={() => {
              setForm(prev => ({
                ...prev,
                status: 'DRAFT',
              }));
            }}
            className="w-20 py-3 bg-gray-1000 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg"
          >
            임시저장
          </button>
          <button
            type="submit"
            onClick={() => {
              setForm(prev => ({
                ...prev,
                status: 'SAVE',
              }));
            }}
            className="w-20 py-3 bg-primary-50 text-sm text-gray-1100 font-semibold rounded-lg"
          >
            작성완료
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="flex items-center justify-between w-full">
          {isTabVisible && (
            <>
              <FormTab onChange={handleTabChange} selectedTab={tab} />
              <div className="flex items-center gap-[12px]">
                <button type="button" onClick={() => setIsModalOpen(true)}>
                  <HelpIcon className="stroke-gray-300" />
                </button>
                <div className="text-neutral-400 font-medium p-2">
                  양식 활용 가이드
                </div>
              </div>
              {isPopupOpen && pendingFormType && (
                <Popup
                  title="양식 변경"
                  content={`${pendingFormType === 'STAR_FORM' ? 'STAR 양식' : '간결 양식'}으로 변경하시겠습니까?\n변경하시면 입력하신 내용은 저장되지 않습니다.`}
                  confirmText="양식 변경"
                  cancelText="계속 작성"
                  onConfirm={confirmTabChange}
                  onCancel={() => setIsPopupOpen(false)}
                />
              )}
            </>
          )}
        </div>
        {isModalOpen && (
          <GuideModal
            title={
              form.selectedTab === 'star'
                ? 'STAR양식 작성 가이드'
                : '간결 양식 작성 가이드'
            }
            type={tab}
            closeRequest={() => setIsModalOpen(false)}
          />
        )}
      </div>

      <div className="px-12">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          경험 유형
        </div>
        <ExpInputBox
          type="select"
          value={form.experienceType}
          onChange={e => {
            const newType = e.target.value;
            handleChange('experienceType', newType);
            setIsTabVisible(
              !(newType === 'CERTIFICATES' || newType === 'PRIZE')
            );
          }}
        />
        {renderForm()}
      </div>
      <Footer />
    </form>
  );
}
