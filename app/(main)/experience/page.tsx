import { Experience, getMyExperience } from '@/apis/exp';
import { Card, CardHeader, CardTitle, CardFooter } from './components/ExpCard';
import { MoreVertical } from 'lucide-react';
import ExpType from './components/ExpType';
import Link from 'next/link';

export default async function ExpMainPage() {
  const data = await getMyExperience();
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
