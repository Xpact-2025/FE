'use client';

import Profile from './Profile';

export default function TopBar() {
  return (
    <div className="flex justify-between pl-[398px] pr-[130px] bg-gray-1000 h-[100px] p-7">
      <div className="flex justify-end flex-grow">
        <Profile />
      </div>
    </div>
  );
}
