import Link from 'next/link';
import { ReactNode } from 'react';

export default function SideBarMenu({
  href,
  icon,
  text,
  isActive,
}: {
  href: string;
  icon: ReactNode;
  text: string;
  isActive: boolean;
}) {
  return (
    <li
      className={`py-[16px] px-[18px] rounded-xl transition-colors group ${isActive ? 'bg-primary hover:bg-primary-100 text-gray-50' : 'text-gray-300 hover:text-gray-50'}`}
    >
      <Link href={href} className="body-14-sb">
        <div className="flex items-center space-x-[18px]">
          {icon}
          <p>{text}</p>
        </div>
      </Link>
    </li>
  );
}
