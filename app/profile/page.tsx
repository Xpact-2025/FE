// import Footer from '../components/Footer';
// import NavBar from '../components/NavBar';
// import FormInput from '../components/InputBox';
// import ProfileImage from '../components/ProfileImage';

// export default function ProfilePage() {
//   return (
//     <div className="min-h-screen">
//       <NavBar />
//       <main className="flex flex-col items-center justify-center py-[120px] px-4">
//         <div className="flex flex-col items-center mb-10">
//           <h1 className="text-[35px] font-semibold mb-[15%]">프로필 설정</h1>
//           <ProfileImage />
//         </div>

//         <div className="w-[448px] space-y-5">
//           <div>
//             <div className="text-[18px] mb-[2%] ml-[1%]">이름</div>
//             <FormInput type="text" placeholder="3~12자 이내, 영문/숫자 가능" />
//           </div>
//           <div>
//             <div className="text-[18px] mb-[2%] ml-[1%]">나이</div>
//             <FormInput type="text" placeholder="나이" />
//           </div>
//           <div>
//             <div className="text-[18px] mb-[2%] ml-[1%]">학력</div>
//             <FormInput type="text" placeholder="학교 입력하기" />
//           </div>
//           <div>
//             <div className="text-[18px] mb-[2%] ml-[1%]">희망 직무</div>
//             <FormInput type="text" placeholder="직무 입력하기" />
//           </div>

//           <button className="w-full mt-[8%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded">
//             저장
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileForm from './components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ProfileForm />
      <Footer />
    </div>
  );
}
