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
    //await new Promise(resolve => setTimeout(resolve, 10000));
    const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');
    return res.data;
  } catch (error) {
    console.error('직무 비율 불러오기 실패:', error);
    return null;
  }
}

export async function getCoreSkillMap(): Promise<CoreSkillMapResponse | null> {
  const res = await API.post<CoreSkillMapResponse>(`/api/dashboard/skills`);

  if (!res.status) {
    console.error('핵심 역량 맵 불러오기 실패:', res.statusText);
    return null;
  }

  if (!res.data.data) {
    console.error('핵심 역량 맵 data 불러오기 실패:', res.data.message);
    return null;
  }
  return res.data;
}

export async function getExpHistory(
  year: number,
  month: number
): Promise<ExpHisoryResponse> {
  const res = await API.get<ExpHisoryResponse>(
    `/api/dashboard/history-new?${new URLSearchParams({
      year: year.toString(),
      month: month.toString(),
    })}`
  );
  return res.data;
}
