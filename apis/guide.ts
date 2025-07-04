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
  const res = await API.get<GetWeakResponse>('/api/guide');
  return res.data;
}

export async function getAIActivity(): Promise<GetAIResponse> {
  const res = await API.get<GetAIResponse>('/api/guide');
  return res.data;
}
