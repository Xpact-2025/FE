import { Experience, getMyExperience } from '@/apis/exp';
import Link from 'next/link';
import ExpeienceCard from './components/ExperienceCard';

export default async function ExpMainPage() {
  const { httpStatus, data } = await getMyExperience();

  if (httpStatus !== 200) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (!data || data.length === 0) {
    return <div>경험이 존재하지 않습니다.</div>;
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex-col items-start py-16 px-8">
        <h1 className="text-[25px] font-bold mb-10 flex items-center justify-between">
          <span>내 경험</span>
          <Link href="/addExperience">
            <div className="w-20 py-3 bg-primary-50 text-sm text-black text-center font-semibold rounded-lg flex items-center justify-center">
              경험 추가
            </div>
          </Link>
        </h1>

        <div className="w-full h-full flex flex-row space-x-4 overflow-x-auto">
          {data.map((experience: Experience) => (
            <ExpeienceCard
              key={experience.id}
              title={experience.title}
              type={experience.experienceType}
              isTemp={false}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
