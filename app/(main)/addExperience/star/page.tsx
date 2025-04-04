'use client';

import { useState } from 'react';
import SelectInput from '../components/ExperienceInputBox';
import DateInput from '../components/ExperienceInputBox';
import TextInput from '../components/ExperienceInputBox';
import TextAreaInput from '../components/ExperienceInputBox';
import Image from 'next/image';

export default function AddExperiencePage() {
  const [experienceType, setExperienceType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

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
          <button className="w-30 py-3 bg-[#FF6D03] text-[14px] font-semibold rounded">
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

      <div className="text-[16px] mb-[2%] ml-[1%]">상황</div>
      <TextAreaInput
        type="textarea"
        placeholder="어떤 배경에서 활동을 하게 되었나요?"
        value={situation}
        onChange={e => setSituation(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">문제</div>
        <TextAreaInput
          type="textarea"
          placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">해결</div>
      <TextAreaInput
        type="textarea"
        placeholder="그 문제를 해결하기 위해 어떤 행동을 했나요?"
        value={action}
        onChange={e => setAction(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">결과</div>
        <TextAreaInput
          type="textarea"
          placeholder="선택한 행동의 결과는 어땠나요?"
          value={result}
          onChange={e => setResult(e.target.value)}
        />
      </div>
    </div>
  );
}
