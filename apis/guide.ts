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
  data: Weakness[];
}

interface GetAIResponse {
  httpStatus: number;
  message: string;
  data: {
    content: AIActivity[];
  };
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
        page: 0,
        size: 12,
        sort: 'id,DESC', // ✅ 배열 말고 문자열로!
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
