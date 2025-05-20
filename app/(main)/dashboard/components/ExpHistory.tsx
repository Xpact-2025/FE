'use client';

import React from 'react';
import Calendar from '@/app/components/commons/Calendar';
import HelpIcon from '@/public/icons/Circle_Help.svg';

const MARKED_DATES = {
  '2025-05-04': 1,
  '2025-05-13': 2,
  '2025-05-18': 1,
  '2025-05-19': 2,
  '2025-05-24': 1,
  '2025-05-25': 2,
} as const;

export default function ExpHistory() {
  return (
    <>
      <div className="flex mb-6">
        <span className="body-23-b mr-2">경험 히스토리</span>
        <HelpIcon className="stroke-gray-600" />
      </div>
      <Calendar markedDates={MARKED_DATES} />
    </>
  );
}
