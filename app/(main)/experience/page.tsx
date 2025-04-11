import { Experience, getMyExperience } from '@/apis/exp';
import { Card, CardHeader, CardTitle, CardFooter } from './components/ExpCard';
import { MoreVertical } from 'lucide-react';
import ExpType from './components/ExpType';

export default async function ExpMainPage() {
  const data = await getMyExperience();
  return (
    <div className="min-h-screen bg-black text-[#FFFFFF] flex">
      <main className="flex-1 flex-col items-start py-16 px-8">
        <h1 className="text-[25px] font-bold font-[Pretendard] mb-10">
          내 경험
        </h1>

        <div className="w-full flex flex-row space-x-4 overflow-x-auto">
          {data.data.map((experience: Experience) => (
            <Card key={experience.id} className="bg-[#2C2C2C] text-white">
              <CardHeader className="mb-13">
                <CardTitle>{experience.title}</CardTitle>
              </CardHeader>
              <CardFooter className="justify-end">
                <ExpType expType={experience.experienceType} />
                <MoreVertical />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
