'use server';

import API from './config';

export async function saveProfileInfo(
  name: string,
  imgUrl: string,
  age: number
) {
  await API.patch('/api/members', {
    name,
    imgUrl,
    age,
  });
}

export async function saveEducationInfo(
  degree: string,
  schoolName: string,
  major: string,
  schoolStatus: string,
  startedAt: string,
  endedAt: string
) {
  await API.post('/api/educations', {
    degree,
    name: schoolName,
    major,
    schoolStatus,
    startedAt,
    endedAt,
  });
}

export async function saveJobPreferences(jobs: string[]) {
  await API.patch('/api/recruits', jobs);
}
