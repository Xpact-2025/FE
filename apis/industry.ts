'use server';

import { cookies } from 'next/headers';
import API from './config';

export async function fetchIndustryList(): Promise<string[]> {
  const token = cookies().get('access-token')?.value;
  if (!token) return [];

  const res = await API.get('/api/recruits/name', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data || [];
}

export async function fetchJobsByIndustry(
  industryName: string
): Promise<string[]> {
  const token = cookies().get('access-token')?.value;
  if (!token) return [];

  const res = await API.get(
    `/api/recruits/${encodeURIComponent(industryName)}/detail`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data || [];
}
