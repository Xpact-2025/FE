export default function ProfileImage() {
    return (
      <div className="relative w-[200px] h-[200px] mb-6">
        <img
          src="/profile.png"
          alt="profile"
          className="rounded-full w-full h-full object-cover"
        />
  
        <a className="absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
          <img
            src="/btnProfileImg.png"
            alt="upload"
            className="w-[40px] h-[40px]"
          />
        </a>
      </div>
    );
  }
  