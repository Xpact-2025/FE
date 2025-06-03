'use client';

import { useState } from 'react';
import { type ExpPayload, SubExperience } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpInputBox from './ExpInputBox';

interface AwardFormProps {
  experienceType?: ExpType;
  data?: ExpPayload & { subExperiencesResponseDto: SubExperience[] };
  onChange: (key: string, value: string) => void;
}

export default function AwardForm({
  experienceType,
  data,
  onChange,
}: AwardFormProps) {
  const sub = data?.subExperiencesResponseDto?.[0];
  const [form, setForm] = useState({
    qualification: data?.qualification || '',
    publisher: data?.publisher || '',
    issueDate: String(data?.issueDate) || '',
    simpleDescription: sub?.simpleDescription || '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
    onChange(key, value);
  };

  return (
    <div>
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%] pt-10">
        {experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
      </div>
      <ExpInputBox
        type="string"
        placeholder={experienceType === 'CERTIFICATES' ? '자격증명' : '수상명'}
        value={form.qualification}
        onChange={e => handleChange('qualification', e.target.value)}
      />

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
