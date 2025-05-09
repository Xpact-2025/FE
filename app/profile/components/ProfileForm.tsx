// 'use client';

// import ProfileImage from '@/app/components/ProfileImage';
// import { useEffect, useState } from 'react';
// import SelectBox from './SelectBox';
// import SearchInput from './SearchBox';
// import InputBox from '@/app/components/InputBox';
// import SchoolModal from './SchoolModal';
// import { fetchSchoolList } from '../../../apis/fetchSchoolList';

// export default function ProfileForm() {
//   const [degree, setDegree] = useState('');
//   const [graduation, setGraduation] = useState('');
//   const [jobInput, setJobInput] = useState('');
//   const [jobList, setJobList] = useState<string[]>([]);
//   const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
//   const [schoolList, setSchoolList] = useState<string[]>([]);

//   // 추가: 직무 추가 함수
//   const handleAddJob = () => {
//     const trimmed = jobInput.trim();
//     if (trimmed && !jobList.includes(trimmed)) {
//       setJobList(prev => [...prev, trimmed]);
//       setJobInput('');
//     }
//   };

//   useEffect(() => {
//     if (isSchoolModalOpen && schoolList.length === 0) {
//       fetchSchoolList().then(setSchoolList);
//     }
//   }, [isSchoolModalOpen]);

//   return (
//     <main className="flex flex-col items-center justify-center py-[120px] px-4">
//       <div className="flex flex-col items-center mb-10">
//         <h1 className="text-[35px] font-semibold mb-[40px]">프로필 설정</h1>
//         <ProfileImage />
//       </div>

//       {/* 이름 & 나이 */}
//       <div className="flex flex-wrap gap-5 w-full max-w-[50%] mb-10">
//         <div className="w-[318px] min-w-[300px]">
//           <div className="text-[18px] mb-2">이름</div>
//           <InputBox type="text" placeholder="3~12자 이내, 영문/숫자 가능" />
//         </div>
//         <div className="w-[149px]">
//           <div className="text-[18px] mb-2">나이</div>
//           <InputBox type="text" placeholder="나이 (숫자만)" />
//         </div>
//       </div>

//       {/* 학력 입력 */}
//       <div className="w-full max-w-[50%] flex flex-wrap gap-5 mb-10">
//         <div className="w-[149px]">
//           <SelectBox
//             label="학사"
//             value={degree}
//             onChange={e => setDegree(e.target.value)}
//             options={[
//               '고등학교',
//               '전문대학',
//               '대학교',
//               '대학원(석사)',
//               '대학원(박사)',
//             ]}
//             placeholder="학위 구분"
//           />
//         </div>
//         <div className="w-[149px]">
//           <div className="text-[18px] mb-2">⠀</div>
//           <SearchInput
//             placeholder="학교명"
//             onSearch={() => setIsSchoolModalOpen(true)}
//           />
//         </div>
//         <div className="w-[149px]">
//           <div className="text-[18px] mb-2">⠀</div>
//           <SearchInput placeholder="학과" onSearch={() => alert('학과 검색')} />
//         </div>
//         <div className="w-[149px]">
//           <SelectBox
//             label="⠀"
//             value={graduation}
//             onChange={e => setGraduation(e.target.value)}
//             options={['재학', '휴학', '졸업', '졸업예정', '수료', '중퇴']}
//             placeholder="졸업 구분"
//           />
//         </div>
//       </div>

//       {/* 희망 직무 */}
//       <div className="w-full max-w-[50%] mb-10 text-left">
//         <div className="text-[18px] mb-2">희망 직무</div>

//         <div className="flex gap-2 items-center">
//           <div className="w-[350px]">
//             <SearchInput
//               placeholder="직무명 검색"
//               value={jobInput}
//               onChange={e => setJobInput(e.target.value)}
//               onSearch={handleAddJob}
//             />
//           </div>

//           <div className="flex flex-wrap gap-2">
//             {jobList.map((job, index) => (
//               <span
//                 key={index}
//                 className="px-5 py-3 h-[44px] rounded bg-gray-500 text-white text-sm whitespace-nowrap"
//               >
//                 {job}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <button className="w-[448px] mt-[3%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded">
//         입력 완료
//       </button>

