import Image from 'next/image';

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
      <hr className="border-gray-600 border-[1.5] w-full my-2" />
      <div className="font-body-16-r text-gray-300 stroke-gray-300 flex flex-col items-center">
        <div className="mb-1">
          잇타대학교 무슨학과<span className="body-12-m mx-2">졸업</span>
        </div>
        <div className="">24세</div>
      </div>
    </div>
  );
}
