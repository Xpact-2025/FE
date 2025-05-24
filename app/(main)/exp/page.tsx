import { getMyExp } from '@/apis/exp';
import ExpList from './components/ExpList';

export default async function ExpMainPage() {
  const { httpStatus, data = [] } = await getMyExp();

  if (httpStatus !== 200) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="min-h-screen flex">
      <ExpList data={data} />
    </div>
  );
}
