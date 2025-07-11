'use server';

import { AxiosError } from 'axios';
import API from './config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface SignupPayload {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  type?: 'FORM' | 'KAKAO';
  role?: 'ROLE_USER' | 'ROLE_ADMIN';
  imageUrl?: string;
}

interface SignupResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    email: string;
    name: string;
  };
}

interface MemberInfoResponse {
  httpStatus: number;
  message: string;
  data: {
    name: string;
    imgurl: string;
    age: number;
    educationDegree: string;
    educationName: string;
    desiredDetailRecruit: string;
  };
  success: boolean;
}

interface ErrorResponse {
  code?: string;
  message?: string;
}

interface NaverLoginResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export async function setAccessTokenCookie(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일 후 만료

  const cookieStore = await cookies();
  cookieStore.set('access-token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    expires: expiresAt,
  });
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const res = await API.post<LoginResponse>('/auth/login/form', payload);

    if (res.status === 200) {
      await setAccessTokenCookie(res.data.data.accessToken);
    }

    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<LoginResponse>;
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    throw error;
  }
}

export async function signupUser(
  payload: SignupPayload
): Promise<SignupResponse> {
  try {
    const res = await API.post<SignupResponse>('/auth/signup', {
      ...payload,
      type: payload.type ?? 'FORM',
      role: payload.role ?? 'ROLE_ADMIN',
    });

    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<SignupResponse>;
    if (axiosError.response?.data) {
      return axiosError.response.data;
    }
    throw error;
  }
}

//카카오 로그인
export async function getKakaoAuthUrl(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/url/kakao`);
  if (!res.ok) {
    throw new Error('카카오 인증 URL 요청 실패');
  }

  const url = await res.text();
  console.log(url);
  return url;
}

interface KakaoLoginResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export async function kakaoLogin(code: string): Promise<KakaoLoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao?code=${code}`,
    {
      method: 'POST',
    }
  );
  console.log(res);

  if (!res.ok) {
    throw new Error('카카오 로그인 실패');
  }

  const data = await res.json();
  console.log(data);

  if (res.status === 200) await setAccessTokenCookie(data.data.accessToken);

  return data;
}

export async function logout() {
  try {
    await API.post('/auth/logout');
  } catch (error) {
    console.error('로그아웃 API 오류:', error);
  }

  // 쿠키 삭제
  (await cookies()).delete('access-token');

  redirect('/login');
}

export async function refreshAccessToken(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // 쿠키 포함 (Refresh Token)
  });
  console.log('refreshToken 에러', await res.json());

  if (!res.ok) {
    throw new Error('AccessToken 재발급 실패');
  }

  const data = await res.json();
  return data.data; // 토큰만 리턴
}

export async function getNaverAuthUrl(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/url/naver`);
  if (!res.ok) throw new Error('네이버 인증 URL 요청 실패');
  return await res.text();
}

export async function naverLogin(
  code: string,
  state: string
): Promise<NaverLoginResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login/naver?code=${code}&state=${state}`;
  console.log('네이버 로그인 요청:', url);

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include', // 혹시 백엔드에서 쿠키 기반 인증 시
  });

  const text = await res.text();
  console.log('응답 상태코드:', res.status);
  console.log('응답 본문:', text);

  if (!res.ok) throw new Error('네이버 로그인 실패');

  const data = JSON.parse(text);
  if (res.status === 200) await setAccessTokenCookie(data.data.accessToken);
  return data;
}

export async function getMyInfo(): Promise<MemberInfoResponse> {
  try {
    const res = await API.get<MemberInfoResponse>('/api/members');
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    const status = axiosError.response?.status;
    const code = axiosError.response?.data?.code;

    if (
      status === 404 ||
      status === 401 ||
      (status === 500 && code === 'SE001')
    ) {
      throw new Error('NO_PROFILE');
    }

    throw new Error('UNKNOWN_ERROR');
  }
}
