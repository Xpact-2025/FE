'use server';

import API from './config';

export interface ScrapActivity {
  id: number;
  title: string;
  imgUrl: string;
  scrapType: string;
  dday: string;
}

export interface GetScrapActivitiesResponse {
  httpStatus: number;
  message: string;
  data: ScrapActivity[];
}

export async function addScrap(scrapId: number): Promise<boolean> {
  try {
    const res = await API.post(`/api/scrap/${scrapId}`);
    return res.status === 200;
  } catch (e) {
    console.error(`스크랩 추가 실패 (id: ${scrapId}):`, e);
    return false;
  }
}

export async function removeScrap(scrapId: number): Promise<boolean> {
  try {
    const res = await API.delete(`/api/scrap/${scrapId}`);
    return res.status === 200;
  } catch (e) {
    console.error(`스크랩 삭제 실패 (id: ${scrapId}):`, e);
    return false;
  }
}

export async function getScrapActivities(): Promise<GetScrapActivitiesResponse> {
  try {
    const res = await API.get<GetScrapActivitiesResponse>(
      '/api/scrap/activities'
    );
    return res.data;
  } catch (e) {
    console.error('스크랩된 활동 목록 조회 실패:', e);
    return { httpStatus: 500, message: 'fail', data: [] };
  }
}
