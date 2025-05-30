import Image from 'next/image';

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-center justify-center p-2 min-w-[120px] h-[270px]">
      <Image
        src="/images/profile.svg"
        alt="profile"
        width={150}
        height={150}
        className="rounded-full my-3"
      />
      <div className="px-4 py-1 bg-primary rounded-full body-12-m text-gray-1000">
        서비스 기획자
      </div>
      <h2 className="my-2 body-16-sb">김잇타</h2>
      <div className="body-9-r text-gray-300 stroke-gray-300 flex flex-col">
        <span>잇타대학교 무슨학과</span>
        <span>24세</span>
      </div>
    </div>
  );
}
