import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access-token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const baseUrl = process.env.API_URL;
    const res = await fetch(`${baseUrl}/api/educations/name`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const json = await res.json();
    return NextResponse.json(json.data || []);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch' }, { status: 500 });
  }
}
