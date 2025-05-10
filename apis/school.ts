'use server';

import API from './config';
import { cookies } from 'next/headers';

export async function fetchSchools(): Promise<string[]> {
  const cookieStore = cookies();
  const token = cookieStore.get('access-token')?.value;

  if (!token) return [];

  const res = await API.get('/api/educations/name', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data || [];
}

export async function fetchMajors(schoolName: string): Promise<string[]> {
  const cookieStore = cookies();
  const token = cookieStore.get('access-token')?.value;

  if (!token) return [];

  const res = await API.get(
    `/api/educations/${encodeURIComponent(schoolName)}/major`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data || [];
}
