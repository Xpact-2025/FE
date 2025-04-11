import { getMyExperience } from '@/apis/exp';
import { Card, CardHeader, CardTitle, CardFooter } from './components/ExpCard';
import { MoreVertical } from 'lucide-react';

export default async function ExpMainPage() {
  const data = await getMyExperience();
  console.log(data);
  return (
    <div className="min-h-screen bg-black text-[#FFFFFF] flex">
      <main className="flex-1 flex-col items-start py-16 px-8">
        <h1 className="text-[25px] font-bold font-[Pretendard] mb-10">
          내 경험
        </h1>

        <div className="w-full flex flex-row space-x-4 overflow-x-auto">
          <Card className="bg-[#2C2C2C] text-white">
            <CardHeader className="mb-13">
              <CardTitle>경험 1</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
              <MoreVertical />
            </CardFooter>
          </Card>

          <Card className="bg-[#2C2C2C] text-white">
            <CardHeader className="mb-13">
              <CardTitle>경험 2</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
              <MoreVertical />
            </CardFooter>
          </Card>

          <Card className="bg-[#2C2C2C] text-white">
            <CardHeader className="mb-13">
              <CardTitle>경험 3</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
              <MoreVertical />
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
