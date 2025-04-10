import API from './config';

interface TestResponse {
  code: string;
  httpStatus: number;
  message: string;
}

export async function getTest(): Promise<TestResponse> {
  const res = await API.get('/test/no-data');
  return res.data;
}
