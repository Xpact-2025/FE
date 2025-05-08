'use client';

import { useState } from 'react';
import { Exp } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpCard from './ExpCard';
import BtnExp from '@/app/components/BtnExp';
import BtnFilter from '@/app/components/BtnFilter';

interface ExpListProps {
  data: Exp[];
}

export default function ExpList({ data }: ExpListProps) {
  const [selectedType, setSelectedType] = useState<ExpType | null>(null);
  const [localData] = useState(data);

  const filteredData = selectedType
    ? localData?.filter(exp => exp.experienceType === selectedType)
    : localData;

  return (
    <main className="flex-1 flex-col items-start py-16 px-[80px]">
      <h1 className="text-[25px] font-bold mb-10 flex items-center justify-between">
        <span>내 경험</span>
        <div className="flex justify-end gap-4">
          <BtnExp href="/addExp " className="bg-primary-50 text-black">
            경험 추가
          </BtnExp>
          <BtnFilter onSelectType={setSelectedType} />
        </div>
      </h1>

      {!data || data.length === 0 ? (
        <div>경험이 존재하지 않습니다.</div>
      ) : (
        <div className="w-full flex flex-wrap space-x-[28px] space-y-[37px]">
          {filteredData?.map(exp => (
            <ExpCard
              key={exp.id}
              id={exp.id}
              title={exp.title}
              type={exp.experienceType}
              isTemp={false}
            />
          ))}
        </div>
      )}
    </main>
  );
}
