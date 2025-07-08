'use client';

import { useState } from 'react';
import ProfileImage from '@/app/components/ProfileImage';
import SelectBox from './SelectBox';
import SearchInput from './SearchBox';
import InputBox from '@/app/components/InputBox';
import SchoolModal from './SchoolModal';
import MajorModal from './MajorModal';
import {
  fetchMajors,
  fetchSchools,
  searchMajors,
  searchSchools,
} from '@/apis/school';
import { fetchIndustryList } from '@/apis/industry';
import IndustryModal from './IndustryModal';
import { saveProfileInfo } from '@/apis/profile';
import { useRouter } from 'next/navigation';
import { DEGREE_MAP, SCHOOL_STATUS_MAP } from '@/constants/education';
import BackIcon from '@/public/icons/Chevron_Left.svg';

function parseEducationName(raw: string) {
  const degreeOptions = [
    '고등학교',
    '전문대학',
    '대학교',
    '대학원(석사)',
    '대학원(박사)',
  ];
  const graduationOptions = [
    '재학',
    '휴학',
    '졸업',
    // '졸업예정',
    '수료',
    '중퇴',
  ];

  const graduationMatch = graduationOptions.find(g => raw.includes(`(${g})`));
  const graduation = graduationMatch || '';

  const withoutGraduation = raw.replace(/\s*\(.*?\)\s*/g, '').trim(); // 괄호 제거
  const parts = withoutGraduation.split(' ');
  const school = parts[0] || '';
  const major = parts.slice(1).join(' ') || '';

  return {
    school,
    major,
    graduation,
    degree: degreeOptions.find(d => raw.includes(d)) || '',
  };
}

interface ProfileFormProps {
  initialData?: {
    name: string;
    age: string;
    educationDegree: string;
    educationName: string;
    schoolState: string;
    desiredDetailRecruit: string;
    imgurl: string;
  };
  isEditMode?: boolean;
  onCancel?: () => void;
}

