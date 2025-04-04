'use client';

import { useState } from 'react';
import SelectInput from '../components/ExperienceInputBox';
import DateInput from '../components/ExperienceInputBox';
import TextInput from '../components/ExperienceInputBox';
import TextAreaInput from '../components/ExperienceInputBox';
import Image from 'next/image';
import Footer from '@/app/components/Footer';

export default function SimpleExperiencePage() {
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
        <div className="text-[16px] mb-[2%] ml-[1%]">경험 유형</div>
        <SelectInput
          type="select"
          value={experienceType}
          min={startDate}
          onChange={e => setExperienceType(e.target.value)}
        />
      </div>

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

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">제목</div>
        <TextInput
          type="string"
          placeholder="경험 제목"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">역할</div>
      <TextAreaInput
        type="textarea"
        placeholder="어떤 배경에서 활동을 하게 되었나요?"
        value={role}
        onChange={e => setRole(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">주요성과</div>
        <TextAreaInput
          type="textarea"
          placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
          value={perform}
          onChange={e => setPerform(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">키워드</div>
      <TextInput
        type="string"
        placeholder="#태그 입력 (최대 30개)"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <Footer />
    </div>
  );
}
