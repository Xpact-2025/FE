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
import Footer from '@/app/components/Footer';

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
  const [isHoveredSkillHelp, setIsHoveredSkillHelp] = useState(false);
  const skillHelpText =
    '대시보드의 핵심스킬맵에서 낮게 나타난 \n3가지 역량에 대해 알려줘요.';
  const [isHoveredActivityHelp, setIsHoveredActivityHelp] = useState(false);
  const activityHelpText =
    '필요 역량을 키우는 데 도움이 되는 활동을 AI가 추천해줘요.';
  const [hasNoExpError, setHasNoExpError] = useState(false);

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

      if (weakRes.code === 'WE002') {
        setHasNoExpError(true); //경험 없을 경우 예외 처리
        setInitialLoading(false);
        return;
      }

      if (weakRes.httpStatus !== 200 || !Array.isArray(weakRes.data)) {
        setError(true);
        setInitialLoading(false);
        return;
      }

      setWeaknesses(weakRes.data);
      setInitialLoading(false);
    };
    fetchWeaknesses();
  }, []);

  useEffect(() => {
    if (weaknesses.length === 0) return;

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

  if (hasNoExpError) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-center text-gray-400 px-6">
        <p className="text-lg font-semibold mb-2">경험 분석이 필요합니다</p>
        <p className="text-sm">
          성장 가이드를 보기 위해선 먼저 <br />
          <span className="text-primary-50 font-medium">
            대시보드에서 경험 분석
          </span>
          을 완료해주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-7 py-3">
      {/* 필요 역량 */}
      <div className="flex items-center gap-5">
        <div className="text-gray-50 text-2xl font-bold">필요 역량</div>
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHoveredSkillHelp(true)}
          onMouseLeave={() => setIsHoveredSkillHelp(false)}
        >
          <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />

          {isHoveredSkillHelp && (
            <div className="absolute top-full z-10 mt-3 w-max">
              <div className="relative rounded-[16px] -translate-x-1/5 bg-gray-200 px-[22px] py-[12px] body-14-m text-gray-700 whitespace-pre-line">
                {skillHelpText}
              </div>
              <div className="absolute -top-[6px] left-[6px] w-3 h-3 rotate-45 bg-gray-200"></div>
            </div>
          )}
        </div>
      </div>

      <div
        className="flex items-center justify-around w-[100%] h-[235px] bg-gray-700 rounded-[12px] border border-gray-600 mt-6 pl-6 pr-12 py-5.5"
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
                memberName={memberName || '회원'}
              />
            ))}
        </div>
      </div>

      {/* AI 추천 활동 */}
      <div className="relative flex items-center gap-5 pt-15">
        <div className="text-gray-50 text-2xl font-bold">AI 추천 활동</div>
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHoveredActivityHelp(true)}
          onMouseLeave={() => setIsHoveredActivityHelp(false)}
        >
          <HelpIcon className="stroke-gray-600 w-[24px] h-[24px] cursor-pointer" />

          {isHoveredActivityHelp && (
            <div className="absolute top-full z-10 mt-3 w-max">
              <div className="relative rounded-[16px] -translate-x-1/5 bg-gray-200 px-[22px] py-[12px] body-14-m text-gray-700 whitespace-pre-line">
                {activityHelpText}
              </div>
              <div className="absolute -top-[6px] left-[6px] w-3 h-3 rotate-45 bg-gray-200"></div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-10 pb-6.5">
        <ActivityFilter
          weaknesses={weaknesses.map(w => w.weaknessName)}
          onSelectFilter={setSelectedFilter}
        />
      </div>

      {isActivityLoading ? (
        <LoadingSpinner />
      ) : 0 ? (
        <div className="pb-10">
          <AIList data={activities} />
        </div>
      ) : (
        <div className="text-gray-400 text-center py-10">
          {selectedFilter?.map(f => f).join(', ')} 관련 AI 추천 활동이 없습니다.
        </div>
      )}
      <Footer />
    </div>
  );
}
