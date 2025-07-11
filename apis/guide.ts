'use server';

import API from './config';

export interface AIActivity {
  id: number;
  title: string;
  weakness: string;
  imgUrl: string;
  scrapType: string;
  isCliped: boolean;
  dday: string;
}

interface Weakness {
  weaknessName: string;
  explanation: string;
}

interface GetWeakResponse {
  httpStatus: number;
  message: string;
  code?: string;
  data: Weakness[];
}

interface GetAIResponse {
  httpStatus: number;
  message: string;
  data: {
    content: AIActivity[];
  };
}

export interface AIActivityDetail {
  scrapId: number;
  scrapType: 'ACTIVITY' | 'INTERN' | 'COMPETITION' | 'EDUCATION';
  title: string;
  imageUrl: string;
  referenceUrl: string;
  jobCategory: string[];
  startDate: string;
  endDate: string;
  eligibility?: string;
  benefits?: string;
  enterpriseType?: string;
  region?: string;
  onOffLine?: string;
}

export async function getWeakness(): Promise<GetWeakResponse> {
  try {
    const res = await API.get<GetWeakResponse>('/api/guide/weakness');
    return res.data;
  } catch (e) {
    console.error('약점 목록 조회 실패:', e);
    return { httpStatus: 500, message: 'fail', data: [] }; // fallback
  }
}

export async function getAIActivityByIndex(
  weaknessOrder: number
): Promise<GetAIResponse> {
  try {
    const res = await API.get<GetAIResponse>('/api/guide/activities', {
      params: {
        weaknessOrder,
        size: 50,
        page: 0,
        sort: 'id,DESC',
      },
    });
    return res.data;
  } catch (e) {
    console.error('AI 활동 조회 실패:', e);
    return {
      httpStatus: 500,
      message: 'fail',
      data: {
        content: [],
      },
    };
  }
}

export async function getAIActivityDetail(
  id: number
): Promise<AIActivityDetail | null> {
  try {
    const res = await API.get(`/api/guide/activities/${id}`);
    return res.data?.data ?? null;
  } catch (e) {
    console.error('상세 활동 조회 실패:', e);
    return null;
  }
}
