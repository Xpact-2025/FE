'use client';

import { useState } from 'react';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import SkillCircle from './components/SkillCircle';

export default function GuidePage() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const skills = ['데이터 분석', '사용자 리서치', '문제정의 능력'];

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
          className={`flex gap-5 transition-all duration-1000 ${
            selectedSkill ? 'ml-5' : 'ml-auto'
          }`}
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
    </div>
  );
}
