'use client';

import { useState } from 'react';
import { type ExpPayload } from '@/apis/exp';
import ExpInputBox from './ExpInputBox';
import KeywordInput from './KeywordInput';
import FileInput from './FileInput';

interface SimpleFormProps {
  data?: ExpPayload;
  onChange: (key: string, value: string | string[]) => void;
}

// ExpForm 컴포넌트에서 렌더링한 SimpleForm 컴포넌트
export default function SimpleForm({ data, onChange }: SimpleFormProps) {
  // 초기 폼 상태 설정
  const [form, setForm] = useState({
    title: data?.title || '',
    startDate: String(data?.startDate) || '',
    endDate: String(data?.endDate) || '',
    role: data?.role || '',
    perform: data?.perform || '',
    files: data?.files || [],
    keywords: data?.keywords || [],
  });

  // 폼의 각 필드 변경을 처리하는 함수
  // key: 변경된 필드의 이름, value: 변경된 값
  const handleChange = (key: keyof typeof form, value: string | string[]) => {
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
        제목
      </div>
      {/* 경험 제목 입력 박스, props로 onChange 함수를 전달함 */}
      <ExpInputBox
        type="string"
        placeholder="경험 제목"
        value={form.title}
        onChange={e => handleChange('title', e.target.value)}
      />
      {/* */}

      <div className="py-10">
        <div className="text-gray-50 text-xl font-medium mb-[2%] ml-[1%]">
          기간
        </div>
        <div className="flex gap-4">
          {/* 기간 입력 박스, props로 onChange 함수를 전달함 */}
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
          {/* */}
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
        {/* 키워드 입력 박스, props로 onChange 함수를 전달함 */}
        <KeywordInput
          value={form.keywords}
          onChange={newTags => handleChange('keywords', newTags)}
        />
        {/* */}
      </div>
    </div>
  );
}
