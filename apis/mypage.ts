'use server';

import API from './config';

export interface MemberResponse {
  httpStatus: number;
  message: string;
  data: {
    name: string;
    imgurl: string;
    age: number;
    educationName: string;
    desiredDetailRecruit: string;
  };
  success: boolean;
}

export async function getMemberInfo(): Promise<MemberResponse> {
  const res = await API.get<MemberResponse>('/api/members');

  if (res.status !== 200) {
    console.error('멤버 정보 불러오기 실패:', res.data);
  }

  return res.data;
}
