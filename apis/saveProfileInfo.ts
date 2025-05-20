'use server';

import { cookies } from 'next/headers';
import API from './config';

export async function saveProfileInfo(
  name: string,
  imgUrl: string,
  age: number,
  degree: string,
  schoolName: string,
  major: string,
  schoolStatus: string,
  recruitName: string,
  detailRecruitName: string
) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access-token')?.value;
  if (!token) throw new Error('No access token');

  await API.patch(
    '/api/members',
    {
      name,
      imgurl: imgUrl,
      age,
      educationSaveRequestDto: {
        degree,
        name: schoolName,
        major,
        schoolStatus,
      },
      desiredRecruitRequestDto: {
        recruitName,
        detailRecruitName,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
