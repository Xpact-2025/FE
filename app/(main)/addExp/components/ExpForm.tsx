'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editExp, saveExp, type ExpPayload } from '@/apis/exp';
import FormTab from './FormTab';
import Popup from '@/app/components/Popup';
import GuideModal from './GuideModal';
import ExpInputBox from './ExpInputBox';
import Footer from '@/app/components/Footer';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { ExpFormType, ExpStatus, ExpType } from '@/types/exp';
import AwardForm from './AwardForm';
import StarForm from './StarForm';
import SimpleForm from './SimpleForm';

interface ExpFormProps {
  data?: ExpPayload;
}

export default function ExpForm({ data }: ExpFormProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  const [form, setForm] = useState({
    selectedTab: data?.formType == 'STAR_FORM' ? 'star' : 'simple',
    status: data?.status || 'SAVE',
    formType: data?.formType || 'STAR_FORM',
    experienceType: data?.experienceType || '',
  });

  const handleTabChange = (value: {
    formType: ExpFormType;
    selectedTab: string;
  }) => {
    setForm(prev => ({
      ...prev,
      formType: value.formType,
      selectedTab: value.selectedTab,
    }));
  };

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExpPayload = {
      ...form,
      formType: form.formType as ExpFormType,
      experienceType: form.experienceType as ExpType,
      status: form.status as ExpStatus,
    };

    const { httpStatus, message } = data?.id
      ? await editExp(data.id, payload)
      : await saveExp(payload);
    console.log('서버 응답:', data);

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
          onChange={(key, value) => handleChange(key, value)}
        />
      );
    } else if (form.formType === 'STAR_FORM') {
      return <StarForm onChange={(key, value) => handleChange(key, value)} />;
    } else if (form.formType === 'SIMPLE_FORM') {
      return <SimpleForm onChange={(key, value) => handleChange(key, value)} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button type="button" onClick={() => setIsPopupOpen(true)}>
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px]" />
          </button>
          {isPopupOpen && (
            <Popup
              title="작성취소"
              content={`경험 작성을 취소하시겠습니까?\n취소하시면 입력하신 내용은 저장되지 않습니다.`}
              confirmText="작성 취소"
              cancelText="계속 작성"
              onConfirm={() => router.push('/exp')}
              onCancel={() => setIsPopupOpen(false)}
            />
          )}
          <div className="text-gray-50 text-2xl font-medium">경험 입력</div>
        </div>
        <div className="flex items-center gap-[9px]">
          <button
            type="submit"
            onClick={() =>
              setForm(prev => ({
                ...prev,
                status: 'DRAFT',
              }))
            }
            className="w-20 py-3 bg-gray-1000 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg"
          >
            임시저장
          </button>
          <button
            type="submit"
            onClick={() =>
              setForm(prev => ({
                ...prev,
                status: 'SAVE',
              }))
            }
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
              <FormTab onChange={handleTabChange} />
              <div className="flex items-center gap-[12px]">
                <button type="button" onClick={() => setIsModalOpen(true)}>
                  <HelpIcon className="stroke-gray-300" />
                </button>
                <div className="text-neutral-400 font-medium p-2">
                  양식 활용 가이드
                </div>
              </div>
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
            type={form.selectedTab as 'star' | 'simple'}
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
            handleChange('experienceType', e.target.value);

            if (
              e.target.value === 'CERTIFICATES' ||
              e.target.value === 'PRIZE'
            ) {
              setIsTabVisible(false);
            } else {
              setIsTabVisible(true);
            }
          }}
        />
        {renderForm()}
      </div>
      <Footer />
    </form>
  );
}
