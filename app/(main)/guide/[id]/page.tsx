'use client';

import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { getAIActivityDetail } from '@/apis/guide';
import { EXP_STYLES } from '@/constants/expStyles';
import BackIcon from '@/public/icons/Chevron_Left.svg';
import { useEffect, useState } from 'react';
import type { AIActivityDetail } from '@/apis/guide';

const SCRAP_TYPE_MAP = {
  ACTIVITY: 'EXTERNAL_ACTIVITIES',
  INTERN: 'INTERN',
  COMPETITION: 'CONTEST',
  EDUCATION: 'EDUCATION',
} as const;

const SCRAP_TYPE_LABEL_MAP: Record<string, string> = {
  ACTIVITY: '대외활동',
  INTERN: '인턴',
  COMPETITION: '공모전',
  EDUCATION: '교육',
};

export default function GuideDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [data, setData] = useState<AIActivityDetail | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const result = await getAIActivityDetail(id);
      if (result) {
        setData(result);
      } else {
        console.error('상세 정보가 없습니다.');
      }
    })();
  }, [id]);

  if (!data) return null;

  const styleKey = SCRAP_TYPE_MAP[data.scrapType] ?? 'ETC';
  const typeStyle = EXP_STYLES[styleKey];
  const scrapTypeLabel = SCRAP_TYPE_LABEL_MAP[data.scrapType] ?? data.scrapType;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* 제목 + 뒤로가기 */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => router.push('/guide')}
          aria-label="뒤로가기"
        >
          <BackIcon className="stroke-gray-50 w-[35px] h-[35px] cursor-pointer" />
        </button>

        <h1 className="text-[25px] font-bold flex items-center justify-center gap-2">
          {data.title}
          <span className={`text-xs px-2 py-1 rounded-2xl ${typeStyle}`}>
            {scrapTypeLabel}
          </span>
        </h1>
      </div>

      {/* 본문 내용 */}
      <div className="flex flex-col lg:flex-row gap-10 bg-gray-800 rounded-xl p-10 xl:p-15">
        {/* 설명 영역 */}
        <div className="basis-1/2 text-gray-300 space-y-5">
          <Detail label="주제" value={data.jobCategory.join(', ')} />
          <Detail
            label="모집 기간"
            value={`${data.startDate} ~ ${data.endDate}`}
          />
          {data.eligibility && (
            <Detail label="지원 자격" value={data.eligibility} />
          )}
          {data.benefits && <Detail label="혜택" value={data.benefits} />}
          {data.enterpriseType && (
            <Detail label="기업 형태" value={data.enterpriseType} />
          )}
          {data.region && <Detail label="지역" value={data.region} />}
          {data.onOffLine && (
            <Detail label="진행 방식" value={data.onOffLine} />
          )}
          <Detail
            label="웹사이트"
            value={
              data.referenceUrl !== '-' ? (
                <a
                  href={data.referenceUrl}
                  target="_blank"
                  className="text-gray-300 underline hover:text-primary"
                >
                  {data.referenceUrl}
                </a>
              ) : (
                '없음'
              )
            }
          />
        </div>

        {/* 이미지 영역 */}
        <div className="basis-1/2">
          <Image
            src={data.imageUrl}
            alt={data.title}
            width={400}
            height={600}
            className="rounded-lg w-full h-auto"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 xl:gap-10 mb-8 xl:mb-10">
      <div className="w-24 shrink-0 text-[18px] xl:text-[20px] text-white leading-relaxed">
        {label}
      </div>
      <div className="flex-1 text-[18px] xl:text-[20px] text-gray-300 leading-relaxed whitespace-pre-wrap">
        {value}
      </div>
    </div>
  );
}
