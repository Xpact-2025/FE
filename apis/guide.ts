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

interface GetWeakResponse {
  httpStatus: number;
  message: string;
  data: [];
}

interface GetAIResponse {
  httpStatus: number;
  message: string;
  data: AIActivity[];
}

export async function getWeakness(): Promise<GetWeakResponse> {
  const res = await API.get<GetWeakResponse>('/api/guide/weakness');
  return res.data;
}

export async function getAIActivity(): Promise<GetAIResponse> {
  const res = await API.get<GetAIResponse>('/api/guide/activities');

  if (res.status !== 200) {
    console.error('AI 추천 활동 불러오기 실패:', res.data);
    return res.data;
  }
  return res.data;
}
