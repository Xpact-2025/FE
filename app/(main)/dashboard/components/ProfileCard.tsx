import Image from 'next/image';
import BuildingIcon from '@/public/icons/Building.svg';
import UserCardIdIcon from '@/public/icons/User_Card_ID.svg';
export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center justify-center p-4 ">
      <Image
        src="/profile.png"
        alt="profile"
        width={180}
        height={180}
        className="rounded-full my-4"
      />
      <div className="px-4 py-1 mt-2 bg-primary rounded-full body-16-sb text-gray-900">
        서비스 기획자
      </div>
      <h2 className="mt-2 font-semibold text-[25px]">김잇타</h2>
      <hr className="border-gray-600 border-[1.5] w-full my-6" />
      <div className="font-body-16-r text-gray-300 stroke-gray-300 flex flex-col gap-[12px]">
        <div className="mb-1 flex items-center gap-2">
          <BuildingIcon />
          잇타대학교 무슨학과<span className="body-12-m">졸업</span>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <UserCardIdIcon />
          24세
        </div>
      </div>
    </div>
  );
}
