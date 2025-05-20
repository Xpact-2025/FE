import API from './config';

export type JobRatioType = Record<string, number>;

export interface JobRatioResponse {
  httpStatus: number;
  message: string;
  data: {
    ratios: JobRatioType;
  };
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
