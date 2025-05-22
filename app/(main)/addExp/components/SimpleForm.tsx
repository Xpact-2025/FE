'use client';

import { useState } from 'react';
import { type ExpPayload } from '@/apis/exp';
import ExpInputBox from './ExpInputBox';
import KeywordInput from './KeywordInput';
import FileInput from './FileInput';

interface SimpleFormProps {
  data?: ExpPayload;
  onChange: (key: string, value: string) => void;
}

export default function SimpleForm({ data, onChange }: SimpleFormProps) {
  const [form, setForm] = useState({
    title: data?.title || '',
    startDate: String(data?.startDate) || '',
    endDate: String(data?.endDate) || '',
    role: data?.role || '',
    perform: data?.perform || '',
    files: data?.files || '',
    keywords: data?.keywords || '',
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
        역할
      </div>
      <ExpInputBox
        type="textarea"
        placeholder="본인이 맡은 역할이나 담당한 업무는 무엇이었나요?"
        value={form.role}
        onChange={e => handleChange('role', e.target.value)}
      />

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          주요 성과
        </div>
        <ExpInputBox
          type="textarea"
          placeholder="해당 경험에서 달성한 결과나 성과는 무엇이었나요?"
          value={form.perform}
          onChange={e => handleChange('perform', e.target.value)}
        />
      </div>

      <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
        자료 첨부(선택)
      </div>
      <FileInput />

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          키워드
        </div>
        <KeywordInput />
      </div>
    </div>
  );
}
