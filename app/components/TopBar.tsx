import Profile from './Profile';
import { getProfileInfo } from '@/apis/profile';

export default async function TopBar() {
  const profileInfo = await getProfileInfo();

  return (
    <div className="flex justify-between pl-[398px] pr-[130px] bg-gray-1000 h-[100px] p-7">
      <div className="flex justify-end flex-grow">
        <Profile profileInfo={profileInfo.data} />
      </div>
    </div>
  );
}