export default function ProfileForm({
  initialData,
  isEditMode = false,
  onCancel,
}: ProfileFormProps) {
  const router = useRouter();

  const parsedEdu = initialData?.educationName
    ? parseEducationName(initialData.educationName)
    : { school: '', major: '', graduation: '', degree: '' };

  const [name, setName] = useState(initialData?.name || '');
  const [age, setAge] = useState(initialData?.age || '');
  // const [degree, setDegree] = useState(parsedEdu.degree || '');
  // const [graduation, setGraduation] = useState(initialData?.schoolState || '');

  const [selectedSchool, setSelectedSchool] = useState(parsedEdu.school);
  const [selectedMajor, setSelectedMajor] = useState(parsedEdu.major);
  const [recruitName, setRecruitName] = useState(
    initialData?.desiredDetailRecruit ? 'IT/개발' : ''
  );
  const [detailRecruitName, setDetailRecruitName] = useState(
    initialData?.desiredDetailRecruit || ''
  );
  const [imgUrl] = useState(initialData?.imgurl || '/images/mainprofile.svg');

  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [schoolSearchInput, setSchoolSearchInput] = useState('');
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);
  const [majorList, setMajorList] = useState<string[]>([]);
  const [majorSearchInput, setMajorSearchInput] = useState('');

  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [industryList, setIndustryList] = useState<string[]>([]);
  const [industrySearchValue, setIndustrySearchValue] = useState('');

  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isMajorLoading, setIsMajorLoading] = useState(false);
  const [isIndustryLoading, setIsIndustryLoading] = useState(false);

  const [degree, setDegree] = useState(
    initialData?.educationDegree || parsedEdu.degree || ''
  );

  const [graduation, setGraduation] = useState(
    initialData?.schoolState || parsedEdu.graduation || ''
  );

  const handleSchoolSearch = async () => {
    setIsSchoolModalOpen(true);
    try {
      setIsSchoolLoading(true);
      const data = schoolSearchInput.trim()
        ? await searchSchools(schoolSearchInput.trim())
        : await fetchSchools();
      setSchoolList(data || []);
    } catch (err) {
      console.error('학교 검색 실패:', err);
      setSchoolList([]);
    } finally {
      setIsSchoolLoading(false);
    }
  };

  const handleMajorSearch = async () => {
    setIsMajorModalOpen(true);
    try {
      setIsMajorLoading(true);
      const trimmed = majorSearchInput.trim();
      const data = trimmed
        ? await searchMajors(selectedSchool, trimmed)
        : await fetchMajors(selectedSchool);
      setMajorList(data || []);
    } catch (err) {
      console.error('학과 검색 실패:', err);
      setMajorList([]);
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
    <main
      className={`flex flex-col items-center justify-center px-4 ${
        isEditMode ? 'pt-0' : 'py-[120px]'
      }`}
    >
      {' '}
      <div className="relative w-full flex justify-center items-center mb-[40px]">
        {/* 뒤로가기 버튼 - 왼쪽에 배치 */}
        {isEditMode && (
          <button
            onClick={onCancel}
            className="absolute left-0"
            aria-label="뒤로가기"
          >
            <BackIcon className="stroke-gray-50 w-[35px] h-[35px] cursor-pointer" />
          </button>
        )}
        {/* 가운데 정렬된 텍스트 */}
        <h1 className="text-[35px] font-semibold">
          {isEditMode ? '프로필 수정' : '프로필 설정'}
        </h1>
      </div>
      <div className="flex flex-col items-center mb-10">
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
            onChange={setDegree}
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
            placeholder="학교명 검색"
            value={selectedSchool}
            onChange={e => setSelectedSchool(e.target.value)}
            onFocus={async () => {
              setIsSchoolModalOpen(true);
              setSchoolSearchInput('');
              try {
                setIsSchoolLoading(true);
                const data = await fetchSchools();
                setSchoolList(data || []);
              } catch (error) {
                console.error('학교 전체 조회 실패:', error);
                setSchoolList([]);
              } finally {
                setIsSchoolLoading(false);
              }
            }}
            onSearch={handleSchoolSearch}
          />
        </div>
        <div>
          <SearchInput
            placeholder="학과명 검색"
            value={selectedMajor}
            onChange={e => setSelectedMajor(e.target.value)}
            onSearch={handleMajorSearch}
            onFocus={async () => {
              setIsMajorModalOpen(true);
              setMajorSearchInput('');
              try {
                setIsMajorLoading(true);
                const data = await fetchMajors(selectedSchool);
                setMajorList(data || []);
              } catch (error) {
                console.error('학과 전체 조회 실패:', error);
                setMajorList([]);
              } finally {
                setIsMajorLoading(false);
              }
            }}
          />
        </div>
        <div>
          <SelectBox
            value={graduation}
            onChange={setGraduation}
            // options={['재학', '휴학', '졸업', '졸업예정', '수료', '중퇴']}
            options={['재학', '휴학', '졸업', '수료', '중퇴']}
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
              value={industrySearchValue}
              onChange={e => setIndustrySearchValue(e.target.value)}
              onSearch={handleIndustrySearch}
              onFocus={async () => {
                setIsIndustryModalOpen(true);
                setIndustrySearchValue('');
                try {
                  setIsIndustryLoading(true);
                  const data = await fetchIndustryList();
                  setIndustryList(data || []);
                } catch (error) {
                  console.error('산업군 전체 조회 실패:', error);
                  setIndustryList([]);
                } finally {
                  setIsIndustryLoading(false);
                }
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {recruitName && detailRecruitName && (
              <div className="flex items-center px-4 py-2 h-[44px] rounded bg-gray-500 text-white text-sm whitespace-nowrap">
                <span className="mr-2">{detailRecruitName}</span>
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
        className={`w-[448px] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded cursor-pointer ${
          isEditMode ? 'mt-[3%] mb-10' : 'mt-[3%]'
        }`}
      >
        {isEditMode ? '수정 완료' : '입력 완료'}
      </button>
      <SchoolModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        schools={schoolList}
        onSelect={school => {
          setSelectedSchool(school);
          setSelectedMajor('');
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
