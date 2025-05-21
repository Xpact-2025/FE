'use client';

import { useState } from 'react';
import ProfileImage from '@/app/components/ProfileImage';
import SelectBox from './SelectBox';
import SearchInput from './SearchBox';
import InputBox from '@/app/components/InputBox';
import SchoolModal from './SchoolModal';
import MajorModal from './MajorModal';
import { fetchMajors, fetchSchools } from '@/apis/school';
import { fetchIndustryList } from '@/apis/industry';
import IndustryModal from './IndustryModal';
import { saveProfileInfo } from '../../../apis/saveProfileInfo';
import { useRouter } from 'next/navigation';
import { DEGREE_MAP, SCHOOL_STATUS_MAP } from '@/constants/education';

export default function ProfileForm() {
  const router = useRouter();

  const [degree, setDegree] = useState('');
  const [graduation, setGraduation] = useState('');
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [schoolSearchInput, setSchoolSearchInput] = useState('');
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [majorList, setMajorList] = useState<string[]>([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [majorSearchInput, setMajorSearchInput] = useState('');

  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [industryList, setIndustryList] = useState<string[]>([]);
  const [industrySearchValue, setIndustrySearchValue] = useState('');
  const [recruitName, setRecruitName] = useState('');
  const [detailRecruitName, setDetailRecruitName] = useState('');

  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isMajorLoading, setIsMajorLoading] = useState(false);
  const [isIndustryLoading, setIsIndustryLoading] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const [imgUrl] = useState('/images/mainporfile.svg');

  const handleSchoolSearch = async () => {
    setIsSchoolModalOpen(true);
    if (schoolList.length === 0) {
      try {
        setIsSchoolLoading(true);
        const data = await fetchSchools();
        setSchoolList(data || []);
      } catch (err) {
        console.error('학교 목록 로딩 실패:', err);
      } finally {
        setIsSchoolLoading(false);
      }
    }
  };

  const handleMajorSearch = async () => {
    setIsMajorModalOpen(true);
    try {
      setIsMajorLoading(true);
      const data = await fetchMajors(selectedSchool);
      setMajorList(data || []);
    } catch (err) {
      console.error('학과 목록 로딩 실패:', err);
    } finally {
      setIsMajorLoading(false);
    }
  };

  const handleIndustrySearch = async () => {
    setIsIndustryModalOpen(true);
    try {
      setIsIndustryLoading(true);
      const data = await fetchIndustryList();
      setIndustryList(data);
    } catch (error) {
      console.error('산업군 로딩 실패:', error);
    } finally {
      setIsIndustryLoading(false);
    }
  };

  // const mapDegree = (kor: string) => {
  //   switch (kor) {
  //     case '고등학교':
  //       return 'HIGH';
  //     case '전문대학':
  //       return 'COLLEGE';
  //     case '대학교':
  //       return 'UNIV';
  //     case '대학원(석사)':
  //       return 'MASTER';
  //     case '대학원(박사)':
  //       return 'DOCTOR';
  //     default:
  //       return '';
  //   }
  // };

  // const mapSchoolStatus = (kor: string) => {
  //   switch (kor) {
  //     case '재학':
  //       return 'CURRENT';
  //     case '휴학':
  //       return 'SUSPENDED';
  //     case '졸업':
  //       return 'GRADUATION';
  //     case '졸업예정':
  //       return 'EXPECTED_GRADUATION';
  //     case '수료':
  //       return 'COMPLETED';
  //     case '중퇴':
  //       return 'WITHDRAWN';
  //     default:
  //       return '';
  //   }
  // };

  const handleSubmit = async () => {
    try {
      await saveProfileInfo(
        name,
        imgUrl,
        Number(age),
        DEGREE_MAP[degree] || '',
        selectedSchool,
        selectedMajor,
        SCHOOL_STATUS_MAP[graduation] || '',
        recruitName,
        detailRecruitName
      );

      alert('모든 정보가 성공적으로 저장되었습니다!');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('저장 실패');
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
          <InputBox
            type="text"
            placeholder="3~12자 이내, 영문/숫자 가능"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="w-[149px]">
          <div className="text-[18px] mb-2">나이</div>
          <InputBox
            type="text"
            placeholder="나이 (숫자만)"
            value={age}
            onChange={e => setAge(e.target.value)}
          />
        </div>
      </div>

      <label className="text-[18px] justify-items-start w-full max-w-[50%] mb-2">
        학력
      </label>
      <div className="w-full max-w-[50%] grid gap-4 mb-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <SelectBox
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
        <div>
          <SearchInput
            placeholder="학교명"
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)}
            onSearch={handleSchoolSearch}
          />
        </div>
        <div>
          <SearchInput
            placeholder="학과명"
            value={selectedMajor}
            onChange={e => setSelectedMajor(e.target.value)}
            onSearch={handleMajorSearch}
          />
        </div>
        <div>
          <SelectBox
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
              placeholder="산업군 검색"
              value={industrySearchValue}
              onChange={e => setIndustrySearchValue(e.target.value)}
              onSearch={handleIndustrySearch}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {recruitName && detailRecruitName && (
              <div className="flex items-center px-4 py-2 h-[44px] rounded bg-gray-500 text-white text-sm whitespace-nowrap">
                <span className="mr-2">{`${recruitName} / ${detailRecruitName}`}</span>
                <button
                  onClick={() => {
                    setRecruitName('');
                    setDetailRecruitName('');
                  }}
                  className="text-white hover:text-primary-50"
                  aria-label="직무 삭제"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-[448px] mt-[3%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded cursor-pointer"
      >
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
        isLoading={isSchoolLoading}
      />

      <MajorModal
        isOpen={isMajorModalOpen}
        onClose={() => setIsMajorModalOpen(false)}
        majors={majorList}
        onSelect={major => setSelectedMajor(major)}
        searchValue={majorSearchInput}
        onChange={e => setMajorSearchInput(e.target.value)}
        onSearch={handleMajorSearch}
        isLoading={isMajorLoading}
      />

      <IndustryModal
        isOpen={isIndustryModalOpen}
        onClose={() => setIsIndustryModalOpen(false)}
        industries={industryList}
        onSelect={(recruit, detail) => {
          setRecruitName(recruit);
          setDetailRecruitName(detail);
          setIsIndustryModalOpen(false);
        }}
        searchValue={industrySearchValue}
        onChange={e => setIndustrySearchValue(e.target.value)}
        onSearch={handleIndustrySearch}
        isLoading={isIndustryLoading}
      />
    </main>
  );
}
