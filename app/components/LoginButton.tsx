import { logout } from '@/apis/auth';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function LoginButton() {
  const token = (await cookies()).get('access-token');

  if (token) {
    return (
      <form action={logout}>
        <button
          type="submit"
          className="hover:text-primary-50 cursor-pointer font-semibold font-[Pretendard]"
        >
          로그아웃
        </button>
      </form>
    );
  }

  return (
    <Link
      href="/login"
      className="hover:text-primary-50 font-semibold font-[Pretendard]"
    >
      로그인
    </Link>
  );
}
