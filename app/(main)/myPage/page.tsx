'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getMemberInfo, MemberResponse } from '../../../apis/mypage';
import ProfileItem from './components/MypageItem';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ProfileForm from '@/app/profile/components/ProfileForm';

export default function MyPage() {
  const [member, setMember] = useState<MemberResponse['data'] | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMemberInfo();
      setMember(res.data);
    };
    fetch();
  }, []);

  if (!member) {
    return (
      <div className="h-[80%] flex justify-center items-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  //수정 폼
  if (isEditing) {
    return (
      <div className="bg-black text-white min-h-screen">
        <ProfileForm
          initialData={{
            name: member.name,
            age: String(member.age),
            educationName: member.educationName,
            desiredDetailRecruit: member.desiredDetailRecruit,
            imgurl: member.imgurl,
          }}
          isEditMode={true}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="bg-black text-gray-50 w-full flex flex-col items-center py-12 px-4">
      <h2 className="text-2xl font-semibold mb-8 flex items-center gap-2">
        프로필 정보{' '}
        <span
          className="text-sm cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          <Image
            src="/images/Edit_Pencil.svg"
            alt="프로필 수정"
            width={22}
            height={22}
          />
        </span>
      </h2>

      {/* 프로필 이미지 */}
      <div className="relative w-40 h-40 mb-20">
        <Image
          src={member.imgurl}
          alt="프로필 이미지"
          fill
          className="rounded-full object-cover border border-gray-600"
        />
        <div className="absolute bottom-1 right-2 bg-black rounded-full w-6 h-6 flex items-center justify-center text-xs">
          <Image
            src="/images/btnProfileImg.svg"
            alt="upload"
            width={40}
            height={40}
          />
        </div>
      </div>

      {/* 프로필 정보 */}
      <div className="w-full flex flex-col items-center">
        <div className="flex flex-col space-y-8 mx-auto">
          <div className="flex gap-4">
            <ProfileItem
              label="이름"
              value={
                <div className="flex">
                  <span className="mr-23">{member.name}</span>
                  <span className="text-gray-400 w-20">나이</span>
                  <span className="text-white">{member.age}</span>
                </div>
              }
            />
          </div>
          <ProfileItem label="학력" value={member.educationName} />
          <ProfileItem label="희망 직무" value={member.desiredDetailRecruit} />
        </div>
      </div>
    </div>
  );
}