//       <SchoolModal
//         isOpen={isSchoolModalOpen}
//         onClose={() => setIsSchoolModalOpen(false)}
//         schools={schoolList}
//       />
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import ProfileImage from '@/app/components/ProfileImage';
import SelectBox from './SelectBox';
import SearchInput from './SearchBox';
import InputBox from '@/app/components/InputBox';
import SchoolModal from './SchoolModal';
import MajorModal from './MajorModal';

export default function ProfileForm() {
  const [degree, setDegree] = useState('');
  const [graduation, setGraduation] = useState('');
  const [jobInput, setJobInput] = useState('');
  const [jobList, setJobList] = useState<string[]>([]);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [schoolSearchInput, setSchoolSearchInput] = useState('');
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [majorList, setMajorList] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [majorSearchInput, setMajorSearchInput] = useState('');

  const handleAddJob = () => {
    const trimmed = jobInput.trim();
    if (trimmed && !jobList.includes(trimmed)) {
      setJobList(prev => [...prev, trimmed]);
      setJobInput('');
    }
  };

  const handleSchoolSearch = async () => {
    setIsSchoolModalOpen(true);
    if (schoolList.length === 0) {
      try {
        const res = await fetch('/api/fetch-schools', { cache: 'no-store' });
        const data = await res.json();
        setSchoolList(data);
      } catch (err) {
        console.error('학교 목록 로딩 실패:', err);
      }
    }
  };

  const handleMajorSearch = async () => {
    setIsMajorModalOpen(true);
    try {
      const res = await fetch('/api/fetch-majors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolName: selectedSchool }),
      });
      const data = await res.json();
      setMajorList(data);
    } catch (err) {
      console.error('학과 목록 로딩 실패:', err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center py-[120px] px-4">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-[35px] font-semibold mb-[40px]">프로필 설정</h1>
        <ProfileImage />
      </div>

      {/* 이름 & 나이 */}
      <div className="flex flex-wrap gap-5 w-full max-w-[50%] mb-10">
        <div className="w-[318px] min-w-[300px]">
          <div className="text-[18px] mb-2">이름</div>
          <InputBox type="text" placeholder="3~12자 이내, 영문/숫자 가능" />
        </div>
        <div className="w-[149px]">
          <div className="text-[18px] mb-2">나이</div>
          <InputBox type="text" placeholder="나이 (숫자만)" />
        </div>
      </div>

      {/* 학력 입력 */}
      <div className="w-full max-w-[50%] flex flex-wrap gap-5 mb-10">
        <div className="w-[149px]">
          <SelectBox
            label="학사"
            value={degree}
            onChange={e => setDegree(e.target.value)}
            options={[
              '고등학교',
              '전문대학',
              '대학교',
              '대학원(석사)',
              '대학원(박사)',
            ]}
            placeholder="학위 구분"
          />
        </div>
        <div className="w-[149px]">
          <div className="text-[18px] mb-2">⠀</div>
          <SearchInput
            placeholder="학교명"
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)}
            onSearch={handleSchoolSearch}
          />
        </div>
        <div className="w-[149px]">
          <div className="text-[18px] mb-2">⠀</div>
          <SearchInput
            placeholder="학과명"
            value={selectedMajor}
            onChange={e => setSelectedMajor(e.target.value)}
            onSearch={handleMajorSearch}
          />
        </div>
        <div className="w-[149px]">
          <SelectBox
            label="⠀"
            value={graduation}
            onChange={e => setGraduation(e.target.value)}
            options={['재학', '휴학', '졸업', '졸업예정', '수료', '중퇴']}
            placeholder="졸업 구분"
          />
        </div>
      </div>

      {/* 희망 직무 */}
      <div className="w-full max-w-[50%] mb-10 text-left">
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

      <SchoolModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        schools={schoolList}
        onSelect={school => {
          setSelectedSchool(school);
          setSchoolSearchInput('');
        }}
        searchValue={schoolSearchInput}
        onChange={e => setSchoolSearchInput(e.target.value)}
        onSearch={handleSchoolSearch}
      />

      <MajorModal
        isOpen={isMajorModalOpen}
        onClose={() => setIsMajorModalOpen(false)}
        majors={majorList}
        onSelect={major => setSelectedMajor(major)}
        searchValue={majorSearchInput}
        onChange={e => setMajorSearchInput(e.target.value)}
        onSearch={handleMajorSearch}
      />
    </main>
  );
}
