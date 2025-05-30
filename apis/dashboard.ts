'use server';

import API from './config';

export type JobRatioType = {
  name: string;
  value: number;
};

export interface JobRatioResponse {
  httpStatus: number;
  message: string;
  data: JobRatioType[];
}

export type DateCount = {
  date: string;
  count: number;
};

export interface ExpHisoryResponse {
  httpStatus: number;
  message: string;
  data: {
    dateCounts: {
      [month: string]: DateCount[];
    };
  };
  success: boolean;
}

export type CoreSkillMapType = {
  coreSkillName: string;
  score: number;
};

export interface CoreSkillMapResponse {
  httpStatus: number;
  message: string;
  data: {
    coreSkillMaps: CoreSkillMapType[];
    strengthFeedback: {
      strengthName: string;
      reason: string;
      careerSuggestion: string;
    };
    weaknessFeedback: {
      weaknessName: string;
      reason: string;
      improvementSuggestion: string;
    };
  };
  success: boolean;
}

export async function getJobRatio(): Promise<JobRatioResponse | null> {
  try {
    const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');
    return res.data;
  } catch (error) {
    console.error('직무 비율 불러오기 실패:', error);
    return null;
  }
}

export async function getCoreSkillMap(): Promise<CoreSkillMapResponse | null> {
  return {
    httpStatus: 200,
    message: 'success',
    data: {
      coreSkillMaps: [
        {
          coreSkillName: '서버사이드프로그래밍',
          score: 8.5,
        },
        {
          coreSkillName: '데이터베이스관리',
          score: 7.2,
        },
        {
          coreSkillName: 'API설계',
          score: 7,
        },
        {
          coreSkillName: '문제해결능력',
          score: 9,
        },
        {
          coreSkillName: '성능최적화',
          score: 8.8,
        },
      ],
      strengthFeedback: {
        strengthName: '문제해결능력',
        reason: '다양한 프로젝트를 통해 문제를 해결한 경험이 많아서',
        careerSuggestion: '시스템 아키텍트 또는 기술 컨설턴트에 적합합니다.',
      },
      weaknessFeedback: {
        weaknessName: 'API설계',
        reason: 'API 설계 관련 직접적인 경험을 언급하지 않음',
        improvementSuggestion: 'API 설계 공부 및 작은 프로젝트 참여',
      },
    },
    success: true,
  };
}

export async function getExpHistory(
  year: number,
  month: number
): Promise<ExpHisoryResponse> {
  console.log('getExpHistory 호출됨', year, month);
  const res = await API.get<ExpHisoryResponse>(
    `/api/dashboard/history-new?${new URLSearchParams({
      year: year.toString(),
      month: month.toString(),
    })}`
  );
  return res.data;
}
