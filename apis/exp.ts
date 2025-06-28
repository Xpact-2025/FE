'use server';

import { ExpFormType, ExpStatus, ExpType, UploadType } from '@/types/exp';
import API from './config';

export interface ExpPayload {
  id?: number;
  experienceType: ExpType;
  qualification?: string;
  publisher?: string;
  issueDate?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  subExperiences: SubExperience[];
}

export interface SubExperience {
  subExperienceId?: number;
  tabName?: string;
  status: ExpStatus;
  formType?: ExpFormType;
  uploadType?: UploadType;
  subTitle?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  role?: string;
  perform?: string;
  simpleDescription?: string;
  files?: string[];
  keywords?: string[];
}

export interface Exp {
  id: number;
  title: string;
  experienceType: ExpType;
  draftTime?: string;
  status: ExpStatus;
  subTitles: string[];
  keywords: string[];
}

interface SaveExpResponse {
  httpStatus: number;
  message: string;
}

interface GetExpResponse {
  httpStatus: number;
  message: string;
  data?: Exp[];
}

interface GetExpByIdResponse {
  httpStatus: number;
  message: string;
  data: ExpPayload & { subExperiencesResponseDto: SubExperience[] };
}

interface DeleteExpResponse {
  httpStatus: number;
  message: string;
}

export async function saveExp(
  payload: ExpPayload & { subExperiences: SubExperience[] }
): Promise<SaveExpResponse> {
  const res = await API.post<SaveExpResponse>('/api/exp', payload);
  return res.data;
}

export async function editExp(
  exp_id: number,
  payload: ExpPayload & { subExperiences: SubExperience[] }
): Promise<SaveExpResponse> {
  const res = await API.patch<SaveExpResponse>(`/api/exp/${exp_id}`, payload);
  return res.data;
}

export async function getExpById(exp_id: number): Promise<GetExpByIdResponse> {
  const res = await API.get<GetExpByIdResponse>(`/api/exp/${exp_id}`);
  return res.data;
}

export async function getMyExp(): Promise<GetExpResponse> {
  const res = await API.get<GetExpResponse>('/api/exp');
  return res.data;
}

export async function deleteExp(exp_id: number): Promise<DeleteExpResponse> {
  const res = await API.delete(`/api/exp/${exp_id}`);
  return res.data;
}
