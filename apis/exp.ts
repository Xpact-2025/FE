'use server';

import { ExpFormType, ExpStatus, ExpType } from '@/types/exp';
import API from './config';

export interface ExpPayload {
  id?: number;
  status: ExpStatus;
  experienceType: ExpType;
  formType?: ExpFormType;
  qualification?: string;
  publisher?: string;
  issueDate?: Date;
  simpleDescription?: string;
  title?: string;
  startDate?: Date;
  endDate?: Date;
  role?: string;
  perform?: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  files?: string[];
  keywords?: string[];
}

export interface Exp {
  id: number;
  title: string;
  experienceType: ExpType;
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
  data: ExpPayload;
}

export async function saveExp(payload: ExpPayload): Promise<SaveExpResponse> {
  const res = await API.post<SaveExpResponse>('/api/exp', {
    ...payload,
    issueDate: payload.issueDate ? new Date(payload.issueDate) : undefined,
    startDate: payload.startDate ? new Date(payload.startDate) : undefined,
    endDate: payload.endDate ? new Date(payload.endDate) : undefined,
  });

  return res.data;
}

export async function editExp(
  exp_id: number,
  payload: ExpPayload
): Promise<SaveExpResponse> {
  const res = await API.patch<SaveExpResponse>(`/api/exp/${exp_id}`, {
    ...payload,
    issueDate: payload.issueDate ? new Date(payload.issueDate) : undefined,
    startDate: payload.startDate ? new Date(payload.startDate) : undefined,
    endDate: payload.endDate ? new Date(payload.endDate) : undefined,
  });

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

export async function deleteExp(id: number) {
  const res = await API.delete(`/api/exp/${id}`);
  return res.data;
}
