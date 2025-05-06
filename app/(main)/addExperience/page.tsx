'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveExperience, type ExperiencePayload } from '@/apis/exp';
import Popup from '@/app/components/Popup';
import GuideModal from './components/GuideModal';
import ExperienceInputBox from './components/ExperienceInputBox';
import BtnExp from '@/app/components/BtnExp';
import Footer from '@/app/components/Footer';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import {
  ExperienceFormType,
  ExperienceStatus,
  ExperienceType,
} from '@/types/exp';

export default function AddExperiencePage() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    selectedTab: 'star',
    status: 'SAVE',
    formType: 'STAR_FORM',
    experienceType: '',
    startDate: '',
    endDate: '',
    title: '',
    situation: '',
    task: '',
    action: '',
    result: '',
    keyword: '',
    role: '',
    perform: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExperiencePayload = {
      ...form,
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      formType: form.formType as ExperienceFormType,
      experienceType: form.experienceType as ExperienceType,
      status: form.status as ExperienceStatus,
    };

    const data = await saveExperience(payload);
    console.log('서버 응답:', data);

    if (data?.httpStatus == 200) {
      alert('성공적으로 저장되었습니다!');
      router.push('/experience');
    } else {
      alert(`저장 실패: ${data?.message}`);
      console.log('보내는 payload:', payload);
    }
  };

  return (
    <div className="p-20">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <button type="button" onClick={() => setIsPopupOpen(true)}>
              <BackIcon className="stroke-gray-50" />
            </button>
            {isPopupOpen && (
              <Popup
                title="작성취소"
                content={`경험 작성을 취소하시겠습니까?\n취소하시면 입력하신 내용은 저장되지 않습니다.`}
                confirmText="작성 취소"
                cancelText="계속 작성"
                onConfirm={() => router.push('/experience')}
                onCancel={() => setIsPopupOpen(false)}
              />
            )}
            <div className="text-gray-50 text-2xl font-medium">경험 입력</div>
          </div>
          <div className="flex items-center gap-[9px]">
            <BtnExp
              type="submit"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  status: 'DRAFT',
                }))
              }
              className="bg-gray-900 text-gray-300 border border-gray-50-20"
            >
              임시저장
            </BtnExp>
            <BtnExp
              type="submit"
              onClick={() =>
                setForm(prev => ({
                  ...prev,
                  status: 'SAVE',
                }))
              }
              className="bg-primary-50 text-black"
            >
              작성완료
            </BtnExp>
          </div>
        </div>

        <div className="py-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex w-[340px] px-0.5 py-0.5 bg-gray-600 rounded-3xl gap-2">
              <button
                type="button"
                className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
                  form.selectedTab === 'star'
                    ? 'bg-gray-300 text-black'
                    : 'bg-gray-600 font-medium text-gray-300'
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
                    ? 'bg-gray-300 text-black'
                    : 'bg-gray-600 font-medium text-gray-300'
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
          <ExperienceInputBox
            type="select"
            value={form.experienceType}
            onChange={e => handleChange('experienceType', e.target.value)}
          />

          <div className="py-10">
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              기간
            </div>
            <div className="flex gap-4">
              <ExperienceInputBox
                type="date"
                value={form.startDate}
                max={form.endDate}
                onChange={e => handleChange('startDate', e.target.value)}
              />
              <ExperienceInputBox
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
          <ExperienceInputBox
            type="string"
            placeholder="경험 제목"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
          />

          <div className="py-10">
            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              {form.selectedTab === 'star' ? '상황' : '역할'}
            </div>
            <ExperienceInputBox
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
          <ExperienceInputBox
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
                <ExperienceInputBox
                  type="textarea"
                  placeholder="그 문제를 해결하기 위해 어떤 행동을 했나요?"
                  value={form.action}
                  onChange={e => handleChange('action', e.target.value)}
                />
              </div>

              <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
                결과
              </div>
              <ExperienceInputBox
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
            <ExperienceInputBox
              type="string"
              placeholder="#태그 입력 (최대 30개)"
              value={form.keyword}
              onChange={e => handleChange('keyword', e.target.value)}
            />
          </div>
          <Footer />
        </div>
      </form>
    </div>
  );
}
