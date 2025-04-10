'use server';

import API from './config';

export interface ExperiencePayload {
  status: 'DRAFT' | 'SAVE';
  experienceType:
    | 'CONTEST'
    | 'EXTERNAL_ACTIVITIES'
    | 'ACADEMIC_CLUB'
    | 'INTERN'
    | 'PROJECT'
    | 'EDUCATION'
    | 'PRIZE'
    | 'CERTIFICATES'
    | 'VOLUNTEER_WORK'
    | 'STUDY_ABROAD'
    | 'ETC';
  formType: 'STAR_FORM' | 'SIMPLE_FORM';
  title: string;
  startDate: Date;
  endDate: Date;
  keyword: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  role?: string;
  perform?: string;
}

interface ExperienceResponse {
  httpStatus: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export async function saveExperience(
  payload: ExperiencePayload
): Promise<ExperienceResponse> {
  const res = await API.post<ExperienceResponse>('/api/exp', {
    ...payload,
    startDate: new Date(payload.startDate),
    endDate: new Date(payload.endDate),
  });

  return res.data;
}
