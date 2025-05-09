import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { schoolName } = await req.json();
  const token = cookies().get('access-token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const encoded = encodeURIComponent(schoolName);
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/educations/${encoded}/major`, {
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
    return NextResponse.json(
      { message: 'Failed to fetch majors' },
      { status: 500 }
    );
  }
}
