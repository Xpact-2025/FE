'use server';

import API from './config';

export async function saveProfileInfo(
  name: string,
  imgUrl: string,
  age: number,
  degree: string,
  schoolName: string,
  major: string,
  schoolStatus: string,
  recruitName: string,
  detailRecruitName: string
) {
  await API.patch('/api/members', {
    name,
    imgurl: imgUrl,
    age,
    educationSaveRequestDto: {
      degree,
      name: schoolName,
      major,
      schoolStatus,
    },
    desiredRecruitRequestDto: {
      recruitName,
      detailRecruitName,
    },
  });
}
