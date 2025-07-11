'use server';

import { AxiosError } from 'axios';
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
  httpStatus?: number;
  message: string;
  data?: {
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
  success?: boolean;
}

export interface TimelineExp {
  startDate: string;
  endDate: string;
  title: string;
  experienceType: string;
}

export interface ExpTimelineResponse {
  httpStatus: number;
  message: string;
  data: TimelineExp[];
  success: boolean;
}

export async function getJobRatio(): Promise<JobRatioResponse> {
  const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');

  if (res.status !== 200) {
    console.error('직무 비율 불러오기 실패:', res.data);
    return res.data;
  }

  return res.data;
}

export async function getCoreSkillMap(): Promise<CoreSkillMapResponse> {
  try {
    const res = await API.post<CoreSkillMapResponse>(`/api/dashboard/skills`);

    if (res.status !== 200) {
      console.error('핵심 역량 맵 불러오기 실패', res.status, res.data);
    }

    if (res.data.data === null) {
      console.error('핵심 역량 맵 data 불러오기 실패', res.data);
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('핵심 역량 맵 불러오기 실패', error.response?.data);

      return error.response?.data;
    }
    return {
      message:
        '핵심 역량 맵을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.',
      success: false,
    };
  }
}

export async function getExpHistory(
  year: number,
  month: number
): Promise<ExpHisoryResponse> {
  const res = await API.get<ExpHisoryResponse>(
    `/api/dashboard/history-new?${new URLSearchParams({
      year: String(year),
      month: String(month),
    })}`
  );
  return res.data;
}

export async function getExpTimeline(
  startLine: string,
  endLine: string
): Promise<ExpTimelineResponse> {
  const res = await API.get<ExpTimelineResponse>(
    `/api/dashboard/timeline?${new URLSearchParams({
      startLine,
      endLine,
    })}`
  );
  return res.data;
}
