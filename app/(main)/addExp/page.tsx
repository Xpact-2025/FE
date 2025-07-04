import React from 'react';
import ExpForm from './components/ExpForm';
import { getExpById, ExpPayload, SubExperience } from '@/apis/exp';

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  if (!params.id) return <ExpForm />;

  const { httpStatus, data } = await getExpById(Number(params.id));

  if (httpStatus !== 200) return <div>오류가 발생했습니다.</div>;

  return (
    <ExpForm
      data={data as ExpPayload & { subExperiencesResponseDto: SubExperience[] }}
    />
  );
}
