import { getTest } from '@/apis/test';

const DashboardPage = async () => {
  const test = await getTest();
  return <div>{test.message}</div>;
};

export default DashboardPage;
