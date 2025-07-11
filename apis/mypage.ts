'use server';

import { redirect } from 'next/navigation';
import API from './config';
import { AxiosError } from 'axios';

export interface MemberResponse {
  httpStatus: number;
  message: string;
  data: {
    name: string;
    imgurl: string;
    age: number;
    educationDegree: string;
    educationName: string;
    schoolState: string;
    desiredDetailRecruit: string;
  };
  success: boolean;
}

export async function getMemberInfo(): Promise<MemberResponse> {
  try {
    const res = await API.get('/api/members');

    if (res.status !== 200) {
      console.log('프로필 정보 불러오기 실패', res.data);
      redirect('/profile');
    }

    return res.data;
  } catch (err) {
    console.error('프로필 정보 불러오기 실패', err);
    if (
      err instanceof AxiosError &&
      (err?.response?.status === 401 || err?.response?.status === 403)
    ) {
      redirect('/login');
    }
    if (
      err instanceof AxiosError &&
      (err?.response?.status === 500 ||
        err?.response?.status === 404 ||
        err?.response?.status === 400)
    ) {
      redirect('/profile');
    }
    redirect('/login');
  }
}
