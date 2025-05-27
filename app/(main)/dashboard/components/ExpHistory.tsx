'use client';

import React from 'react';
import Calendar from '@/app/components/commons/Calendar';
import HelpIcon from '@/public/icons/Circle_Help.svg';
import { ExpHisoryResponse } from '@/apis/dashboard';

export default function ExpHistory({
  expHistory,
}: {
  expHistory: ExpHisoryResponse;
}) {
  const dateCounts = expHistory.data.dateCounts;

  return (
    <>
      <div className="flex mb-6">
        <span className="body-16-sb mr-2">경험 히스토리</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <Calendar dateCounts={dateCounts} />
    </>
  );
}
