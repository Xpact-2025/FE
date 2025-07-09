'use client';

import Image from 'next/image';
import { logout } from '@/apis/auth';
import { ProfileInfo } from '@/apis/profile';
import { useRouter } from 'next/navigation';

export default function Profile({ profileInfo }: { profileInfo: ProfileInfo }) {
  const router = useRouter();

  const handleImageClick = () => {
    router.push('/myPage');
  };

  return (
    <div className="flex justify-end relative">
      <div className="flex items-center justify-center gap-7 text-gray-50 body-16-sb">
        <div
          onClick={handleImageClick}
          className="cursor-pointer flex gap-3 justify-center items-center"
        >
          <Image
            src={profileInfo.imgurl || '/images/mainprofile.svg'}
            alt="profile"
            width={36}
            height={36}
          />
          <p className="whitespace-nowrap">{profileInfo.name}</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="body-14-m text-gray-50 cursor-pointer"
          >
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
}
