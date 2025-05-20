'use server';

import API from './config';

export type JobRatioType = Record<string, number>;

export interface JobRatioResponse {
  httpStatus: number;
  message: string;
  data: {
    ratios: JobRatioType;
  };
}

export type DateCount = {
  date: string;
  count: number;
};

export type ExpHisoryResponse = {
  httpStatus: number;
  message: string;
  data: {
    dateCounts: DateCount[];
  };
};

export async function getJobRatio(): Promise<JobRatioResponse> {
  const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');
  return res.data;
}

export async function getExpHistory(
  year: number,
  month: number
): Promise<ExpHisoryResponse> {
  const params = new URLSearchParams({
    year: year.toString(),
    month: month.toString(),
  });
  const res = await API.get<ExpHisoryResponse>(
    `/api/dashboard/history?${params}`
  );
  return res.data;
}
