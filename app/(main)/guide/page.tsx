'use client';

import { useState, useEffect } from 'react';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import SkillCircle from './components/SkillCircle';
import AIList from './components/AIList';
import { AIActivity, getAIActivity } from '@/apis/guide';
import ActivityFilter from './components/ActivityFilter';

export default function GuidePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string[] | null>(null);

  const [data, setData] = useState<AIActivity[]>([]);
  const [error, setError] = useState(false);
  const skills = ['데이터 분석', '사용자 리서치', '문제정의 능력'];

  useEffect(() => {
    const fetchData = async () => {
      const { httpStatus, data = [] } = await getAIActivity();
      if (httpStatus !== 200) {
        setError(true);
        return;
      }
      setData(data);
    };

    fetchData();
  }, []);

  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  const filteredData =
    selectedFilter && selectedFilter.length > 0
      ? data.filter(item => selectedFilter.includes(item.weakness))
      : data;

  return (
    <div className="flex flex-col px-7 py-3">
      <div className="flex items-center gap-5">
        <div className="text-gray-50 text-2xl font-bold">필요 역량</div>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />
      </div>

      <div
        className="flex items-center w-[1020px] h-52 bg-gray-700 rounded-[12px] border border-gray-600 mt-6 pl-9 pr-13 py-5.5"
        onMouseLeave={() => setSelectedSkill(null)}
      >
        {!selectedSkill && (
          <div className="flex flex-col body-20-r min-w-[343px]">
            <div>김잇타님의 핵심 스킬맵 분석 결과,</div>
            <div className="text-primary-50">
              데이터 분석, 사용자 리서치, 문제정의 능력
            </div>
            <div>역량을 보완하면 좋아요.</div>
          </div>
        )}

        <div
          className="flex gap-5"
          style={{
            transform: selectedSkill ? 'translateX(20px)' : 'translateX(30px)',
            opacity: 1,
            transition: 'transform 0.5s ease-in-out, opacity 0.5s ease',
          }}
        >
          {skills
            .filter(skill => !selectedSkill || selectedSkill === skill)
            .map(skill => (
              <SkillCircle
                key={skill}
                label={skill}
                isSelected={selectedSkill === skill}
                onMouseEnter={() => setSelectedSkill(skill)}
              />
            ))}
        </div>
      </div>

      <div className="flex items-center gap-5 pt-15">
        <div className="text-gray-50 text-2xl font-bold">AI 추천 활동</div>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />
      </div>
      <div className="pt-10 pb-6.5">
        <ActivityFilter
          onSelectFilter={weakness => setSelectedFilter(weakness)}
        />
      </div>
      <AIList data={filteredData} />
    </div>
  );
}
