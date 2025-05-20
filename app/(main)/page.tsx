import { getTest } from '@/apis/test';
import { redirect } from 'next/navigation';

export default async function MainPage() {
  const { httpStatus } = await getTest();
  if (httpStatus !== 200) redirect('/login');
  redirect('/dashboard');
}
