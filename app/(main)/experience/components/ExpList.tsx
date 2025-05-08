'use client';

import { useState } from 'react';
import { Experience } from '@/apis/exp';
import { ExperienceType } from '@/types/exp';
import ExperienceCard from './ExperienceCard';
import BtnExp from '@/app/components/BtnExp';
import BtnFilter from '@/app/components/BtnFilter';

interface ExpListProps {
  data: Experience[];
}

export default function ExpList({ data }: ExpListProps) {
  const [selectedType, setSelectedType] = useState<ExperienceType | null>(null);
  const [localData] = useState(data);

  const filteredData = selectedType
    ? localData?.filter(exp => exp.experienceType === selectedType)
    : localData;

  return (
    <main className="flex-1 flex-col items-start py-16 px-[80px]">
      <h1 className="text-[25px] font-bold mb-10 flex items-center justify-between">
        <span>내 경험</span>
        <div className="flex justify-end gap-4">
          <BtnExp
            href="/addExperience "
            className="bg-primary-50 text-gray-1000"
          >
            경험 추가
          </BtnExp>
          <BtnFilter onSelectType={setSelectedType} />
        </div>
      </h1>

      {!data || data.length === 0 ? (
        <div>경험이 존재하지 않습니다.</div>
      ) : (
        <div className="w-full flex flex-wrap space-x-[28px] space-y-[37px]">
          {filteredData?.map(experience => (
            <ExperienceCard
              key={experience.id}
              id={experience.id}
              title={experience.title}
              type={experience.experienceType}
              isTemp={false}
            />
          ))}
        </div>
      )}
    </main>
  );
}
