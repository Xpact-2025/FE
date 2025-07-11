'use client';

import { useState, useEffect } from 'react';
import MoreVerticalIcon from '@/public/icons/More_Vertical.svg';
import ExpVariety from '@/app/(main)/exp/components/ExpVariety';
import { ExpType } from '@/types/exp';

type CardType = {
  id: number;
  title: string;
  type: ExpType;
  status: string;
  subTitles: string[];
  draftTime: string;
};

const originalCards: CardType[] = [
  {
    id: 1,
    title: 'IT 동아리 잇타 7기',
    type: 'EXTERNAL_ACTIVITIES',
    status: 'SAVE',
    subTitles: [
      '프로젝트 및 팀 설계',
      '프로젝트 주제 선정',
      '기능 정의 및 와이어프레임 제작',
      'QA 테스트',
      '데모 발표',
    ],
    draftTime: '2025.03.02 - 2025.07.12',
  },
  {
    id: 2,
    title: 'UX RESEARCH PROJECT',
    type: 'PROJECT',
    status: 'SAVE',
    subTitles: [
      '사용자 리서치 설계 및 인터뷰 진행',
      '경쟁 서비스 분석 및 인사이트 도출',
      'UX 개선안 도출 및 프로토타입 제작',
      '유저 테스트 및 리포트 작성',
    ],
    draftTime: '2025.03.02 - 2025.07.12',
  },
  {
    id: 3,
    title: '보육원 봉사활동',
    type: 'VOLUNTEER_WORK',
    status: 'SAVE',
    subTitles: [
      '주말 학습 지도 및 정서 지원 프로그램 기획·운영',
      '봉사자 협업 체계 구축 및 팀장 역할 수행',
      '참여율 30% 이상 향상, 장기 봉사 우수 단체 선정',
    ],
    draftTime: '2025.03.02 - 2025.07.12',
  },
  {
    id: 4,
    title: '현대자동차 서비스 디자인 공모전',
    type: 'CONTEST',
    status: 'SAVE',
    subTitles: [
      '페르소나/유저 여정맵 설계',
      '서비스 시나리오 및 UI 와이어프레임',
      '디자인 피드백 및 수정안 도출',
    ],
    draftTime: '2025.03.02 - 2025.07.12',
  },
  {
    id: 5,
    title: '창의혁신 데이터 분석 공모전',
    type: 'VOLUNTEER_WORK',
    status: 'SAVE',
    subTitles: [
      '주제 선정 및 데이터 수집 과정',
      'EDA 및 인사이트 도출',
      '최종 보고서 작성 및 발표 준비',
    ],
    draftTime: '2025.03.02 - 2025.07.12',
  },
];

const CARD_WIDTH = 280;
const CARD_MARGIN = 16;
const TOTAL_CARD_WIDTH = CARD_WIDTH + CARD_MARGIN;

const loopCards = [...originalCards, ...originalCards, ...originalCards];

export default function ExpCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % loopCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const centerIndex =
    (currentIndex + Math.floor(visibleCount / 2)) % loopCards.length;

  return (
    <section className="bg-gray-1000 text-white text-center mt-[20%] mb-[20%] pt-12 pb-12">
      <h3 className="text-[24px] md:text-[40px] font-semibold">
        간단한 입력으로 경험을 체계적으로 정리해요
      </h3>
      <p className="text-[20px] text-gray-400 mb-[150px]">
        흩어진 활동을 주어진 양식대로만 입력하면, 경험이 구조화되어 한눈에
        정리됩니다.
      </p>

      <div className="relative w-full overflow-visible">
        <div
          className="flex transition-transform duration-700 ease-in-out gap-x-6"
          style={{
            transform: `translateX(-${currentIndex * TOTAL_CARD_WIDTH}px)`,
            width: `${loopCards.length * TOTAL_CARD_WIDTH}px`,
          }}
        >
          {loopCards.map((card, index) => {
            const isCenter = index === centerIndex;
            return (
              <div
                key={`${card.id}-${index}`}
                className={`w-[280px] min-h-[250px] shrink-0 transition-all transform duration-500 ease-in-out
                  ${
                    isCenter
                      ? 'scale-110 z-10 bg-[#141414] border border-white/10 shadow-[0_0_18px_rgba(255,255,255,0.25)] rounded-[21.125px]'
                      : 'scale-95 bg-[#141414] border border-white/10 rounded-[14px] opacity-50'
                  } flex flex-col gap-y-3 py-[20px] px-[23px]`}
              >
                <ExpVariety type={card.type} />
                <div className="body-16-sb text-white text-left truncate">
                  {card.title}
                </div>
                <ol className="flex flex-col gap-1 list-disc ml-4">
                  {card.subTitles.map((subTitle, idx) => (
                    <li
                      key={idx}
                      className="text-[10px] text-gray-300 text-left"
                    >
                      <span className="truncate">{subTitle}</span>
                    </li>
                  ))}
                </ol>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex gap-1.5 items-center text-gray-300 text-xs whitespace-nowrap">
                    <span>{card.draftTime}</span>
                  </div>
                  <MoreVerticalIcon className="stroke-gray-50 cursor-pointer" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
