interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  code: string;
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
  success: boolean;
  code: string;
  message: string;
  data: {
    email: string;
    name: string;
  };
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
}

export async function signupUser(payload: SignupPayload): Promise<SignupResponse> {
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