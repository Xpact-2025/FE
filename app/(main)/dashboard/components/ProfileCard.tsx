import Image from 'next/image';

const ProfileCard = () => {
  return (
    <div className="mx-16 my-4">
      <p className="my-8">프로필</p>
      <div className="bg-[#222222] rounded-xl p-6">
        <div className="flex">
          <div className="flex flex-col items-center mr-10">
            <div className="relative w-64 h-64 mb-4">
              <Image
                src="/profile.png"
                alt="profile"
                width={400}
                height={400}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 space-y-8 ml-8 my-4">
            <div className="flex">
              <p>이름</p>
              <p className="ml-32">잇타</p>
            </div>
            <div className="flex">
              <p>나이</p>
              <p className="ml-32">24세</p>
            </div>
            <div className="flex">
              <p>학력</p>
              <p className="ml-32">잇타대학교</p>
            </div>
            <div className="flex">
              <p>희망 직무</p>
              <p className="ml-24">서비스 기획자</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
