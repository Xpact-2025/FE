import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { refreshAccessToken } from './auth';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

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
  error => Promise.reject(error)
);

API.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();
      } catch (refreshError) {
        console.error('토큰 재발급 실패', refreshError);
        redirect('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
