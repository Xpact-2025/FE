import API from './config';

type JobRatioType = Record<string, number>;

export interface JobRatioResponse {
  httpStatus: number;
  message: string;
  data: {
    ratios: JobRatioType;
  };
}

export async function getJobRatio(): Promise<JobRatioResponse> {
  const res = await API.get<JobRatioResponse>('/api/dashboard/ratio');
  return res.data;
}
