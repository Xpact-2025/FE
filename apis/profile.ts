'use server';

import API from './config';
import { redirect } from 'next/navigation';

export interface ProfileInfoResponse {
  httpStatus: number;
  message: string;
  data: ProfileInfo;
  success: boolean;
}

export interface ProfileInfo {
  name: string;
  imgurl: string;
  age: number;
  educationName: string;
  desiredDetailRecruit: string;
}

export async function getProfileInfo(): Promise<ProfileInfoResponse> {
  try {
    const res = await API.get('/api/members');

    const { desiredDetailRecruit, educationName } = res.data.data;

    if (res.status !== 200 || !desiredDetailRecruit || !educationName) {
      console.log('프로필 정보 불러오기 실패', res.data);
      redirect('/profile');
    }

    return res.data;
  } catch (err) {
    console.error('프로필 정보 불러오기 실패', err);
    redirect('/profile');
  }
}

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
  await API.patch('/api/members', {
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
  });
}
