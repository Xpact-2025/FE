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

'use client';

import Footer from '../components/Footer';
import Header from '../components/Header';
import InputBox from '../components/InputBox';
import ProfileImage from '../components/ProfileImage';
import { useState } from 'react';
import SelectBox from './components/SelectBox';
import SearchInput from './components/SearchBox';

export default function ProfilePage() {
  const [degree, setDegree] = useState('');
  const [graduation, setGraduation] = useState('');
  const [jobInput, setJobInput] = useState('');
  const [jobList, setJobList] = useState<string[]>([]);

  // 추가: 직무 추가 함수
  const handleAddJob = () => {
    const trimmed = jobInput.trim();
    if (trimmed && !jobList.includes(trimmed)) {
      setJobList(prev => [...prev, trimmed]);
      setJobInput('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-col items-center justify-center py-[120px] px-4">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-[35px] font-semibold mb-[40px]">프로필 설정</h1>
          <ProfileImage />
        </div>

        {/* 이름 & 나이 */}
        <div className="flex flex-wrap gap-5 w-full max-w-[1000px] mb-10">
          <div className="w-[318px] min-w-[300px]">
            <div className="text-[18px] mb-2">이름</div>
            <InputBox type="text" placeholder="3~12자 이내, 영문/숫자 가능" />
          </div>
          <div className="w-[149px]">
            <div className="text-[18px] mb-2">나이</div>
            <InputBox type="text" placeholder="나이" />
          </div>
        </div>

        {/* 학력 입력 */}
        <div className="w-full max-w-[1000px] flex flex-wrap gap-5 mb-10">
          <div className="w-[149px]">
            <SelectBox
              label="학사"
              value={degree}
              onChange={e => setDegree(e.target.value)}
              options={['학사', '석사', '박사']}
              placeholder="학위 구분"
            />
          </div>
          <div className="w-[149px]">
            <div className="text-[18px] mb-2">⠀</div>
            <SearchInput
              placeholder="학교명"
              onSearch={() => alert('학교명 검색')}
            />
          </div>
          <div className="w-[149px]">
            <div className="text-[18px] mb-2">⠀</div>
            <SearchInput
              placeholder="학과"
              onSearch={() => alert('학과 검색')}
            />
          </div>
          <div className="w-[149px]">
            <div className="text-[18px] mb-2">⠀</div>
            <input
              type="month"
              className="w-full px-4 py-2 bg-[#161616] text-white rounded border border-gray-700"
            />
          </div>
          <div className="w-[149px]">
            <div className="text-[18px] mb-2">⠀</div>
            <input
              type="month"
              className="w-full px-4 py-2 bg-[#161616] text-white rounded border border-gray-700"
            />
          </div>
          <div className="w-[149px]">
            <SelectBox
              label="⠀"
              value={graduation}
              onChange={e => setGraduation(e.target.value)}
              options={['졸업', '재학', '휴학', '중퇴']}
              placeholder="졸업 구분"
            />
          </div>
        </div>

        {/* 희망 직무 */}
        <div className="w-full max-w-[1000px] mb-10 text-left">
          <div className="text-[18px] mb-2">희망 직무</div>

          <div className="flex gap-2 items-center">
            <div className="w-[350px]">
              <SearchInput
                placeholder="직무명 검색"
                value={jobInput}
                onChange={e => setJobInput(e.target.value)}
                onSearch={handleAddJob}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {jobList.map((job, index) => (
                <span
                  key={index}
                  className="px-5 py-3 h-[44px] rounded bg-gray-500 text-white text-sm whitespace-nowrap"
                >
                  {job}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button className="w-[448px] mt-[3%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded">
          입력 완료
        </button>
      </main>
      <Footer />
    </div>
  );
}
