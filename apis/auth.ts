'use server';

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
    educationName: string;
    desiredDetailRecruit: string;
  };
  success: boolean;
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
  const res = await API.post<LoginResponse>('/auth/login/form', payload);

  if (res.status == 200) setAccessTokenCookie(res.data.data.accessToken);

  return res.data;
}

export async function signupUser(
  payload: SignupPayload
): Promise<SignupResponse> {
  const res = await API.post<SignupResponse>('/auth/signup', {
    ...payload,
    type: payload.type ?? 'FORM',
    role: payload.role ?? 'ROLE_USER',
  });

  return res.data;
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

export async function getMyInfo(): Promise<MemberInfoResponse> {
  try {
    const res = await API.get<MemberInfoResponse>('/api/members');
    return res.data;
  } catch (error) {
    console.error('[getMyInfo 에러]', error);
    // 예외 발생 시 프로필 설정 페이지로 리디렉션
    redirect('/profile');
  }
}
