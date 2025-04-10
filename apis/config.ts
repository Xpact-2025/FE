import axios, { AxiosError } from 'axios';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      // refresh api로 accessToken 재발급
      return Promise.resolve(error.response);
    }
    return Promise.resolve(error.response);
  }
);

export default API;
