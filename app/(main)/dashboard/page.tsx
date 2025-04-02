import { getTest } from '@/apis/test';

const DashboardPage = async () => {
  const test = await getTest();
  return <div className="text-primary">{test.message}</div>;
};

export default DashboardPage;
