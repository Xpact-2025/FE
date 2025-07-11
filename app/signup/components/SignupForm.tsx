'use client';

import { useState } from 'react';
import FormInput from '../../components/InputCheckBox';
import { signupUser } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import AgreementList from '@/app/components/AgreementList';
import TermsPopup from '@/app/components/PrivacyPopup';
import PrivacyPopup from '@/app/components/PrivacyPopup';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [birthDate] = useState('2025-03-29');

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value.trim()) {
      setEmailError('이메일을 입력해주세요.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!value.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
    } else if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (!value.trim()) {
      setNameError('이름을 입력해주세요.');
    } else {
      setNameError('');
    }
  };
  const handleSignup = async () => {
    let hasError = false;

    if (!requiredAgreementsChecked) {
      alert('필수 약관에 모두 동의해주세요.');
      return;
    }

    if (!name.trim()) {
      setNameError('이름을 입력해주세요.');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요.');
      hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요.');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상 입력해주세요.');
      hasError = true;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      hasError = true;
    }

    if (hasError) return;

    const data = await signupUser({
      email,
      password,
      name,
      birthDate,
      type: 'FORM',
      role: 'ROLE_ADMIN',
      imageUrl: '/images/mainprofile.svg',
    });

    if (data.httpStatus === 200) {
      alert('회원가입에 성공하셨습니다!');
      router.push('/login');
    } else {
      alert(`회원가입 실패: ${data.message}`);
    }

    console.log('payload 확인:', {
      email,
      password,
      name,
      birthDate,
      type: 'FORM',
      role: 'ROLE_ADMIN',
      imgUrl: '/images/mainprofile.svg',
    });
  };

  const agreements = [
    {
      id: 'terms',
      label: '이용약관 동의',
      required: true,
      showDetail: () => alert('이용약관 보기'),
    },
    {
      id: 'privacy',
      label: '개인정보 수집 및 이용 동의',
      required: true,
      showDetail: () => alert('개인정보 처리방침 보기'),
    },
  ];

  const [checkedAgreements, setCheckedAgreements] = useState<{
    [id: string]: boolean;
  }>({});

  const handleAgreementChange = (checked: { [id: string]: boolean }) => {
    setCheckedAgreements(checked);
  };

  const requiredAgreementsChecked = agreements
    .filter(a => a.required)
    .every(a => checkedAgreements[a.id]);

  return (
    <div className="w-[448px] space-y-5">
      <div>
        <div className="text-[18px] mb-[2%] ml-[1%]">이름</div>
        <FormInput
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          error={nameError}
          successHighlight
        />
      </div>
      <div>
        <div className="text-[18px] mb-[2%] ml-[1%]">이메일</div>
        <FormInput
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          successHighlight
        />
      </div>
      <div>
        <div className="text-[18px] mb-[2%] ml-[1%]">비밀번호</div>
        <FormInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          successHighlight
        />
      </div>
      <div>
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
          successHighlight
        />
      </div>
      <button
        onClick={handleSignup}
        className="w-full mt-[8%] py-3 bg-primary hover:bg-primary-100 text-[18px] font-semibold rounded cursor-pointer"
      >
        회원가입
      </button>
      <AgreementList
        agreements={[
          {
            id: 'terms',
            label: '이용약관에 동의합니다.',
            required: true,
            detailComponent: <TermsPopup />,
          },
          {
            id: 'privacy',
            label: '개인정보 수집 및 이용에 동의합니다.',
            required: true,
            detailComponent: <PrivacyPopup />,
          },
        ]}
        onChange={handleAgreementChange}
      />
    </div>
  );
}
