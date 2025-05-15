'use server';

import { cookies } from 'next/headers';
import API from './config';

export async function saveProfileInfo(
  name: string,
  imgUrl: string,
  age: number
) {
  const token = cookies().get('access-token')?.value;
  if (!token) throw new Error('No access token');

  await API.patch(
    '/api/members',
    {
      name,
      imgUrl,
      age,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function saveEducationInfo(
  degree: string,
  schoolName: string,
  major: string,
  schoolStatus: string,
  startedAt: string,
  endedAt: string
) {
  const token = cookies().get('access-token')?.value;
  if (!token) throw new Error('No access token');

  await API.post(
    '/api/educations',
    {
      degree,
      name: schoolName,
      major,
      schoolStatus,
      startedAt,
      endedAt,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function saveJobPreferences(jobs: string[]) {
  const token = cookies().get('access-token')?.value;
  if (!token) throw new Error('No access token');

  await API.patch('/api/recruits', jobs, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
