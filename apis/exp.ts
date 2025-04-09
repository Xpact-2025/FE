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
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
