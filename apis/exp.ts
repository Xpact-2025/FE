'use server';

import {
  ExperienceFormType,
  ExperienceStatus,
  ExperienceType,
} from '@/types/exp';
import API from './config';

export interface ExperiencePayload {
  id?: number;
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

export interface Experience {
  id: number;
  title: string;
  experienceType: ExperienceType;
}

interface SaveExperienceResponse {
  httpStatus: number;
  message: string;
}

interface GetExperienceResponse {
  httpStatus: number;
  message: string;
  data?: Experience[];
}

interface GetExperienceByIdResponse {
  httpStatus: number;
  message: string;
  data: ExperiencePayload;
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

export async function editExperience(
  exp_id: number,
  payload: ExperiencePayload
): Promise<SaveExperienceResponse> {
  const res = await API.patch<SaveExperienceResponse>(`/api/exp/${exp_id}`, {
    ...payload,
    startDate: new Date(payload.startDate),
    endDate: new Date(payload.endDate),
  });

  return res.data;
}

export async function getExperienceById(
  exp_id: number
): Promise<GetExperienceByIdResponse> {
  const res = await API.get<GetExperienceByIdResponse>(`/api/exp/${exp_id}`);

  return res.data;
}

export async function getMyExperience(): Promise<GetExperienceResponse> {
  const res = await API.get<GetExperienceResponse>('/api/exp');
  return res.data;
}

export async function deleteExperience(id: number) {
  const res = await API.delete(`/api/exp/${id}`);
  return res.data;
}
