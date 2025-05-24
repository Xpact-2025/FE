'use server';

import API from './config';

export async function fetchSchools(): Promise<string[]> {
  const res = await API.get('/api/educations/name');

  return res.data.data || [];
}

export async function fetchMajors(schoolName: string): Promise<string[]> {
  const res = await API.get(
    `/api/educations/${encodeURIComponent(schoolName)}/major`
  );

  return res.data.data || [];
}

// 검색
export async function searchSchools(keyword: string): Promise<string[]> {
  const res = await API.get('/api/educations/name/search', {
    params: { keyword },
  });

  return res.data.data || [];
}

export async function searchMajors(
  schoolName: string,
  keyword: string
): Promise<string[]> {
  const res = await API.get(
    `/api/educations/${encodeURIComponent(schoolName)}/major/search`,
    {
      params: { keyword },
    }
  );

  return res.data.data || [];
}
