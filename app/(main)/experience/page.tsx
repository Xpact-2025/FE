'use client';

import { useState, useEffect } from 'react';
import { Experience, getMyExperience } from '@/apis/exp';
import ExperienceCard from './components/ExperienceCard';
import ExpBtn from '@/app/components/ExpBtn';
import BtnFilter from '@/app/components/BtnFilter';
import { ExperienceType } from '@/types/exp';

export default function ExpMainPage() {
  const [data, setData] = useState<Experience[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [selectedType, setSelectedType] = useState<ExperienceType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyExperience();
        setData(result.data ?? []);
      } catch (err) {
        console.error('경험 데이터 불러오기 실패:', err);
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  const filteredData = selectedType
    ? data?.filter(exp => exp.experienceType === selectedType)
    : data;

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex-col items-start py-16 px-[80px]">
        <h1 className="text-[25px] font-bold mb-10 flex items-center justify-between">
          <span>내 경험</span>
          <div className="flex justify-end gap-4">
            <ExpBtn href="/addExperience " className="bg-primary-50 text-black">
              경험 추가
            </ExpBtn>
            <BtnFilter onSelectType={setSelectedType} />
          </div>
        </h1>

        {!data || (data.length === 0 && <div>경험이 존재하지 않습니다.</div>)}

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
      </main>
    </div>
  );
}
