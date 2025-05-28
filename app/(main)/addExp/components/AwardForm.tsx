'use client';

import { useState } from 'react';
import { type ExpPayload } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpInputBox from './ExpInputBox';

interface AwardFormProps {
  experienceType?: ExpType;
  data?: ExpPayload;
  onChange: (key: string, value: string) => void;
}

// ExpForm 컴포넌트에서 렌더링한 자격증 및 수상 form 컴포넌트
export default function AwardForm({
  experienceType,
  data,
  onChange,
}: AwardFormProps) {
  // 초기 폼 상태 설정
  const [form, setForm] = useState({
    qualification: data?.qualification || '',
    publisher: data?.publisher || '',
    issueDate: String(data?.issueDate) || '',
    simpleDescription: data?.simpleDescription || '',
  });

  // 폼의 각 필드 변경을 처리하는 함수
  // key: 변경된 필드의 이름, value: 변경된 값
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
    // props로 전달받은 onChange 함수를 실행시켜 부모 컴포넌트에 변경된 값을 전달
    onChange(key, value);
  };

  return (
    <div>
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%] pt-10">
        {experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
      </div>
      {/* 자격증명/수상명명 입력 박스, props로 onChange 함수를 전달함 */}
      <ExpInputBox
        type="string"
        placeholder={experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
        value={form.qualification}
        onChange={e => handleChange('qualification', e.target.value)}
      />
      {/* */}

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          {experienceType === 'CERTIFICATES' ? '발행처' : '대회명 / 주최기관'}
        </div>
        <ExpInputBox
          type="string"
          placeholder={
            experienceType === 'CERTIFICATES' ? '발행처' : '대회명 / 주최기관'
          }
          value={form.publisher}
          onChange={e => handleChange('publisher', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        {experienceType === 'CERTIFICATES' ? '취득일' : '수상일'}
      </div>
      <ExpInputBox
        type="date"
        value={form.issueDate}
        onChange={e => handleChange('issueDate', e.target.value)}
      />

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          간단 설명
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="간단 설명"
          value={form.simpleDescription}
          onChange={e => handleChange('simpleDescription', e.target.value)}
        />
      </div>
    </div>
  );
}
