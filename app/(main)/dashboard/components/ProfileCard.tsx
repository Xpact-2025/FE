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
        src={profileInfo.imgurl || '/images/mainprofile.svg'}
        alt="profile"
        width={110}
        height={110}
        className="rounded-full my-3 w-[110px] h-[110px]"
      />
      <div className="flex flex-col items-center text-center">
        <div
          className={
            `px-4 py-1 bg-primary rounded-full text-gray-1000 ` +
            (profileInfo.desiredDetailRecruit?.length > 7
              ? 'text-[10px] font-semibold'
              : 'text-[12px] font-semibold')
          }
        >
          {profileInfo.desiredDetailRecruit
            ? profileInfo.desiredDetailRecruit
            : '희망 직무를 입력해주세요'}
        </div>

        <h2 className="my-2 body-16-sb">{profileInfo.name}</h2>

        <div className="text-[11px] text-gray-300 stroke-gray-300 flex flex-col items-center text-center">
          <p className="break-keep">
            {profileInfo.educationName
              ? profileInfo.educationName
              : '학력 정보를 입력해주세요'}
          </p>
        </div>
      </div>
    </div>
  );
}
