import React from 'react';
import AddExperienceClient from './components/AddExperienceClient';
import { getExperienceById } from '@/apis/exp';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await searchParams;
  console.log(param);
  if (param.id) {
    console.log('id:', param.id);
    const { httpStatus, data } = await getExperienceById(Number(param.id));
    if (httpStatus !== 200) {
      return <div>오류가 발생했습니다.</div>;
    }
    console.log('experience:', data);
  }

  return (
    <div>
      <AddExperienceClient />
    </div>
  );
}
