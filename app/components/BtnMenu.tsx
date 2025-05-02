import Link from 'next/link';

interface BtnMenuProps {
  title: string;
  menu: string;
}

export default function BtnMenu({ title, menu }: BtnMenuProps) {
  return (
    <Link href={`/${menu}`}>
      <div className="text-gray-50 hover:text-primary-50 active:text-primary-100 font-semibold">
        {title}
      </div>
    </Link>
  );
}
