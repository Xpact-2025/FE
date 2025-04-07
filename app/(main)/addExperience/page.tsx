'use client';

import { useState } from 'react';
import Image from 'next/image';
import GuideModal from './components/GuideModal';
import SelectInput from './components/ExperienceInputBox';
import DateInput from './components/ExperienceInputBox';
import TextInput from './components/ExperienceInputBox';
import TextAreaInput from './components/ExperienceInputBox';
import Footer from '@/app/components/Footer';

export default function StarExperiencePage() {
  const [selectedTab, setSelectedTab] = useState<'star' | 'simple'>('star');
  const [isModalOpen, setModalOpen] = useState(false);
  const [experienceType, setExperienceType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState('');
  const [perform, setPerform] = useState('');

  return (
    <div className="p-20">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Image src="/Chevron_Left.svg" alt="back" width={35} height={35} />
          <div className="text-gray-50 text-2xl font-medium">경험 입력</div>
        </div>
        <div className="flex items-center">
          <button className="w-30 py-3 bg-gray-900 text-sm text-gray-300 font-semibold border border-gray-50-20 rounded-lg">
            임시저장
          </button>
          <button className="w-30 py-3 bg-primary-50 text-sm text-black font-semibold rounded-lg">
            작성완료
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex w-[340px] px-0.5 py-0.5 bg-gray-600 rounded-3xl gap-2">
            <button
              className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
                selectedTab === 'star'
                  ? 'bg-gray-300 text-black'
                  : 'bg-gray-600 font-medium text-gray-300'
              }`}
              onClick={() => setSelectedTab('star')}
            >
              STAR 양식
            </button>
            <button
              className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
                selectedTab === 'simple'
                  ? 'bg-gray-300 text-black'
                  : 'bg-gray-600 font-medium text-gray-300'
              }`}
              onClick={() => setSelectedTab('simple')}
            >
              간결 양식
            </button>
          </div>

          <div className="flex items-center gap-[12px]">
            <button onClick={() => setModalOpen(true)}>
              <Image src="/Circle_Help.svg" alt="help" width={24} height={24} />
            </button>
            <div className="text-neutral-400 font-medium p-2">
              양식 활용 가이드
            </div>
          </div>
        </div>
        {isModalOpen && (
          <GuideModal
            title={
              selectedTab === 'star'
                ? 'STAR양식 작성 가이드'
                : '간결 양식 작성 가이드'
            }
            type={selectedTab}
            closeRequest={() => setModalOpen(false)}
          />
        )}
      </div>

      <div className="px-12">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          경험 유형
        </div>
        <SelectInput
          type="select"
          value={experienceType}
          min={startDate}
          onChange={e => setExperienceType(e.target.value)}
        />

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            기간
          </div>
          <div className="flex gap-4">
            <DateInput
              type="date"
              value={startDate}
              max={endDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <DateInput
              type="date"
              value={endDate}
              min={startDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          제목
        </div>
        <TextInput
          type="string"
          placeholder="경험 제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            {selectedTab === 'star' ? '상황' : '역할'}
          </div>
          <TextAreaInput
            type="textarea"
            placeholder={
              selectedTab === 'star'
                ? '어떤 배경에서 활동을 하게 되었나요?'
                : '어떤 역할을 맡았나요?'
            }
            value={selectedTab === 'star' ? situation : role}
            onChange={e =>
              selectedTab === 'star'
                ? setSituation(e.target.value)
                : setRole(e.target.value)
            }
          />
        </div>

        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          {selectedTab === 'star' ? '문제' : '주요 성과'}
        </div>
        <TextAreaInput
          type="textarea"
          placeholder={
            selectedTab === 'star'
              ? ' 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?'
              : '활동 내에서 자신의 주요 성과는 어떤 것이 있었나요?'
          }
          value={selectedTab === 'star' ? task : perform}
          onChange={e =>
            selectedTab === 'star'
              ? setTask(e.target.value)
              : setPerform(e.target.value)
          }
        />

        {selectedTab === 'star' && (
          <div>
            <div className="py-10">
              <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
                해결
              </div>
              <TextAreaInput
                type="textarea"
                placeholder="그 문제를 해결하기 위해 어떤 행동을 했나요?"
                value={action}
                onChange={e => setAction(e.target.value)}
              />
            </div>

            <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
              결과
            </div>
            <TextAreaInput
              type="textarea"
              placeholder="선택한 행동의 결과는 어땠나요?"
              value={result}
              onChange={e => setResult(e.target.value)}
            />
          </div>
        )}

        <div className="py-10">
          <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
            키워드
          </div>
          <TextInput
            type="string"
            placeholder="#태그 입력 (최대 30개)"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}
