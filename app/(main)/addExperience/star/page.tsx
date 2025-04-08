'use client';

import { useState } from 'react';
import GuideModal from '../components/GuideModal';
import SelectInput from '../components/ExperienceInputBox';
import DateInput from '../components/ExperienceInputBox';
import TextInput from '../components/ExperienceInputBox';
import TextAreaInput from '../components/ExperienceInputBox';
import Footer from '@/app/components/Footer';
import ChevronLeftIcon from '@/public/icons/Chevron_Left.svg';
import CircleHelpIcon from '@/public/icons/Circle_Help.svg';

export default function StarExperiencePage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [experienceType, setExperienceType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [title, setTitle] = useState('');
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');
  const [keyword, setKeyword] = useState('');

  return (
    <div className="p-16">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <ChevronLeftIcon />
          <div className="text-[26px]">경험 입력</div>
        </div>
        <div className="flex items-center">
          <button className="w-30 py-3 bg-black text-[14px] text-[#777] font-semibold rounded">
            임시저장
          </button>
          <button className="w-30 py-3 bg-[#FF6D03] text-[14px] text-black font-semibold rounded">
            작성완료
          </button>
        </div>
      </div>

      <div className="py-10">
        <div className="flex items-center justify-between w-full">
          <div>Tab bar</div>
          <div className="flex items-center">
            <button onClick={() => setModalOpen(true)}>
              <CircleHelpIcon className="stroke-[#777]" />
            </button>
            <div className="text-[16px] text-[#777] p-2">양식 활용 가이드</div>
          </div>
        </div>
        {isModalOpen && (
          <GuideModal
            title="STAR양식 작성 가이드"
            content={
              <div>
                <p>
                  STAR 방식은 경험을 상황(Situation), 문제(Task), 해결(Action),
                  결과(Result) 순으로 구조화해 서술하는 방법입니다.
                </p>
                <p>
                  면접, 자기소개서, 회고 등에 자주 쓰이며, 문제 해결 과정을
                  명확하게 보여줄 수 있어요.
                </p>
                <br></br>

                <p>
                  상황(S): 어떤 배경에서 활동을 하게 되었는지 소개해 주세요.
                </p>
                <p>
                  → 예:
                  {` "데이터 분석 수업에서 이커머스 리뷰 데이터를 분석하는 팀 프로젝트를 진행했습니다."`}
                </p>
                <br></br>

                <p>
                  문제(T): 그 안에서 실제로 겪은 문제나 과제를 구체적으로 써
                  주세요.
                </p>
                <p>
                  → 예:
                  {` "리뷰와 평점의 관계가 애매해 분석 기준을 정하기 어려웠습니다."`}
                </p>
                <br></br>

                <p>
                  해결 방법(A): 문제를 해결하기 위해 어떤 행동을 했는지 설명해
                  주세요.
                </p>
                <p>
                  → 예:
                  {` "감성 사전을 적용해 텍스트를 수치화하고, 리뷰 유형을 클러스터링해 분석 방향을 구체화했습니다."`}
                </p>
                <br></br>

                <p>결과(R): 행동의 결과, 변화 또는 배운 점을 정리해 주세요.</p>
                <p>
                  → 예:
                  {` "감성 클러스터별 평점 분포를 비교해 ‘배송’ 관련 이슈가 저평점의 핵심 요인임을 정량적으로 입증했으며, 
      데이터 기반 가설 설정의 중요성을 배웠습니다."`}
                </p>
              </div>
            }
            closeRequest={() => setModalOpen(false)}
          />
        )}
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">경험 유형</div>
      <SelectInput
        type="select"
        value={experienceType}
        min={startDate}
        onChange={e => setExperienceType(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">기간</div>
        <div className="flex">
          <DateInput
            type="date"
            value={startDate}
            max={endDate}
            onChange={e => setStartDate(e.target.value)}
          />
          <DateInput
            type="date"
            value={endDate}
            min={startDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">제목</div>
      <TextInput
        type="string"
        placeholder="경험 제목"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">상황</div>
        <TextAreaInput
          type="textarea"
          placeholder="어떤 배경에서 활동을 하게 되었나요?"
          value={situation}
          onChange={e => setSituation(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">문제</div>
      <TextAreaInput
        type="textarea"
        placeholder="그 안에서 실제로 겪은 문제나 과제는 무엇이 있었나요?"
        value={task}
        onChange={e => setTask(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">해결</div>
        <TextAreaInput
          type="textarea"
          placeholder="그 문제를 해결하기 위해 어떤 행동을 했나요?"
          value={action}
          onChange={e => setAction(e.target.value)}
        />
      </div>

      <div className="text-[16px] mb-[2%] ml-[1%]">결과</div>
      <TextAreaInput
        type="textarea"
        placeholder="선택한 행동의 결과는 어땠나요?"
        value={result}
        onChange={e => setResult(e.target.value)}
      />

      <div className="py-10">
        <div className="text-[16px] mb-[2%] ml-[1%]">키워드</div>
        <TextInput
          type="string"
          placeholder="#태그 입력 (최대 30개)"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
      </div>
      <Footer />
    </div>
  );
}
