import { getTest } from '@/apis/test';

const DashboardPage = async () => {
  const test = await getTest();
  return <div className="text-primary headline-60-m">{test.message}</div>;
};

export default DashboardPage;
