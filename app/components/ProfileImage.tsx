'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export default function ProfileImage() {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative mb-6">
      <Image
        src={profileImg || '/images/mainporfile.svg'}
        alt="profile"
        width={200}
        height={200}
        className="rounded-full object-cover w-[200px] h-[200px]"
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleClick}
        className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/images/btnProfileImg.svg"
          alt="upload"
          width={40}
          height={40}
        />
      </button>
    </div>
  );
}
