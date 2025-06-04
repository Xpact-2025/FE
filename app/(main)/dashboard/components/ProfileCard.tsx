import Image from 'next/image';
import { ProfileInfo } from '@/apis/profile';

export default function ProfileCard({
  profileInfo,
}: {
  profileInfo: ProfileInfo;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-w-[120px] h-[270px]">
      <Image
        src={profileInfo.imgurl}
        alt="profile"
        width={110}
        height={110}
        className="rounded-full my-3 w-[110px] h-[110px]"
      />
      <div
        className={
          `px-4 py-1 bg-primary rounded-full text-gray-1000 ` +
          (profileInfo.desiredDetailRecruit.length > 7
            ? 'body-10-m'
            : 'body-12-m')
        }
      >
        {profileInfo.desiredDetailRecruit}
      </div>
      <h2 className="my-2 body-16-sb">{profileInfo.name}</h2>
      <div className="body-9-r text-gray-300 stroke-gray-300 flex flex-col">
        <p className="break-keep">{profileInfo.educationName}</p>
      </div>
    </div>
  );
}
