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
