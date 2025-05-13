'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editExp, saveExp, type ExpPayload } from '@/apis/exp';
import Popup from '@/app/components/Popup';
import GuideModal from './GuideModal';
import ExpInputBox from './ExpInputBox';
import Footer from '@/app/components/Footer';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { ExpFormType, ExpStatus, ExpType } from '@/types/exp';

interface ExpFormProps {
  data?: ExpPayload;
}

export default function ExpForm({ data }: ExpFormProps) {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    selectedTab: data?.formType == 'STAR_FORM' ? 'star' : 'simple',
    status: data?.status || 'SAVE',
    formType: data?.formType || 'STAR_FORM',
    experienceType: data?.experienceType || 'WORK',
    startDate: String(data?.startDate) || '',
    endDate: String(data?.endDate) || '',
    title: data?.title || '',
    situation: data?.situation || '',
    task: data?.task || '',
    action: data?.action || '',
    result: data?.result || '',
    keyword: data?.keyword || '',
    role: data?.role || '',
    perform: data?.perform || '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExpPayload = {
      ...form,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
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
          <div className="flex w-[340px] px-0.5 py-0.5 bg-gray-700 rounded-3xl gap-2">
            <button
              type="button"
              className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
                form.selectedTab === 'star'
                  ? 'bg-gray-300 text-gray-100'
                  : 'bg-gray-700 font-medium text-gray-300'
              }`}
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  formType: 'STAR_FORM',
                  selectedTab: 'star',
                }))
              }
            >
              STAR 양식
            </button>
            <button
              type="button"
              className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
                form.selectedTab === 'simple'
                  ? 'bg-gray-300 text-gray-1100'
                  : 'bg-gray-700 font-medium text-gray-300'
              }`}
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  formType: 'SIMPLE_FORM',
                  selectedTab: 'simple',
                }))
              }
            >
              간결 양식
            </button>
          </div>

          <div className="flex items-center gap-[12px]">
            <button type="button" onClick={() => setIsModalOpen(true)}>
              <HelpIcon className="stroke-gray-300" />
            </button>
            <div className="text-neutral-400 font-medium p-2">
              양식 활용 가이드
            </div>
          </div>
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
          onChange={e => handleChange('experienceType', e.target.value)}
        />

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            기간
          </div>
          <div className="flex gap-4">
            <ExpInputBox
              type="date"
              value={form.startDate}
              max={form.endDate}
              onChange={e => handleChange('startDate', e.target.value)}
            />
            <ExpInputBox
              type="date"
              value={form.endDate}
              min={form.startDate}
              onChange={e => handleChange('endDate', e.target.value)}
            />
          </div>
        </div>

        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          제목
        </div>
        <ExpInputBox
          type="string"
          placeholder="경험 제목"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
        />

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            {form.selectedTab === 'star' ? '상황' : '역할'}
          </div>
          <ExpInputBox
            type="textarea"
            placeholder={
              form.selectedTab === 'star'
                ? '어떤 배경에서 활동을 하게 되었나요?'
                : '어떤 역할을 맡았나요?'
            }
            value={form.selectedTab === 'star' ? form.situation : form.role}
            onChange={e =>
              form.selectedTab === 'star'
                ? handleChange('situation', e.target.value)
                : handleChange('role', e.target.value)
            }
          />
        </div>

        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          {form.selectedTab === 'star' ? '문제' : '주요 성과'}
        </div>
        <ExpInputBox
          type="textarea"
          placeholder={
            form.selectedTab === 'star'
              ? ' 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?'
              : '활동 내에서 자신의 주요 성과는 어떤 것이 있었나요?'
          }
          value={form.selectedTab === 'star' ? form.task : form.perform}
          onChange={e =>
            form.selectedTab === 'star'
              ? handleChange('task', e.target.value)
              : handleChange('perform', e.target.value)
          }
        />

        {form.selectedTab === 'star' && (
          <div>
            <div className="py-10">
              <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
                해결
              </div>
              <ExpInputBox
                type="textarea"
                placeholder="그 문제를 해결하기 위해 어떤 행동을 했나요?"
                value={form.action}
                onChange={e => handleChange('action', e.target.value)}
              />
            </div>

            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              결과
            </div>
            <ExpInputBox
              type="textarea"
              placeholder="선택한 행동의 결과는 어땠나요?"
              value={form.result}
              onChange={e => handleChange('result', e.target.value)}
            />
          </div>
        )}

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            키워드
          </div>
          <ExpInputBox
            type="string"
            placeholder="#태그 입력 (최대 30개)"
            value={form.keyword}
            onChange={e => handleChange('keyword', e.target.value)}
          />
        </div>
        <Footer />
      </div>
    </form>
  );
}
