import Image from 'next/image';
import Link from 'next/link';

export default function ProfileImage() {
  return (
    <div className="relative mb-6">
      <Image
        src="/images/mainporfile.svg"
        alt="profile"
        width={200}
        height={200}
        className="rounded-full object-cover w-[200px] h-[200px]"
      />

      <Link
        href="#"
        className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer"
      >
        <Image
          src="/images/btnProfileImg.svg"
          alt="upload"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
}
