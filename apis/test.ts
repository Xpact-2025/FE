import API from './config';

interface DefaultResponse {
  code: string;
  httpStatus: number;
  message: string;
}

export async function getTest(): Promise<DefaultResponse> {
  const res = await API.get('/test/no-data');
  return res.data;
}
