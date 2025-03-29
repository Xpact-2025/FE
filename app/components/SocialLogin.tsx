export default function SocialLogin() {
    return (
      <div className="w-[448px]">
        <div className="flex items-center justify-center space-x-4 text-gray-500">
          <hr className="flex-grow border-gray-600" />
          <span className="text-[14px] whitespace-nowrap">
            SNS 회원가입 및 로그인
          </span>
          <hr className="flex-grow border-gray-600" />
        </div>
  
        <div className="mt-5 flex justify-center space-x-10">
          <a href="#">
            <img src="/kakao.png" alt="kakao" className="w-[48px] h-[48px]" />
          </a>
          <a href="#">
            <img src="/naver.png" alt="naver" className="w-[48px] h-[48px]" />
          </a>
        </div>
      </div>
    );
  }
  