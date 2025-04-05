interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface SignupPayload {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  type?: 'FORM' | 'KAKAO';
  role?: 'ROLE_USER' | 'ROLE_ADMIN';
}

interface SignupResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    email: string;
    name: string;
  };
}

interface ExperiencePayload {
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

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/form`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();
  return data;
}

export async function signupUser(
  payload: SignupPayload
): Promise<SignupResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      type: payload.type ?? 'FORM',
      role: payload.role ?? 'ROLE_USER',
    }),
  });

  const data = await res.json();
  return data;
}

export async function saveExperience(
  payload: ExperiencePayload
): Promise<ExperienceResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}
