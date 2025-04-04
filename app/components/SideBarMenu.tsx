import Link from 'next/link';
import Image from 'next/image';

export default function SideBarMenu({
  href,
  iconSrc,
  text,
  isActive,
}: {
  href: string;
  iconSrc: string;
  text: string;
  isActive: boolean;
}) {
  return (
    <li
      className={`py-[16px] px-[18px] rounded-xl ${isActive ? 'bg-primary hover:bg-primary-100 text-gray-50' : 'text-gray-300 hover:text-gray-50'}`}
    >
      <Link href={href} className="body-14-sb  transition-colors group">
        <div className="flex items-center space-x-[18px]">
          <Image
            src={iconSrc}
            alt={text}
            width={20}
            height={20}
            className="mr-[10px] w-[20px] h-[20px]"
          />
          {text}
        </div>
      </Link>
    </li>
  );
}
