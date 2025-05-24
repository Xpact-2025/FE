'use server';

import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async config => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  error => {
    console.error('[요청 에러]', error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log('[401 에러] 인증 필요:', error.response.data);
      // refresh api로 accessToken 재발급 로직 추가 필요
      redirect('/login');
    }
    console.error('[응답 에러]', error.message);
    return Promise.reject(error);
  }
);

export default API;
