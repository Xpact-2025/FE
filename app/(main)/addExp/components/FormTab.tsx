'use client';

import { ExpFormType } from '@/types/exp';
import { useState } from 'react';

interface FormTabProps {
  onChange: (value: { formType: ExpFormType; selectedTab: string }) => void;
}

export default function FormTab({ onChange }: FormTabProps) {
  const [selectedTab, setSelectedTab] = useState<'star' | 'simple'>('star');

  const handleTabChange = (tab: 'star' | 'simple') => {
    setSelectedTab(tab);
    onChange({
      formType: tab === 'star' ? 'STAR_FORM' : 'SIMPLE_FORM',
      selectedTab: tab,
    });
  };

  return (
    <div className="flex w-[340px] px-0.5 py-0.5 bg-gray-700 rounded-3xl gap-2">
      <button
        type="button"
        className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
          selectedTab === 'star'
            ? 'bg-gray-300 text-gray-1100'
            : 'bg-gray-700 font-medium text-gray-300'
        }`}
        onClick={() => handleTabChange('star')}
      >
        STAR 양식
      </button>
      <button
        type="button"
        className={`w-[170px] rounded-3xl font-medium py-2 transition all ${
          selectedTab === 'simple'
            ? 'bg-gray-300 text-gray-1100'
            : 'bg-gray-700 font-medium text-gray-300'
        }`}
        onClick={() => handleTabChange('simple')}
      >
        간결 양식
      </button>
    </div>
  );
}
