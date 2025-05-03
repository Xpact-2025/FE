import { getTest } from '@/apis/test';

export default async function MainPage() {
  const data = await getTest();
  return <div>{data.message}</div>;
}
