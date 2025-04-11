'use server';

import API from './config';

export type ExperienceStatus = 'DRAFT' | 'SAVE';

export type ExperienceType =
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

export type ExperienceFormType = 'STAR_FORM' | 'SIMPLE_FORM';

export interface ExperiencePayload {
  status: ExperienceStatus;
  experienceType: ExperienceType;
  formType: ExperienceFormType;
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

interface Experience {
  id: number;
  title: string;
  experienceType: string;
}

interface SaveExperienceResponse {
  httpStatus: number;
  message: string;
}

interface GetExperienceResponse {
  httpStatus: number;
  message: string;
  data: Experience[];
}

export async function saveExperience(
  payload: ExperiencePayload
): Promise<SaveExperienceResponse> {
  const res = await API.post<SaveExperienceResponse>('/api/exp', {
    ...payload,
    startDate: new Date(payload.startDate),
    endDate: new Date(payload.endDate),
  });

  return res.data;
}

export async function getMyExperience(): Promise<GetExperienceResponse> {
  const res = await API.get<GetExperienceResponse>('/api/exp');
  console.log(res.data);
  return res.data;
}
