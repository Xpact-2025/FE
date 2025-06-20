'use client';

import { useState } from 'react';
import { SubExperience } from '@/apis/exp';
import KeywordInput from './KeywordInput';
import ExpInputBox from './ExpInputBox';

interface AwardFormProps {
  data?: { subExperiencesResponseDto: SubExperience[] };
  onChange: (key: string, value: string | string[]) => void;
}

export default function AwardForm({ data, onChange }: AwardFormProps) {
  const sub = data?.subExperiencesResponseDto?.[0];
  const [form, setForm] = useState({
    subTitle: sub?.subTitle || '',
    simpleDescription: sub?.simpleDescription || '',
    keywords: sub?.keywords || [],
  });

  const handleChange = (key: keyof typeof form, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
    onChange(key, value);
  };

  return (
    <div className="pb-[30px]">
      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        세부 경험 제목
      </div>
      <ExpInputBox
        type="string"
        placeholder="제목"
        value={form.subTitle}
        onChange={e => handleChange('subTitle', e.target.value)}
      />

      <div className="py-15">
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

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        키워드
      </div>
      <KeywordInput
        value={form.keywords}
        onChange={newTags => handleChange('keywords', newTags)}
      />
    </div>
  );
}
