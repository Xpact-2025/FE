// import Footer from '../components/Footer';
// import NavBar from '../components/NavBar';

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen bg-black text-white font-[Pretendard]">
//       <NavBar />
//       <main className="flex flex-col items-center justify-center py-16 px-4">
//         <div className="flex flex-col items-center mb-10">
//           <img src="/logo2.png" alt="Xpact" className="w-[59px] h-[48px] mb-4" />
//           <h1 className="text-[35px] font-semibold">로그인</h1>
//         </div>

//         <div className="w-full max-w-sm space-y-5">
//           <div className="relative">
//             <div className='text-[18px] mb-[2%] ml-[1%]'>아이디</div>
//             <input
//               type="text"
//               placeholder="아이디"
//               className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded border border-[#333] placeholder:text-[#777]"
//             />
//             <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">✔</span>
//           </div>

//           <div className="relative">
//             <div className='text-[18px] mb-[2%] ml-[1%]'>비밀번호</div>
//             <input
//               type="password"
//               placeholder="비밀번호"
//               className="w-full text-[16px] px-4 py-3 bg-[#161616] text-white rounded border border-[#333] placeholder:text-[#777]"
//             />
//               {/* <img src="/Check.svg" alt="Xpact" className="w-[24px] h-[24px] mb-4 absolute right-4 top-1/2 transform -translate-y-1/2 text-lg"/> */}
//               <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">✔</span>
//           </div>

//           <button className="w-full py-3 bg-[#FF6D03] hover:bg-[#e45e00] text-[18px] font-semibold rounded">
//             로그인
//           </button>
//         </div>

//         <div className="mt-6 text-[14px] text-gray-400">
//           계정이 없으신가요?{" "}
//           <a href="#" className="text-[#FF6D01] font-medium">회원가입</a>
//         </div>

//         <div className="mt-10 w-full max-w-sm">
//           <div className="flex items-center justify-center space-x-4 text-gray-500">
//             <hr className="flex-grow border-gray-600" />
//             <span className="text-[14px] whitespace-nowrap">SNS 회원가입 및 로그인</span>
//             <hr className="flex-grow border-gray-600" />
//           </div>

//           <div className="mt-5 flex justify-center space-x-5">
//             <a href="#">
//               <img src="/kakao.png" alt="kakao" className="w-[48px] h-[48px]" />
//             </a>
//             <a href="#">
//               <img src="/naver.png" alt="naver" className="w-[48px] h-[48px]" />
//             </a>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import FormInput from '../components/InputBox';
import SocialLogin from '../components/SocialLogin';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white font-[Pretendard]">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-14 px-4">
        <div className="flex flex-col items-center mb-10">
          <img src="/logo2.png" alt="Xpact" className="w-[59px] h-[48px] mb-4" />
          <h1 className="text-[35px] font-semibold">로그인</h1>
        </div>

        <div className="w-[448px] space-y-5">
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">아이디</div>
            <FormInput type="text" placeholder="아이디" />
          </div>
          <div>
            <div className="text-[18px] mb-[2%] ml-[1%]">비밀번호</div>
            <FormInput type="password" placeholder="비밀번호" />
          </div>

          <button className="w-full mt-[8%] py-3 bg-[#FF6D03] hover:bg-[#e45e00] text-[18px] font-semibold rounded">
            로그인
          </button>
        </div>

        <div className="mt-6 text-[14px] text-gray-400">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-[#FF6D01] font-medium">회원가입</a>
        </div>

        <div className="mt-[8%]">
          <SocialLogin />
        </div>
      </main>
      <Footer />
    </div>
  );
}
