'use client';

import { useState } from 'react';
import Image from 'next/image';
import GuideModal from '../components/GuideModal';
import SelectInput from '../components/ExperienceInputBox';
import DateInput from '../components/ExperienceInputBox';
import TextInput from '../components/ExperienceInputBox';
import TextAreaInput from '../components/ExperienceInputBox';
import Footer from '@/app/components/Footer';

export default function SimpleExperiencePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [experienceType, setExperienceType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [perform, setPerform] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="p-16">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Image src="/Chevron_Left.svg" alt="back" width={35} height={35} />
          <div className="text-[26px]">경험 입력</div>
        </div>
        <div className="flex items-center">
          <button className="w-30 py-3 bg-black text-[14px] text-[#777] font-semibold rounded">
            임시저장
          </button>
          <button className="w-30 py-3 bg-[#FF6D03] text-[14px] text-black font-semibold rounded">
            작성완료
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="flex items-center justify-between w-full">
          <div>Tab bar</div>
          <div className="flex items-center">
            <button onClick={() => setModalOpen(true)}>
              <Image src="/Circle_Help.svg" alt="help" width={24} height={24} />
            </button>
            <div className="text-[16px] text-[#777] p-2">양식 활용 가이드</div>
          </div>
        </div>
        {isModalOpen && (
          <GuideModal
            title="간결 양식 작성 가이드"
            content={
              <div>
                <p>
                  간결 양식은 경험을 역할과 주요 성과 중심으로 요약해 정리하는
                  방식입니다.
                </p>
                <p>
                  짧은 문장으로 내가 어떤 일을 했고, 어떤 성과를 냈는지를 빠르게
                  보여줄 수 있어요.
                </p>
                <br></br>

                <p>
                  역할: 경험 속에서 내가 맡았던 역할과 수행한 주요 업무를 작성해
                  주세요.
                </p>
                <p>
                  → 예:
                  {` "데이터 전처리와 모델링을 전담하고, 분석 결과를 바탕으로 팀 발표 자료를 제작했습니다."`}
                </p>
                <br></br>

                <p>
                  주요 성과: 내가 기여한 결과나 변화, 또는 외부로부터 받은 평가
                  등을 정리해 주세요.
                </p>
                <p>
                  → 예:
                  {` "모델 정확도를 82%까지 향상시켰고, 분석 결과가 최종 발표에서 우수 사례로 선정되었습니다."`}
                </p>
              </div>
            }
            closeRequest={() => setModalOpen(false)}
          />
        )}
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">경험 유형</div>
      <SelectInput
        type="select"
        value={experienceType}
        min={startDate}
        onChange={e => setExperienceType(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">기간</div>
        <div className="flex">
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

      <div className="text-[16px] mb-[2%] ml-[1%]">제목</div>
      <TextInput
        type="string"
        placeholder="경험 제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">역할</div>
        <TextAreaInput
          type="textarea"
          placeholder="어떤 배경에서 활동을 하게 되었나요?"
          value={role}
          onChange={e => setRole(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">주요성과</div>
      <TextAreaInput
        type="textarea"
        placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
        value={perform}
        onChange={e => setPerform(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">키워드</div>
        <TextInput
          type="string"
          placeholder="#태그 입력 (최대 30개)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <Footer />
      </div>
    </div>
  );
}
