'use server';

import API from './config';

export async function fetchIndustryList(): Promise<string[]> {
  const res = await API.get('/api/recruits/name');

  return res.data.data || [];
}

export async function fetchJobsByIndustry(
  industryName: string
): Promise<string[]> {
  const res = await API.get(
    `/api/recruits/${encodeURIComponent(industryName)}/detail`
  );

  return res.data.data || [];
}

export async function searchDetailJobs(
  industryName: string,
  keyword: string
): Promise<string[]> {
  const res = await API.get(
    `/api/recruits/${encodeURIComponent(industryName)}/detail/search`,
    {
      params: { keyword },
    }
  );

  return res.data.data || [];
}
