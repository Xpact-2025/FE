'use client';

import { useState } from 'react';
import { Exp, ExpPayload, sortExp } from '@/apis/exp';
import { ExpType } from '@/types/exp';
import ExpCard from './ExpCard';
import BtnFilter from '@/app/(main)/exp/components/BtnFilter';
import SearchBar from './SearchBar';
import AddExpBtn from './AddExpBtn';

interface ExpListProps {
  data: Exp[];
}

export default function ExpList({ data }: ExpListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExpType | null>(null);
  const [expList, setExpList] = useState<Exp[]>(data || []);

  const handleDelete = (id: number) => {
    setExpList(prev => prev.filter(exp => exp.id !== id));
  };

  const handleOrderChange = async (order: 'latest' | 'oldest') => {
    try {
      const data = await sortExp(order);
      setExpList(data.data);
    } catch (error) {
      console.error('경험 가져오기 실패:', error);
    }
  };

  const [form, setForm] = useState<ExpPayload>({
    experienceType: '' as ExpType,
    qualification: '',
    publisher: '',
    title: '',
    startDate: '',
    endDate: '',
    issueDate: '',
    subExperiences: [],
  });

  const handleChange = (key: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredSearch = expList.filter(exp => {
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
    <main className="flex-1 flex-col items-start py-3 px-7">
      <div className="fixed top-[75vh] right-[49px] z-50">
        <AddExpBtn form={form} onChange={handleChange} />
      </div>
      <h1 className="text-[25px] font-bold mb-6">내 경험</h1>
      <div className="flex justify-between mb-7">
        <SearchBar onSearch={setSearchTerm} />
        <BtnFilter
          onSelectType={setSelectedType}
          onSelectOrder={order => {
            handleOrderChange(order);
          }}
        />
      </div>

      {!data || data.length === 0 ? (
        <div className="mx-4 mt-7 body-15-m text-gray-300">
          아직 등록된 경험이 없어요. 오른쪽 아래 버튼을 눌러 경험을 추가해
          보세요!
        </div>
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
              subTitles={exp.subTitles}
              keywords={exp.keywords}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
