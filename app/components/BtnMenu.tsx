'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BtnMenuProps {
  title: string;
  menu: string;
}

export default function BtnMenu({ title, menu }: BtnMenuProps) {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setHasToken(!!token);
  }, []);

  const handleClick = () => {
    if (!hasToken) {
      alert('로그인 후 이용할 수 있습니다.');
      return;
    }
    router.push(`/${menu}`);
  };

  return (
    <div
      onClick={handleClick}
      className="text-gray-50 hover:text-primary-50 active:text-primary-100 cursor-pointer"
    >
      {title}
    </div>
  );
}
