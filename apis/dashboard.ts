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

export async function getJobRatio(): Promise<JobRatioResponse | null> {
  try {
    const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');
    return res.data;
  } catch (error) {
    console.error('직무 비율 불러오기 실패:', error);
    return null;
  }
}

export async function getExpHistory(
  year: number,
  month: number
): Promise<ExpHisoryResponse> {
  const months = [
    { year: year, month: month - 1 },
    { year: year, month },
    { year: year, month: month + 1 },
  ];

  const res = await Promise.all(
    months.map(({ year, month }) =>
      API.get<ExpHisoryResponse>(
        `/api/dashboard/history?${new URLSearchParams({
          year: year.toString(),
          month: month.toString(),
        })}`
      )
    )
  );

  return {
    httpStatus: res[0].data.httpStatus,
    message: res[0].data.message,
    data: {
      dateCounts: res.flatMap(res => res.data.data.dateCounts),
    },
  };
}
