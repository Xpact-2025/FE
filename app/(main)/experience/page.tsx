import { Experience, getMyExperience } from '@/apis/exp';
import ExpeienceCard from './components/ExperienceCard';
import ExpBtn from '@/app/components/ExpBtn';

export default async function ExpMainPage() {
  const { httpStatus, data } = await getMyExperience();

  if (httpStatus !== 200) {
    return <div>오류가 발생했습니다.</div>;
  }

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 flex-col items-start py-16 px-[80px]">
        <h1 className="text-[25px] font-bold mb-10 flex items-center justify-between">
          <span>내 경험</span>
          <ExpBtn href="/addExperience " className="bg-primary-50 text-black">
            경험 추가
          </ExpBtn>
        </h1>

        {!data || (data.length === 0 && <div>경험이 존재하지 않습니다.</div>)}

        <div className="w-full flex flex-wrap space-x-[28px] space-y-[37px]">
          {data?.map((experience: Experience) => (
            <ExpeienceCard
              key={experience.id}
              id={experience.id}
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
