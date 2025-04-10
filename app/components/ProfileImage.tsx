import Image from "next/image";
import Link from "next/link";

export default function ProfileImage() {
    return (
      <div className="relative mb-6">
        <Image
          src="/profile.png"
          alt="profile"
          width={200}
          height={200}
          className="rounded-full w-full h-full object-cover"
        />
  
        <Link href="#" className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
          <Image
            src="/btnProfileImg.png"
            alt="upload"
            width={40}
            height={40}
          />
        </Link>
      </div>
    );
  }
  