'use client';

import { useState } from 'react';
import { Exp } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpCard from './ExpCard';
import BtnFilter from '@/app/components/BtnFilter';
import SearchBar from '@/app/components/SearchBar';
import AddExpBtn from './AddExpBtn';

interface ExpListProps {
  data: Exp[];
}

export default function ExpList({ data }: ExpListProps) {
  const [selectedType, setSelectedType] = useState<ExpType | null>(null);

  const filteredData = selectedType
    ? data?.filter(exp => exp.experienceType === selectedType)
    : data;

  return (
    <main className="flex-1 flex-col items-start py-16 px-[80px]">
      <div className="fixed top-[65vh] right-[49px] z-50">
        <AddExpBtn />
      </div>
      <h1 className="text-[25px] font-bold mb-6">내 경험</h1>
      <div className="flex justify-between mb-7">
        <SearchBar />
        <BtnFilter onSelectType={setSelectedType} />
      </div>

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
              status={exp.status}
            />
          ))}
        </div>
      )}
    </main>
  );
}
