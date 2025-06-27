'use client';

import React from 'react';
import Calendar from '@/app/components/commons/Calendar';
import { ExpHisoryResponse } from '@/apis/dashboard';
import DashboardHeader from './DashboardHeader';
import { DASHBOARD_INFO } from '@/constants/dashboardInfo';

export default function ExpHistory({
  expHistory,
}: {
  expHistory: ExpHisoryResponse;
}) {
  const dateCounts = expHistory.data.dateCounts;

  return (
    <>
      <DashboardHeader
        title={DASHBOARD_INFO.EXP_HISTORY.title}
        info={DASHBOARD_INFO.EXP_HISTORY.info}
      />
      <Calendar dateCounts={dateCounts} />
    </>
  );
}
