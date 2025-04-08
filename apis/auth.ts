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


//카카오 로그인
export async function getKakaoAuthUrl(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/url/kakao`);
  if (!res.ok) {
    throw new Error('카카오 인증 URL 요청 실패');
  }

  const url = await res.text();
  return url;
}


interface KakaoLoginResponse {
  httpStatus?: number;
  code?: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export async function kakaoLogin(code: string): Promise<KakaoLoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login/kakao?code=${code}`,
    {
      method: 'POST',
    }
  );

  if (!res.ok) {
    throw new Error('카카오 로그인 실패');
  }

  const data = await res.json();
  return data;
}

