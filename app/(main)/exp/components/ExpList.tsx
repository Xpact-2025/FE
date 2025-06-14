'use client';

import { useState } from 'react';
import { Exp } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpCard from './ExpCard';
import BtnFilter from '@/app/(main)/exp/components/BtnFilter';
import SearchBar from './SearchBar';
import AddExpBtn from './AddExpBtn';

interface ExpListProps {
  data: Exp[];
}

export default function ExpList({ data }: ExpListProps) {
  console.log('ExpList data:', data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExpType | null>(null);

  const filteredSearch = data.filter(exp => {
    return (
      exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.keywords?.some(keyword =>
        keyword.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const filteredData = selectedType
    ? filteredSearch?.filter(exp => exp.experienceType === selectedType)
    : filteredSearch;

  return (
    <main className="flex-1 flex-col items-start py-16 px-[80px]">
      <div className="fixed top-[75vh] right-[49px] z-50">
        <AddExpBtn />
      </div>
      <h1 className="text-[25px] font-bold mb-6">내 경험</h1>
      <div className="flex justify-between mb-7">
        <SearchBar onSearch={setSearchTerm} />
        <BtnFilter
          onSelectType={setSelectedType}
          onSelectSort={sort => {
            fetch(`api/exp?sort=${sort}`);
          }}
        />
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
              draftTime={exp.draftTime}
              status={exp.status}
              keywords={exp.keywords}
            />
          ))}
        </div>
      )}
    </main>
  );
}
