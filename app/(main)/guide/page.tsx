'use client';

import { useState, useEffect } from 'react';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import SkillCircle from './components/SkillCircle';
import ActivityFilter from './components/ActivityFilter';
import AIList from './components/AIList';
import {
  getWeakness,
  getAIActivityByIndex,
  type AIActivity,
} from '@/apis/guide';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { getMemberInfo } from '@/apis/mypage';

interface Weakness {
  weaknessName: string;
  explanation: string;
}

export default function GuidePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string[] | null>(null);
  const [weaknesses, setWeaknesses] = useState<Weakness[]>([]);
  const [activities, setActivities] = useState<AIActivity[]>([]);
  const [, setError] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isActivityLoading, setIsActivityLoading] = useState(false);
  const [memberName, setMemberName] = useState<string | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const res = await getMemberInfo();
      if (res.httpStatus === 200) {
        setMemberName(res.data.name);
      }
    };
    fetchMemberInfo();

    const fetchWeaknesses = async () => {
      const weakRes = await getWeakness();
      if (weakRes.httpStatus !== 200) {
        setError(true);
        return;
      }
      setWeaknesses(weakRes.data);
      setInitialLoading(false);
    };
    fetchWeaknesses();
  }, []);

  useEffect(() => {
    if (weaknesses.length === 0) return; // 데이터 준비 안 됐으면 실행 안함

    const fetchActivities = async () => {
      setIsActivityLoading(true);
      try {
        if (!selectedFilter || selectedFilter.length !== 1) {
          const res = await getAIActivityByIndex(0);
          setActivities(res.httpStatus === 200 ? res.data.content : []);
          return;
        }

        const selected = selectedFilter[0];
        const index = weaknesses.findIndex(w => w.weaknessName === selected);
        if (index === -1) return;

        const res = await getAIActivityByIndex(index + 1);
        setActivities(res.httpStatus === 200 ? res.data.content : []);
      } finally {
        setIsActivityLoading(false);
      }
    };

    fetchActivities();
  }, [selectedFilter, weaknesses]);

  if (initialLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col px-7 py-3">
      {/* 필요 역량 */}
      <div className="flex items-center gap-5">
        <div className="text-gray-50 text-2xl font-bold">필요 역량</div>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />
      </div>

      <div
        className="flex items-center w-[100%] h-full bg-gray-700 rounded-[12px] border border-gray-600 mt-6 pl-9 pr-13 py-5.5"
        onMouseLeave={() => setSelectedSkill(null)}
      >
        {!selectedSkill && (
          <div className="flex flex-col body-20-r min-w-[343px]">
            <div>{memberName}님의 핵심 스킬맵 분석 결과, </div>
            <div className="text-primary-50">
              {weaknesses.map(w => w.weaknessName).join(', ')}
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
          {weaknesses
            .filter(w => !selectedSkill || selectedSkill === w.weaknessName)
            .map(w => (
              <SkillCircle
                key={w.weaknessName}
                label={w.weaknessName}
                isSelected={selectedSkill === w.weaknessName}
                onMouseEnter={() => setSelectedSkill(w.weaknessName)}
                explanation={w.explanation}
                memberName={memberName || '회원'} // 👈 여기 추가
              />
            ))}
        </div>
      </div>

      {/* AI 추천 활동 */}
      <div className="flex items-center gap-5 pt-15">
        <div className="text-gray-50 text-2xl font-bold">AI 추천 활동</div>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />
      </div>

      <div className="pt-10 pb-6.5">
        <ActivityFilter
          weaknesses={weaknesses.map(w => w.weaknessName)}
          onSelectFilter={setSelectedFilter}
        />
      </div>

      {isActivityLoading ? <LoadingSpinner /> : <AIList data={activities} />}
    </div>
  );
}
