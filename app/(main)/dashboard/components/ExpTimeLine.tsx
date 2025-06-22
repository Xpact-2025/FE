import HelpIcon from '@/public/icons/Circle_Help.svg';
import Timeline from '@/app/components/commons/Timeline';
import { getExpTimeline } from '@/apis/dashboard';

function getStartAndEndLines(): { startLine: string; endLine: string } {
  const now = new Date();

  // endLine: 이번 달의 마지막 날
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  console.log('end', end);

  // startLine: 두 달 전의 첫째 날
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 2);
  console.log('start', start);

  const toString = (date: Date) => date.toISOString().split('T')[0]; // yyyy-mm-dd 형식

  return {
    startLine: toString(start),
    endLine: toString(end),
  };
}

export default async function ExpTimeLine() {
  const { startLine, endLine } = getStartAndEndLines();
  const Exp = await getExpTimeline(startLine, endLine);

  return (
    <>
      <div className="flex mb-3">
        <span className="body-16-sb mr-2">경험 타임 라인</span>
        <HelpIcon className="stroke-gray-600 w-[24px] h-[24px]" />
      </div>
      <Timeline experiences={Exp.data} />
    </>
  );
}
