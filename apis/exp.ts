export interface ExperiencePayload {
  status: 'DRAFT' | 'SAVE';
  experienceType:
    | 'INTERN'
    | 'EXTERNAL_ACTIVITIES'
    | 'CONTEST'
    | 'PROJECT'
    | 'CERTIFICATES'
    | 'ACADEMIC_CLUB'
    | 'EDUCATION'
    | 'PRIZE'
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
}

export async function saveExperience(
  payload: ExperiencePayload
): Promise<ExperienceResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
    }),
  });

  const data = await res.json();
  return data;
}
